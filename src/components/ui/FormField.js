import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
export function FormField({ label, description, children, className }) {
    return (_jsxs("label", { className: clsx('flex flex-col gap-2 rounded-3xl border border-slate-100 bg-white p-5 shadow-soft', className), children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-slate-700", children: label }), description ? _jsx("p", { className: "text-xs text-slate-400", children: description }) : null] }), children] }));
}
