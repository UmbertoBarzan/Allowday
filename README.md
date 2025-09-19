# Allowday

Allowday è una webapp finanziaria full-stack che ti dice quanto puoi spendere oggi e come le scelte si riflettono sui prossimi giorni. L’interfaccia prende ispirazione da fintech affermate (es. Revolut, Mint) e include routing multi-pagina, sezioni legal compliant e un’API sicura con autenticazione JWT.

## Architettura

```
.
├── README.md
├── .env.example                 # variabili lato frontend
├── package.json                 # frontend (Vite + React)
├── api/                         # backend Express + Prisma
│   ├── package.json
│   ├── prisma/schema.prisma     # modello dati (SQLite di default)
│   └── src/
│       ├── controllers/         # auth + planner REST
│       ├── middleware/          # JWT guard
│       ├── schemas/             # validazioni Zod
│       └── server.ts            # bootstrap API
└── src/                         # codice frontend
    ├── components/              # UI riutilizzabile
    ├── context/                 # Auth + Planner provider
    ├── hooks/                   # logica di calcolo
    ├── layouts/                 # MainLayout + AuthLayout
    ├── pages/                   # Dashboard, Calendario, Insights, ecc.
    └── services/                # client HTTP centralizzato
```

## Funzionalità chiave

- **Autenticazione** email/password con hashing BCrypt, JWT e storage sicuro del token
- **Planner** sincronizzato: stipendi mensili, spese fisse, fondo extra opzionale e storico spese (modalità hard/soft)
- **Dashboard multi-vista**: calendario semaforo mensile, insights intuitivi, onboarding, impostazioni e sezione legale GDPR-ready
- **API REST** tipate con Prisma, validazione Zod, Helmet, CORS configurabile e logging HTTP

## Requisiti

- Node.js >= 18 (raccomandato 20) – in conda: `conda install -c conda-forge nodejs=20`
- npm >= 9

## Setup rapido

1. **Frontend**
   ```bash
   npm install
   cp .env.example .env               # opzionale: imposta VITE_API_BASE_URL
   npm run dev
   ```
   App disponibile su <http://localhost:5173>.

2. **Backend API**
   ```bash
   cd api
   npm install
   cp .env.example .env               # modifica JWT_SECRET prima di andare in prod
   npx prisma migrate dev --name init # genera db SQLite e client
   npm run dev                        # avvia API su http://localhost:4000
   ```

3. **Accesso**
   - Visita `http://localhost:5173/register` per creare un account
   - Dopo il login, il planner carica/sincronizza automaticamente le impostazioni e lo storico spese

## Comandi utili

| Scopo                     | Frontend                      | Backend (api/)                  |
|--------------------------|-------------------------------|---------------------------------|
| Sviluppo live            | `npm run dev`                 | `npm run dev`                   |
| Build produzione         | `npm run build`               | `npm run build`                 |
| Preview build            | `npm run preview`             | `npm start` (dopo build)        |
| Prisma Client            | —                             | `npm run prisma:generate`       |
| Migrazioni database      | —                             | `npm run prisma:migrate`        |

## Sicurezza & compliance

- Password cifrate con BCrypt (12 round) e token JWT con scadenza 12h
- Middleware Helmet + CORS ristretto all’origine configurata (`CORS_ORIGIN`)
- Validazione server-side (Zod) contro input non atteso, error handling coerente
- Sezioni legali (Privacy/Termini/Cookie/Disclaimer) già predisposte per GDPR
- Log di accesso via `morgan`, schema dati pensato per audit (SpendingEntry con timestamp)

## Checklist per produzione

1. **Infrastruttura**
   - Passare da SQLite a PostgreSQL su cloud (es. Supabase, RDS) aggiornando `DATABASE_URL`
   - Deploy API su ambiente con TLS (Docker/Render/Fly.io) e reverse proxy sicuro (Nginx, Cloudflare)
   - Deploy frontend su Vercel/Netlify con `VITE_API_BASE_URL` puntato alla API pubblica

2. **Sicurezza aggiuntiva**
   - Secret management (Vault, Doppler) e rotazione periodica JWT_SECRET
   - Implementare refresh token/short session + 2FA o passkey
   - Aggiungere rate limiting (es. `express-rate-limit`) e protezioni CSRF per endpoint mutanti

3. **Qualità & osservabilità**
   - Test unitari (Vitest/Jest) + e2e (Playwright/Cypress)
   - Pipeline CI (lint, test, build, audit) e scansione vulnerabilità (`npm audit`, Snyk)
   - Monitoring: log centralizzati, metriche (Prometheus) e alerting incident (PagerDuty, Opsgenie)

4. **Legale & business**
   - Rivedere policy con consulente, predisporre Data Processing Agreement e registro trattamenti
   - Integrare sistemi di pagamento (es. Stripe) se previsto un piano premium
   - Configurare supporto clienti (email dedicata, help desk) e procedure di data breach response

## Roadmap suggerita

1. Persistenza client-side (cache offline) e sincronizzazione multi-dispositivo
2. Segmentazione utenti / piani multipli con ruoli differenti
3. Automazione reportistica (es. esportazione CSV/Excel, integrazione conto bancario PSD2)
4. Copertura test >80% + Accessibility audit (WCAG 2.1 AA)

Buona pianificazione con Allowday! 🟢
