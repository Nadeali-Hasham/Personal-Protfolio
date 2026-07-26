# Nade Ali Hasham Portfolio

Professional portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and a server-side contact API.

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

1. **SMTP** (if `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` are set) — best for production
2. **Web3Forms** (if `WEB3FORMS_ACCESS_KEY` is set)
3. **FormSubmit.co** fallback — works with only `CONTACT_TO_EMAIL`

### First-time FormSubmit note

The first contact submission may send an activation email to your inbox. Confirm it once, then future messages arrive normally.

### Gmail SMTP (optional, more reliable)

1. Enable 2FA on Gmail
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Set in `.env.local`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=syednadealihashamshah@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM="Nade Portfolio <syednadealihashamshah@gmail.com>"
```

## Vercel Deployment

1. Push the project to a repository
2. Import the repo in Vercel
3. Add the environment variables from `.env.example`
4. Deploy

## Notes

The 3D scenes use React Three Fiber because it is production-friendly inside Next.js.
