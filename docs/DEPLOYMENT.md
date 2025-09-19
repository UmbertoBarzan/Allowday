# Allowday · Deployment Guide

## 1. Preparazione ambiente
1. Imposta repository Git remoto (GitHub/GitLab) con protezioni branch main.
2. Configura pipeline CI (GitHub Actions es.) con job: `npm ci`, `npm run build`, `npm audit --production`.
3. Prepara variabili segrete (JWT_SECRET, DATABASE_URL, CORS_ORIGIN, SMTP creds) nel secrets manager del provider.

## 2. Backend API
1. Provisiona database PostgreSQL (Supabase, Railway, RDS) e aggiorna `api/.env` con `DATABASE_URL`.
2. Esegui migrazioni: `cd api && npx prisma migrate deploy`.
3. Builda e avvia container (Dockerfile suggerito):
   ```Dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --omit=dev
   COPY . .
   RUN npm run build
   CMD ["node", "dist/server.js"]
   ```
4. Espone l’app dietro reverse proxy (Nginx) con HTTPS e header security (CSP, HSTS, X-Frame-Options).

## 3. Frontend
1. Imposta `VITE_API_BASE_URL` verso l’endpoint API pubblico.
2. Build di produzione: `npm run build` → artefatti in `dist/`.
3. Deploy su Vercel/Netlify/S3+CloudFront con caching statico.

## 4. Post-deploy
- Smoke test manuale (login, aggiornamento piano, creazione spesa).
- Verifica log server e metriche (errori 4xx/5xx, tempi risposta).
- Aggiorna `SECURITY_CHECKLIST.md` con stato delle attività completate.

## 5. Automazioni consigliate
- **Cron job** notturno per backup database e pulizia token scaduti.
- **Alert** su errori >2% in 5 min o latenze > 800 ms.
- **Sentry/Rollbar** per error tracking frontend+backend.
- **Plausible/Matomo** per analytics privacy-first.

Questo documento è la base; adattalo al provider scelto e alle politiche interne dell’azienda.
