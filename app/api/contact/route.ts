import { NextResponse, type NextRequest } from 'next/server';
import { contactSchema } from '@/validations/contact';
import { rateLimit } from '@/lib/rate-limit';
import { sendMail } from '@/lib/email';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'application/pdf',
]);

function field(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value : '';
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function buildBody(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  productType: string;
  message: string;
}): string {
  return [
    'Nouvelle demande depuis le site WAFRA',
    '',
    `Nom : ${data.name}`,
    `Entreprise : ${data.company || '—'}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.phone}`,
    `Type de produit : ${data.productType}`,
    '',
    'Message :',
    data.message,
  ].join('\n');
}

export async function POST(request: NextRequest) {
  const limit = rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: { message: 'Trop de demandes envoyées. Merci de réessayer dans quelques minutes.' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: { message: 'Requête invalide.' } }, { status: 400 });
  }

  const raw = {
    name: field(form.get('name')),
    company: field(form.get('company')),
    email: field(form.get('email')),
    phone: field(form.get('phone')),
    productType: field(form.get('productType')),
    message: field(form.get('message')),
    website: field(form.get('website')),
  };

  if (raw.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          message: 'Merci de vérifier les champs du formulaire.',
          fields: parsed.error.issues.map((issue) => issue.path.join('.')),
        },
      },
      { status: 422 },
    );
  }

  let attachment: { filename: string; content: Buffer; contentType?: string } | undefined;
  const file = form.get('photo');
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: { message: 'La pièce jointe dépasse la taille maximale de 5 Mo.' } },
        { status: 413 },
      );
    }
    if (file.type && !ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: { message: 'Format de pièce jointe non autorisé (image ou PDF).' } },
        { status: 415 },
      );
    }
    attachment = {
      filename: file.name || 'piece-jointe',
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    };
  }

  try {
    await sendMail({
      subject: 'Nouvelle demande depuis WAFRA',
      replyTo: parsed.data.email,
      text: buildBody(parsed.data),
      attachments: attachment ? [attachment] : undefined,
    });
  } catch (error) {
    console.error('contact_email_failed', error);
    return NextResponse.json(
      {
        error: {
          message:
            "L'envoi a échoué. Réessayez dans un instant ou contactez-nous directement sur WhatsApp.",
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
