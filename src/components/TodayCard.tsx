import { clsx } from 'clsx';
import type { PlannerResult } from '../utils/planner';

interface TodayCardProps {
  plan: PlannerResult;
  spendToday: number;
  spendLocked: boolean;
}

const todayColors: Record<PlannerResult['status'], string> = {
  green: 'from-[#4fb286] to-[#78ceaa]',
  yellow: 'from-[#f7c948] to-[#fde9a4]',
  red: 'from-[#f97068] to-[#fbb5ae]',
};

export function TodayCard({ plan, spendToday, spendLocked }: TodayCardProps) {
  const base = plan.baseAmount;
  const ratio = base > 0 ? Math.min(spendToday / base, 2) : spendToday > 0 ? 2 : 0;
  const percentage = Math.min(100, Math.round(ratio * 100));

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Oggi</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">Ecco quanto puoi spendere serenamente.</p>
        </div>
        <div
          className={clsx(
            'rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md',
            plan.status === 'green'
              ? 'bg-[#4fb286]'
              : plan.status === 'yellow'
              ? 'bg-[#f7c948] text-slate-700'
              : 'bg-[#f97068]'
          )}
        >
          {plan.statusLabel}
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-3xl bg-[#f7f8fe] p-5 sm:grid-cols-3">
        <Metric label="Quota base" value={`€ ${base.toFixed(2)}`} />
        <Metric label="Spesa registrata" value={spendToday > 0 || spendLocked ? `€ ${spendToday.toFixed(2)}` : '0 €'} />
        <Metric
          label={plan.todayDelta >= 0 ? 'Ancora disponibili' : 'Da recuperare'}
          value={`€ ${Math.abs(plan.todayDelta).toFixed(2)}`}
          emphasis={plan.todayDelta >= 0 ? 'positive' : 'negative'}
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Progresso della giornata</span>
          <span>{percentage}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className={clsx('h-full rounded-full bg-gradient-to-r transition-all duration-500', todayColors[plan.status])}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Se sfori, niente panico: scegli se recuperare subito (Hard) o distribuire (Soft). Ci pensiamo noi a ridipingere il calendario.
        </p>
      </div>
    </div>
  );
}

interface MetricProps {
  label: string;
  value: string;
  emphasis?: 'positive' | 'negative';
}

function Metric({ label, value, emphasis }: MetricProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p
        className={clsx('mt-1 text-xl font-semibold text-slate-800', {
          'text-[#4fb286]': emphasis === 'positive',
          'text-[#f97068]': emphasis === 'negative',
        })}
      >
        {value}
      </p>
    </div>
  );
}
