import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../services/apiClient';
import { buildPlan } from '../utils/planner';
const DEFAULT_STATE = {
    monthlyIncome: 1600,
    recurring: 650,
    extraSavings: 0,
    days: 30,
    mode: 'soft',
    spendToday: 0,
    spendLocked: false,
};
export function usePlanner(referenceDate = new Date()) {
    const { token } = useAuth();
    const [state, setState] = useState(DEFAULT_STATE);
    const [loading, setLoading] = useState(true);
    const [spendingHistory, setSpendingHistory] = useState([]);
    const syncTimeout = useRef(null);
    const syncSettings = useCallback(async (nextState) => {
        if (!token)
            return;
        try {
            await apiClient.put('/planner/settings', {
                monthlyIncome: nextState.monthlyIncome,
                recurring: nextState.recurring,
                extraSavings: nextState.extraSavings,
                days: nextState.days,
                mode: nextState.mode,
            }, { token });
        }
        catch (error) {
            console.error('Impossibile sincronizzare le impostazioni', error);
        }
    }, [token]);
    const scheduleSync = useCallback((nextState) => {
        if (!token)
            return;
        if (syncTimeout.current) {
            clearTimeout(syncTimeout.current);
        }
        syncTimeout.current = setTimeout(() => {
            void syncSettings(nextState);
        }, 600);
    }, [syncSettings, token]);
    const loadInitialData = useCallback(async () => {
        if (!token)
            return;
        setLoading(true);
        try {
            const settings = await apiClient.get('/planner/settings', { token });
            setState((prev) => ({
                ...prev,
                monthlyIncome: settings.monthlyIncome,
                recurring: settings.recurring,
                extraSavings: settings.extraSavings ?? 0,
                days: settings.days,
                mode: settings.mode,
                spendLocked: false,
                spendToday: 0,
            }));
            const spending = await apiClient.get('/planner/spending', { token });
            setSpendingHistory(spending);
        }
        catch (error) {
            console.error('Errore nel caricamento delle impostazioni', error);
        }
        finally {
            setLoading(false);
        }
    }, [token]);
    useEffect(() => {
        void loadInitialData();
        return () => {
            if (syncTimeout.current) {
                clearTimeout(syncTimeout.current);
            }
        };
    }, [loadInitialData]);
    const updateField = (field, value) => {
        setState((prev) => {
            const next = { ...prev };
            if (field === 'mode') {
                next.mode = value;
                next.spendLocked = false;
                scheduleSync(next);
                return next;
            }
            const numeric = typeof value === 'number' ? (Number.isNaN(value) ? 0 : value) : 0;
            if (field === 'days') {
                next.days = Math.max(1, Math.round(numeric));
                scheduleSync(next);
            }
            else if (field === 'spendToday') {
                next.spendToday = Math.max(0, numeric);
            }
            else if (field === 'recurring') {
                next.recurring = Math.max(0, numeric);
                scheduleSync(next);
            }
            else if (field === 'monthlyIncome') {
                next.monthlyIncome = Math.max(0, numeric);
                scheduleSync(next);
            }
            else if (field === 'extraSavings') {
                next.extraSavings = Math.max(0, numeric);
                scheduleSync(next);
            }
            next.spendLocked = false;
            return next;
        });
    };
    const updateSpend = (delta) => {
        setState((prev) => ({
            ...prev,
            spendToday: Math.max(0, prev.spendToday + delta),
            spendLocked: false,
        }));
    };
    const persistSpend = useCallback(async (amount) => {
        if (!token || amount <= 0)
            return;
        try {
            const entry = await apiClient.post('/planner/spending', { amount, date: new Date().toISOString() }, { token });
            setSpendingHistory((prev) => [entry, ...prev].slice(0, 30));
        }
        catch (error) {
            console.error('Errore nella registrazione della spesa', error);
        }
    }, [token]);
    const applySpend = async () => {
        const amount = state.spendToday;
        setState((prev) => ({ ...prev, spendLocked: true }));
        await persistSpend(amount);
    };
    const releaseSpend = () => {
        setState((prev) => ({ ...prev, spendLocked: false }));
    };
    const resetSpend = () => {
        setState((prev) => ({ ...prev, spendToday: 0, spendLocked: false }));
    };
    const plan = useMemo(() => buildPlan(state, { referenceDate, applySpend: state.spendLocked }), [state, referenceDate]);
    return {
        state,
        plan,
        loading,
        spendingHistory,
        updateField,
        updateSpend,
        applySpend,
        releaseSpend,
        resetSpend,
        refetch: loadInitialData,
    };
}
