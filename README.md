# WAFRA — Commerce pour l’industrie

Site vitrine (corporate showcase) de WAFRA : une page d’accueil premium bilingue
FR / EN / AR (avec RTL) qui présente l’activité d’achat de machines, équipements,
stocks et actifs professionnels. Le seul traitement côté serveur est l’envoi par
e-mail des demandes du formulaire de contact.

- Accueil : `/`
- Mentions légales : `/legal`
- Politique de confidentialité : `/privacy`
- Envoi du formulaire : `POST /api/contact`

## Stack

- Next.js (App Router) + React + TypeScript
- CSS maison (design system vert & or) — Tailwind uniquement pour les utilitaires de base
- `lucide-react` (icônes), `framer-motion` (animations discrètes), `next/image`
- Validation `zod`, envoi d’e-mail Resend ou SMTP (`nodemailer`)

Aucune base de données, aucun CRM, aucune authentification.

## Démarrage

```powershell
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000.

## Configuration de l’e-mail

Copiez `.env.example` vers `.env` et renseignez :

| Variable | Rôle |
| --- | --- |
| `EMAIL_PROVIDER` | `resend`, `smtp` ou `disabled` |
| `EMAIL_FROM` | Expéditeur vérifié |
| `CONTACT_EMAIL` | Destinataire des demandes |
| `RESEND_API_KEY` | Clé API Resend (si `resend`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | Si `smtp` |
| `NEXT_PUBLIC_WAFRA_WHATSAPP_NUMBER` | Numéro WhatsApp public (chiffres internationaux, sans `+`) |

Tant que `EMAIL_PROVIDER=disabled`, l’API renvoie une erreur explicite et
aucun e-mail n’est envoyé.

## Qualité

```powershell
npm run lint
npm run typecheck
npm run build
```

## Production

```powershell
npm run build
npm run start
```

L’endpoint `POST /api/contact` limite les envois par adresse IP, valide les
champs avec Zod, refuse les pièces jointes de plus de 5 Mo et ignore les
soumissions issues du champ anti-robot (honeypot).
