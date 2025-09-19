import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PlanCalendar } from '../components/PlanCalendar';
import { usePlannerContext } from '../context/PlannerContext';
export function CalendarPage() {
    const { plan } = usePlannerContext();
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("header", { className: "space-y-2", children: [_jsx("span", { className: "inline-flex items-center gap-2 rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-allow-primary", children: "Il tuo calendario" }), _jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Un colpo d\u2019occhio e capisci come sta andando." }), _jsx("p", { className: "text-sm text-slate-500", children: "Guarda ogni giorno su un vero calendario: verde vai, giallo vai piano, rosso stop." })] }), _jsx(PlanCalendar, { plan: plan }), _jsxs("section", { className: "grid gap-4 md:grid-cols-3", children: [_jsx(InfoCard, { title: "Modalit\u00E0 hard", children: "Sposta subito l\u2019eccesso sul giorno dopo. Ottima se vuoi regole rigide e ripartire pulito." }), _jsx(InfoCard, { title: "Modalit\u00E0 soft", children: "Spalma tutto sui giorni successivi. Ideale se preferisci piccole correzioni quotidiane." }), _jsx(InfoCard, { title: "Regole lampo", children: "Cerca di restare almeno all\u201980% della quota. Se scendi, pianifica un giorno spesa zero." })] })] }));
}
function InfoCard({ title, children }) {
    return (_jsxs("div", { className: "rounded-3xl border border-slate-100 bg-white p-5 text-sm text-slate-500 shadow-soft", children: [_jsx("p", { className: "text-sm font-semibold text-slate-700", children: title }), _jsx("p", { className: "mt-2 text-xs text-slate-500", children: children })] }));
}
