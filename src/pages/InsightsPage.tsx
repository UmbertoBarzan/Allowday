import { useMemo } from 'react';
import { TrendingUp, PiggyBank, AlertTriangle, Clock, Wallet, ShieldCheck } from 'lucide-react';
import { usePlannerContext } from '../context/PlannerContext';

export function InsightsPage() {
  const { plan, spendingHistory } = usePlannerContext();

  const stats = useMemo(() => {
    const totalFuture = plan.futureDays.reduce((acc, day) => acc + day.amount, 0);
    const redDays = plan.futureDays.filter((d) => d.status === 'red').length;
    const yellowDays = plan.futureDays.filter((d) => d.status === 'yellow').length;
    const greenDays = plan.futureDays.filter((d) => d.status === 'green').length;
    const healthiest = plan.futureDays.find((d) => d.amount >= plan.baseAmount && d.status === 'green');

    return {
      totalFuture,
      redDays,
      yellowDays,
      greenDays,
      healthiestLabel: healthiest?.label ?? '—',
    };
  }, [plan]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-allow-primary">
          Cronologia morbida
        </span>
        <h1 className="text-3xl font-bold text-slate-800">Qui trovi il resoconto in parole semplici.</h1>
        <p className="text-sm text-slate-500">
          Controlla quanti giorni verdi hai davanti e ripercorri le spese registrate. È tutto già tradotto per te.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InsightCard icon={<Wallet className="h-5 w-5" />} label="Stipendio netto" value={`€ ${plan.monthlyIncome.toFixed(2)}`} />
        <InsightCard icon={<ShieldCheck className="h-5 w-5" />} label="Spese fisse" value={`€ ${plan.recurring.toFixed(2)}`} />
        <InsightCard icon={<PiggyBank className="h-5 w-5" />} label="Budget disponibile" value={`€ ${plan.variableBudget.toFixed(2)}`} />
        <InsightCard icon={<TrendingUp className="h-5 w-5" />} label="Quota giornaliera" value={`€ ${plan.baseAmount.toFixed(2)}`} />
      </section>

      <p className="text-sm text-slate-500">
        Nei prossimi giorni hai ancora <strong>€ {stats.totalFuture.toFixed(2)}</strong> da distribuire tra gialli e verdi.
      </p>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold text-slate-700">Distribuzione dei colori</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-500">
            <li>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#4fb286]" /> {stats.greenDays} giorni verdi = sereni
            </li>
            <li>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#f7c948]" /> {stats.yellowDays} giorni gialli = cautela
            </li>
            <li>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#f97068]" /> {stats.redDays} giorni rossi = frena
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-400">
            Se vedi più di due rossi consecutivi, programma un giorno “no spese” per tornare verde.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Clock className="h-4 w-4 text-allow-primary" /> Giorno più generoso
          </p>
          <p className="mt-4 text-2xl font-bold text-allow-primary">{stats.healthiestLabel}</p>
          <p className="mt-2 text-xs text-slate-400">
            Ricorda cosa hai fatto in quel giorno: è il modello perfetto da ripetere.
          </p>
        </div>

        <div className="rounded-3xl border border-[#ffe4e5] bg-[#fff5f5] p-6 text-slate-600">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#c2403d]">
            <AlertTriangle className="h-5 w-5" /> Quando preoccuparsi?
          </div>
          <p className="mt-3 text-sm">
            Modalità hard: non lasciare più di due giorni a quota zero.
            <br />
            Modalità soft: controlla che il saldo finale resti positivo.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 text-sm text-slate-500 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-700">Consigli facili</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Ogni domenica controlla le spese rosse e pianifica un giorno “risparmio”.</li>
          <li>Se arriva un extra (stipendio, rimborso), aggiungilo a “Soldi disponibili”.</li>
          <li>Per acquisti sopra i 30€, aspetta 24h: se lo vuoi ancora, registralo domani.</li>
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-700">Spese registrate di recente</h2>
            <p className="text-xs text-slate-400">È il tuo diario: niente formule, solo numeri chiari.</p>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#f7f8fe] text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Importo</th>
                <th className="px-4 py-2">Nota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {spendingHistory.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-400" colSpan={3}>
                    Registra una spesa dalla dashboard per vedere qui lo storico.
                  </td>
                </tr>
              ) : (
                spendingHistory.map((entry) => (
                  <tr key={entry.id} className="hover:bg-[#f7f8fe]">
                    <td className="px-4 py-2 text-slate-500">{new Date(entry.date).toLocaleString('it-IT')}</td>
                    <td className="px-4 py-2 text-slate-700">€ {entry.amount.toFixed(2)}</td>
                    <td className="px-4 py-2 text-slate-400">{entry.note ?? '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

interface InsightCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InsightCard({ icon, label, value }: InsightCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <span className="text-allow-primary">{icon}</span>
        {label}
      </div>
      <p className="mt-2 text-xl font-bold text-slate-700">{value}</p>
    </div>
  );
}
