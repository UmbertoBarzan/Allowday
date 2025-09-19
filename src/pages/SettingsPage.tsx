import { FormEvent, useState } from 'react';
import { Check, Save, Shield, UserCog } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-allow-primary">
          La tua area sicura
        </span>
        <h1 className="text-3xl font-bold text-slate-800">Impostazioni semplici e trasparenti.</h1>
        <p className="text-sm text-slate-500">
          Qui controlli i tuoi dati, la sicurezza e le notifiche. Tutto spiegato con parole facili.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <UserCog className="h-4 w-4 text-allow-primary" /> Dati profilo
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-600">
              Nome
              <input
                type="text"
                placeholder="Mario Rossi"
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-[#f7f8fe] px-3 py-3 text-sm text-slate-700 outline-none focus:border-allow-primary"
              />
            </label>
            <label className="text-sm text-slate-600">
              Email
              <input
                type="email"
                placeholder="mario@example.com"
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-[#f7f8fe] px-3 py-3 text-sm text-slate-700 outline-none focus:border-allow-primary"
                required
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Shield className="h-4 w-4 text-allow-primary" /> Privacy &amp; sicurezza
          </div>
          <div className="mt-4 grid gap-4 text-sm text-slate-500">
            <Toggle label="Richiedi 2FA all’accesso" defaultChecked />
            <Toggle label="Invia report mensile cifrato via email" />
            <Toggle label="Abilita esportazione dati in formato GDPR" defaultChecked />
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Allowday usa i tuoi dati solo per mostrarti il calendario. Puoi scaricarli o cancellarli quando vuoi.
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary" className="gap-2 rounded-2xl">
            <Save className="h-4 w-4" /> Salva impostazioni
          </Button>
          {saved ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#4fb286]/30 bg-[#e3f8f5] px-3 py-1 text-xs font-semibold text-[#1d7a65]">
              <Check className="h-3.5 w-3.5" /> Salvato!
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-[#f7f8fe] px-4 py-3">
      <span className="text-slate-600">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-10 rounded-full border border-slate-200 bg-white accent-allow-primary"
      />
    </label>
  );
}
