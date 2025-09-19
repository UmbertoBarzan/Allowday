import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
export function NotFoundPage() {
    return (_jsxs("div", { className: "mx-auto flex max-w-xl flex-col items-center gap-6 rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-soft", children: [_jsx("span", { className: "rounded-full border border-[#f9a5a3] bg-[#fee8ea] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#c2403d]", children: "404" }), _jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Pagina non trovata" }), _jsx("p", { className: "text-sm text-slate-500", children: "Potrebbe essere stata spostata o rinominata. Torna alla dashboard per avere subito il tuo semaforo aggiornato." }), _jsx(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 rounded-2xl bg-allow-primary px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-[#4b5ab5]", children: "Vai alla dashboard" })] }));
}
