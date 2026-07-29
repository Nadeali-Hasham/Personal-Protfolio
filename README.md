# Nade Ali Hasham Portfolio

Professional portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and a server-side contact API.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact Email Setup

Copy `.env.example` to `.env.local` and set at least:

```bash
CONTACT_TO_EMAIL=syednadealihashamshah@gmail.com
```

Sending order:

1. **Resend** (if `RESEND_API_KEY` is set) — recommended for Vercel
2. **SMTP** (if `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` are set)
3. **Web3Forms** (if `WEB3FORMS_ACCESS_KEY` is set)
4. **FormSubmit.co** fallback — works with only `CONTACT_TO_EMAIL`

### Resend (recommended)

1. Create a free account at [resend.com](https://resend.com)
2. Go to **API Keys** → create a key
3. Add to `.env.local` and Vercel Environment Variables:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=syednadealihashamshah@gmail.com
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

**Testing:** `onboarding@resend.dev` only delivers to the email you used to sign up on Resend. Check **Spam** and **Promotions** in Gmail.

**Check sent emails:** open `/admin/messages` and enter your `ADMIN_SECRET`.

**Production:** In Resend → **Domains**, add and verify your domain, then set:

```bash
RESEND_FROM_EMAIL=Nade Portfolio <contact@yourdomain.com>
```

### First-time FormSubmit note

The first contact submission may send an activation email to your inbox. Confirm it once, then future messages arrive normally.

### Gmail SMTP (recommended for production)

1. Enable 2FA on Gmail
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Set in `.env.local` (and in Vercel Environment Variables):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=syednadealihashamshah@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM="Nade Portfolio <syednadealihashamshah@gmail.com>"
```

## Vercel Deployment

1. Push the project to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables from `.env.example`
4. Deploy — `VERCEL_URL` is used automatically for social previews
5. Optional: set `NEXT_PUBLIC_SITE_URL` if you add a custom domain later

## Build

```bash
npm run build
npm start
```
