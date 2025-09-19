import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { usePlanner } from '../hooks/usePlanner';
const PlannerContext = createContext(null);
export function PlannerProvider({ children }) {
    const [referenceDate] = useState(() => new Date());
    const planner = usePlanner(referenceDate);
    return _jsx(PlannerContext.Provider, { value: planner, children: children });
}
export function usePlannerContext() {
    const ctx = useContext(PlannerContext);
    if (!ctx) {
        throw new Error('usePlannerContext deve essere utilizzato all’interno di PlannerProvider');
    }
    return ctx;
}
