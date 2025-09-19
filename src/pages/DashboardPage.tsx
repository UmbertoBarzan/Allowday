import { ChangeEvent } from 'react';
import { usePlannerContext } from '../context/PlannerContext';
import { Input } from '../components/ui/Input';
import { ModeToggle } from '../components/ModeToggle';
import { TodayCard } from '../components/TodayCard';
import { PlanCalendar } from '../components/PlanCalendar';
import { PlannerSummary } from '../components/PlannerSummary';
import { SpendControls } from '../components/SpendControls';

export function DashboardPage() {
  const {
    state: { monthlyIncome, recurring, extraSavings, days, mode, spendToday, spendLocked },
    plan,
    loading,
    updateField,
    updateSpend,
    applySpend,
    resetSpend,
  } = usePlannerContext();

  const handleNumberChange = (
    field: 'monthlyIncome' | 'recurring' | 'extraSavings' | 'days' | 'spendToday'
  ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value.replace(',', '.');
      const value = raw === '' ? 0 : Number.parseFloat(raw);
      updateField(field, Number.isNaN(value) ? 0 : value);
    };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <header className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-allow-primary">
                Passo 1 — Inserisci i tuoi numeri
              </span>
              <h1 className="text-3xl font-bold text-slate-800">Basta complicazioni: qui metti i soldi che hai e quanto ti serve ogni mese.</h1>
              <p className="text-sm text-slate-500">
                Compila questi tre campi e lascia che Allowday faccia i conti. Non serve essere esperti: ti diciamo solo quanto puoi spendere oggi.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <FieldCard
                title="Stipendio mensile netto"
                description="L’importo che ricevi ogni mese in busta paga."
              >
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  prefix="€"
                  value={monthlyIncome}
                  onChange={handleNumberChange('monthlyIncome')}
                  containerClassName="h-12 bg-[#f7f8fe]"
                  className="text-lg"
                />
              </FieldCard>

              <FieldCard
                title="Spese fisse al mese"
                description="Affitto, mutuo, bollette e imprevisti sicuri."
              >
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  prefix="€"
                  value={recurring}
                  onChange={handleNumberChange('recurring')}
                  containerClassName="h-12 bg-[#f7f8fe]"
                  className="text-lg"
                />
              </FieldCard>

              <FieldCard
                title="Risparmi extra (facoltativi)"
                description="Se vuoi includere un fondo cuscinetto, inseriscilo qui."
              >
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  prefix="€"
                  value={extraSavings}
                  onChange={handleNumberChange('extraSavings')}
                  containerClassName="h-12 bg-[#f7f8fe]"
                  className="text-lg"
                />
              </FieldCard>

              <FieldCard
                title="Per quanti giorni vuoi che duri?"
                description="Scegli l’orizzonte del tuo piano."
              >
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step="1"
                  suffix="giorni"
                  value={days}
                  onChange={handleNumberChange('days')}
                  containerClassName="h-12 bg-[#f7f8fe]"
                  className="text-lg"
                />
              </FieldCard>

              <FieldCard
                title="Come preferisci recuperare gli sforamenti?"
                description="Soft = spalma tutto, Hard = recupero immediato."
              >
                <ModeToggle value={mode} onChange={(value) => updateField('mode', value)} />
              </FieldCard>
            </div>
          </div>

          <aside className="rounded-3xl bg-[#fdf2f3] p-6">
            <h2 className="text-lg font-semibold text-allow-primary">Promemoria veloce</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>
                <strong className="text-slate-700">1.</strong> Inserisci stipendio e spese fisse una sola volta: li salviamo in modo sicuro.
              </li>
              <li>
                <strong className="text-slate-700">2.</strong> Ogni mattina registra quanto spendi: un click e il calendario si aggiorna.
              </li>
              <li>
                <strong className="text-slate-700">3.</strong> Verde significa “ok”, giallo “vai piano”, rosso “stop”. Semplice.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <PlannerSummary plan={plan} />

          <div className="mt-8 space-y-4 rounded-2xl bg-[#f7f8fe] p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Quanto hai speso oggi?</p>
                <p className="text-xs text-slate-500">Somma anche i piccoli caffè: registriamo tutto noi.</p>
              </div>
              <div className="w-full max-w-xs">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  prefix="€"
                  value={spendToday}
                  onChange={handleNumberChange('spendToday')}
                  containerClassName="h-12"
                  className="text-lg"
                />
              </div>
            </div>
            <SpendControls
              onApply={() => {
                void applySpend();
              }}
              onReset={resetSpend}
              onQuickAdd={(amount) => updateSpend(amount)}
              disabled={spendToday <= 0 || loading}
            />
          </div>
        </div>

        <div className="space-y-6">
          <TodayCard plan={plan} spendToday={spendToday} spendLocked={spendLocked} />
          <PlanCalendar plan={plan} />
        </div>
      </section>
    </div>
  );
}

interface FieldCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function FieldCard({ title, description, children }: FieldCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-5 shadow-soft">
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      {children}
    </div>
  );
}
