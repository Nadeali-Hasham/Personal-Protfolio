# Nade Ali Hasham Portfolio

Professional portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and a server-side contact API.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Email Setup

Copy `.env.example` to `.env.local` and fill SMTP values:

```bash
CONTACT_TO_EMAIL=syednadealihashamshah@gmail.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-user
SMTP_PASS=your-password
SMTP_FROM="Nade Portfolio <no-reply@example.com>"
```

Without SMTP values, the API validates and rate-limits submissions but returns a setup error instead of sending email.

## Vercel Deployment

1. Push the project to a repository after approval.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy.

## Notes

The 3D scenes use React Three Fiber because it is production-friendly inside Next.js and was allowed as an alternative to MML. ClawNet was not installed because external package/plugin installation needs approval.
