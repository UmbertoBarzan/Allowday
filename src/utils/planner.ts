import { addDays, format } from 'date-fns';
import { it } from 'date-fns/locale';

export type PlannerMode = 'soft' | 'hard';

export interface PlannerInputs {
  monthlyIncome: number;
  recurring: number;
  extraSavings: number;
  days: number;
  mode: PlannerMode;
  spendToday: number;
}

export interface PlanDay {
  index: number;
  amount: number;
  deltaFromBase: number;
  status: 'green' | 'yellow' | 'red';
  label: string;
}

export interface PlannerResult {
  baseAmount: number;
  variableBudget: number;
  remainingBudget: number;
  statusLabel: 'VERDE' | 'GIALLO' | 'ROSSO';
  status: 'green' | 'yellow' | 'red';
  spendApplied: number;
  todayDelta: number;
  futureDays: PlanDay[];
  futureDebt: number;
  mode: PlannerMode;
  days: number;
  monthlyIncome: number;
  recurring: number;
  extraSavings: number;
}

interface BuildPlanOptions {
  applySpend: boolean;
  referenceDate?: Date;
}

const STATUS_THRESHOLD = 0.9;

const toFixedCurrency = (value: number) => (Number.isFinite(value) ? Number(value.toFixed(2)) : 0);

const buildFuturePlan = (
  base: number,
  days: number,
  inputs: PlannerInputs,
  applySpend: boolean
) => {
  const future = Array.from({ length: Math.max(0, days - 1) }, () => base);

  if (!applySpend) {
    return { future, debt: 0 };
  }

  const spend = Math.max(0, inputs.spendToday);
  const over = Math.max(0, spend - base);
  const under = Math.max(0, base - spend);

  if (inputs.mode === 'hard') {
    let debt = over;
    for (let i = 0; i < future.length && debt > 0; i += 1) {
      const available = future[i];
      if (debt >= available) {
        future[i] = 0;
        debt -= available;
      } else {
        future[i] = toFixedCurrency(Math.max(0, available - debt));
        debt = 0;
      }
    }
    if (under > 0 && future.length > 0) {
      future[0] = toFixedCurrency(future[0] + under);
    }
    return { future, debt: toFixedCurrency(debt) };
  }

  const baseBudget = Math.max(0, inputs.monthlyIncome - inputs.recurring);
  const pool = Math.max(0, baseBudget - spend) + Math.max(0, inputs.extraSavings);
  const daysLeft = future.length;
  const perDay = daysLeft > 0 ? pool / daysLeft : 0;

  return { future: future.map(() => toFixedCurrency(perDay)), debt: 0 };
};

export function buildPlan(inputs: PlannerInputs, options: BuildPlanOptions): PlannerResult {
  const { applySpend, referenceDate = new Date() } = options;
  const days = Math.max(1, Math.round(inputs.days));

  const baseBudget = Math.max(0, inputs.monthlyIncome - inputs.recurring);
  const variableBudget = toFixedCurrency(baseBudget + Math.max(0, inputs.extraSavings));
  const baseAmount = days > 0 ? variableBudget / days : 0;
  const spend = Math.max(0, inputs.spendToday);

  const { future, debt } = buildFuturePlan(baseAmount, days, inputs, applySpend);

  const remainingBudget = applySpend
    ? Math.max(0, variableBudget - spend)
    : variableBudget;

  const status = (() => {
    if (!applySpend) return 'green';
    if (spend > baseAmount) return 'red';
    if (spend >= baseAmount * STATUS_THRESHOLD) return 'yellow';
    return 'green';
  })();

  const statusLabel: PlannerResult['statusLabel'] =
    status === 'red' ? 'ROSSO' : status === 'yellow' ? 'GIALLO' : 'VERDE';

  const todayDelta = applySpend ? toFixedCurrency(baseAmount - spend) : toFixedCurrency(baseAmount);

  const futureDays: PlanDay[] = future.map((amount, index) => {
    const date = addDays(referenceDate, index + 1);
    const statusForDay: PlanDay['status'] =
      amount <= 0.01 ? 'red' : amount < baseAmount * STATUS_THRESHOLD ? 'yellow' : 'green';

    return {
      index,
      amount: toFixedCurrency(amount),
      deltaFromBase: toFixedCurrency(amount - baseAmount),
      status: statusForDay,
      label: format(date, 'EEE d MMM', { locale: it }),
    };
  });

  return {
    baseAmount: toFixedCurrency(baseAmount),
    variableBudget: toFixedCurrency(variableBudget),
    remainingBudget: toFixedCurrency(remainingBudget),
    statusLabel,
    status,
    spendApplied: applySpend ? toFixedCurrency(spend) : 0,
    todayDelta,
    futureDays,
    futureDebt: debt,
    mode: inputs.mode,
    days,
    monthlyIncome: toFixedCurrency(inputs.monthlyIncome),
    recurring: toFixedCurrency(inputs.recurring),
    extraSavings: toFixedCurrency(inputs.extraSavings),
  };
}
