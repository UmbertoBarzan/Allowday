import { createContext, useContext, useState, type ReactNode } from 'react';
import { usePlanner } from '../hooks/usePlanner';

const PlannerContext = createContext<ReturnType<typeof usePlanner> | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [referenceDate] = useState(() => new Date());
  const planner = usePlanner(referenceDate);

  return <PlannerContext.Provider value={planner}>{children}</PlannerContext.Provider>;
}

export function usePlannerContext() {
  const ctx = useContext(PlannerContext);
  if (!ctx) {
    throw new Error('usePlannerContext deve essere utilizzato all’interno di PlannerProvider');
  }
  return ctx;
}
