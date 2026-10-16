'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, Send } from 'lucide-react';

export type Lang = 'fr' | 'en' | 'ar';

const labels = {
  fr: {
    name: 'Nom',
    company: 'Entreprise',
    email: 'Email',
    phone: 'Téléphone',
    product: 'Sujet de la demande',
    message: 'Message',
    photo: 'Photo (optionnel)',
    photoHint: 'Une photo accélère l’évaluation de votre produit.',
    submit: 'Envoyer ma demande',
    sending: 'Envoi…',
    success: 'Merci. Votre message a bien été envoyé.',
    successSub: 'Notre équipe vous contactera très prochainement.',
    error: 'L’envoi a échoué. Réessayez ou contactez-nous sur WhatsApp.',
  },
  en: {
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    product: 'Request subject',
    message: 'Message',
    photo: 'Photo (optional)',
    photoHint: 'A photo speeds up the assessment of your product.',
    submit: 'Send my request',
    sending: 'Sending…',
    success: 'Thank you. Your message has been sent.',
    successSub: 'Our team will get back to you shortly.',
    error: 'Sending failed. Please retry or reach us on WhatsApp.',
  },
  ar: {
    name: 'الاسم',
    company: 'الشركة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    product: 'موضوع الطلب',
    message: 'الرسالة',
    photo: 'صورة (اختياري)',
    photoHint: 'الصورة تسرّع عملية تقييم منتجك.',
    submit: 'إرسال طلبي',
    sending: 'جارٍ الإرسال…',
    success: 'شكرًا لك. تم إرسال رسالتك بنجاح.',
    successSub: 'سيتواصل معك فريقنا في أقرب وقت.',
    error: 'فشل الإرسال. أعد المحاولة أو تواصل معنا عبر واتساب.',
  },
} as const;

function AnimatedCheck() {
  return (
    <motion.svg
      width="56"
      height="56"
      viewBox="0 0 52 52"
      fill="none"
      initial="hidden"
      animate="show"
      aria-hidden
    >
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        stroke="currentColor"
        strokeWidth="2"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } }}
      />
      <motion.path
        d="M15 27 L23 35 L38 19"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.4, delay: 0.45, ease: 'easeOut' } } }}
      />
    </motion.svg>
  );
}

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;

      if (!response.ok) {
        setError(payload?.error?.message ?? t.error);
        setStatus('error');
        return;
      }

      form.reset();
      setStatus('success');
    } catch {
      setError(t.error);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        className="contact-form form-success"
        role="status"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="form-success-check">
          <AnimatedCheck />
        </span>
        <strong>{t.success}</strong>
        <p>{t.successSub}</p>
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <label className="field">
          <span>{t.name}</span>
          <input name="name" type="text" required maxLength={120} autoComplete="name" />
        </label>
        <label className="field">
          <span>{t.company}</span>
          <input name="company" type="text" maxLength={160} autoComplete="organization" />
        </label>
        <label className="field">
          <span>{t.email}</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
        <label className="field">
          <span>{t.phone}</span>
          <input name="phone" type="tel" required maxLength={40} autoComplete="tel" />
        </label>
        <label className="field full">
          <span>{t.product}</span>
          <input name="productType" type="text" required maxLength={120} />
        </label>
        <label className="field full">
          <span>{t.message}</span>
          <textarea name="message" rows={4} required maxLength={4000} />
        </label>
        <label className="field full file-field">
          <span>{t.photo}</span>
          <input name="photo" type="file" accept="image/*,application/pdf" />
          <small>{t.photoHint}</small>
        </label>
      </div>

      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === 'error' && (
        <span className="error-message" role="alert">
          <AlertCircle size={15} />
          {error}
        </span>
      )}

      <button className="btn btn-green btn-lg btn-block" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? <Loader2 className="spin" size={17} /> : <Send size={17} />}
        {status === 'loading' ? t.sending : t.submit}
      </button>
    </form>
  );
}
