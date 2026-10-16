import nodemailer from 'nodemailer';

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type MailInput = {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

const provider = (process.env.EMAIL_PROVIDER ?? 'disabled').toLowerCase();
const from = process.env.EMAIL_FROM ?? 'WAFRA <no-reply@wafra.tn>';
const to = process.env.CONTACT_EMAIL ?? process.env.WAFRA_ADMIN_EMAIL ?? '';

export function emailConfigured(): boolean {
  if (!to) return false;
  if (provider === 'resend') return Boolean(process.env.RESEND_API_KEY);
  if (provider === 'smtp') return Boolean(process.env.SMTP_HOST);
  return false;
}

export async function sendMail(mail: MailInput): Promise<void> {
  if (!to) throw new Error('CONTACT_EMAIL is not configured');

  if (provider === 'resend') {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not configured');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        attachments: mail.attachments?.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content.toString('base64'),
        })),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(`Resend request failed (${response.status}): ${detail.slice(0, 200)}`);
    }
    return;
  }

  if (provider === 'smtp') {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    await transport.sendMail({
      from,
      to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      attachments: mail.attachments,
    });
    return;
  }

  throw new Error('Email provider is disabled');
}
