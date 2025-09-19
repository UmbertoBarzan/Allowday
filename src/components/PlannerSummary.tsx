import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { PiggyBank, ShieldCheck, Wallet, Coins } from 'lucide-react';
import type { PlannerResult } from '../utils/planner';

interface PlannerSummaryProps {
  plan: PlannerResult;
}

const statusStyles: Record<PlannerResult['status'], string> = {
  green: 'bg-[#e3f8f5] text-[#1d7a65] border-[#9bdac7]',
  yellow: 'bg-[#fff6e0] text-[#b68a12] border-[#f8d477]',
  red: 'bg-[#fee8ea] text-[#c2403d] border-[#f9a5a3]',
};

export function PlannerSummary({ plan }: PlannerSummaryProps) {
  return (
    <div className="space-y-6">
      <div className={clsx('inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide', statusStyles[plan.status])}>
        Oggi sei: {plan.statusLabel}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<Wallet className="h-5 w-5" />}
          title="Stipendio netto"
          value={`€ ${plan.monthlyIncome.toFixed(2)}`}
          subtitle="Quello che incassi ogni mese."
        />
        <SummaryCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Spese fisse"
          value={`€ ${plan.recurring.toFixed(2)}`}
          subtitle="Affitto, bollette, rate e costi certi."
        />
        {plan.extraSavings > 0 ? (
          <SummaryCard
            icon={<Coins className="h-5 w-5" />}
            title="Fondo extra"
            value={`€ ${plan.extraSavings.toFixed(2)}`}
            subtitle="Savings aggiunti al piano."
          />
        ) : null}
        <SummaryCard
          icon={<PiggyBank className="h-5 w-5" />}
          title="Quota consigliata"
          value={`€ ${plan.baseAmount.toFixed(2)}`}
          subtitle="Questa è la cifra serena per ogni giorno."
        />
      </div>

      <p className="text-sm text-slate-500">
        Per i prossimi {plan.days} giorni hai <strong>€ {plan.variableBudget.toFixed(2)}</strong> da distribuire.
      </p>

      {plan.spendApplied > 0 ? (
        <p className="rounded-2xl border border-[#e3f8f5] bg-[#f1faf8] px-4 py-3 text-sm text-slate-600">
          Hai registrato <strong>€ {plan.spendApplied.toFixed(2)}</strong> di spese oggi. Ti restano
          {' '}
          <span className={plan.todayDelta >= 0 ? 'text-[#1d7a65] font-semibold' : 'text-[#c2403d] font-semibold'}>
            € {Math.abs(plan.todayDelta).toFixed(2)} {plan.todayDelta >= 0 ? 'di libertà' : 'di recupero'}
          </span>
          .
        </p>
      ) : (
        <p className="rounded-2xl border border-[#eef1ff] bg-[#f7f8fe] px-4 py-3 text-sm text-slate-600">
          Dopo aver registrato la spesa del giorno, Allowday colorerà il calendario per te.
        </p>
      )}
    </div>
  );
}

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

function SummaryCard({ icon, title, value, subtitle }: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#eef1ff] text-allow-primary">{icon}</span>
        {title}
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-800">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}
