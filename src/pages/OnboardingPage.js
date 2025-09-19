import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
const steps = [
    {
        title: 'Metti i numeri di base',
        description: 'Saldo attuale, spese fisse e quanti giorni vuoi coprire. Serve solo questo.',
    },
    {
        title: 'Registra la spesa del giorno',
        description: 'Un click e il calendario si colora da solo. Verde, giallo o rosso.',
    },
    {
        title: 'Controlla il calendario',
        description: 'Se vedi rosso, riduci spese o allunga i giorni. Tutto è aggiornato in tempo reale.',
    },
];
export function OnboardingPage() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("header", { className: "space-y-2", children: [_jsx("span", { className: "inline-flex items-center gap-2 rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-allow-primary", children: "Come funziona?" }), _jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Tre mosse e hai il tuo semaforo personale." }), _jsx("p", { className: "text-sm text-slate-500", children: "Segui questi step ogni mattina. Bastano due minuti per stare tranquillo tutto il giorno." })] }), _jsx("div", { className: "grid gap-6 md:grid-cols-3", children: steps.map((step, index) => (_jsxs("div", { className: "space-y-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-soft", children: [_jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eef1ff] text-sm font-semibold text-allow-primary", children: index + 1 }), _jsx("h2", { className: "text-lg font-semibold text-slate-700", children: step.title }), _jsx("p", { className: "text-sm text-slate-500", children: step.description })] }, step.title))) }), _jsxs("div", { className: "flex flex-col gap-4 rounded-3xl border border-slate-100 bg-gradient-to-r from-[#eef1ff] to-[#fdf2f3] p-6 shadow-soft md:flex-row md:items-center md:justify-between", children: [_jsx("p", { className: "text-sm text-slate-600", children: "Hai gi\u00E0 fatto questi step? Torna alla Dashboard per aggiornare la spesa e vedere il calendario cambiare colore." }), _jsx(Button, { type: "button", variant: "primary", size: "sm", className: "rounded-2xl", onClick: () => navigate('/dashboard'), children: "Vai alla Dashboard" })] })] }));
}
