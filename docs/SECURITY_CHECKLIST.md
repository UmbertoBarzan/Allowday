# Allowday · Security & Compliance Checklist

## Applicazione
- [ ] Rotazione periodica di `JWT_SECRET` e gestione segreti tramite servizio dedicato (Vault, AWS Secrets Manager)
- [ ] Abilitare rate limiting sugli endpoint di autenticazione (`express-rate-limit`)
- [ ] Integrare controllo IP/Geo-fencing per accessi sospetti
- [ ] Logging sicuro con mascheramento PII (email, importi) e retention configurata

## Dati & Privacy
- [ ] Migrare a database gestito (PostgreSQL) con cifratura at-rest
- [ ] Abilitare backup automatici + procedure di restore documentate
- [ ] Redigere Data Processing Agreement e registro trattamenti (GDPR art. 30)
- [ ] Valutazione d’Impatto (DPIA) e nomina DPO se necessario

## Access Management
- [ ] Implementare MFA / passkeys per utenti e strumenti di back-office
- [ ] Creare ruoli granulari (es. admin, finance coach) con RBAC lato API
- [ ] Audit trail delle azioni critiche (creazione/aggiornamento piani, cancellazione dati)

## Infrastruttura
- [ ] Configurare HTTPS (TLS 1.2+) e HSTS sul reverse proxy
- [ ] Hardening container/VM (firewall, security updates, CIS benchmark)
- [ ] WAF / protezione DDoS (Cloudflare, AWS Shield)
- [ ] Monitoraggio continuo vulnerabilità (Dependabot, Snyk, Trivy)

## Incident Response
- [ ] Piano di gestione breach con ruoli/responsabilità
- [ ] Canale di disclosure coordinata (security.txt, bug bounty)
- [ ] Runbook per revoca token compromessi e reset credenziali

Aggiorna questa checklist ad ogni release significativa.
