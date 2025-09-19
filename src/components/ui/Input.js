import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
export const Input = forwardRef(({ className, containerClassName, type = 'text', prefix, suffix, ...props }, ref) => {
    return (_jsxs("div", { className: clsx('flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-inner', containerClassName), children: [prefix ? _jsx("span", { className: "text-slate-400", children: prefix }) : null, _jsx("input", { ref: ref, type: type, className: clsx('flex-1 border-none bg-transparent text-base font-semibold text-slate-700 outline-none placeholder:text-slate-300', className), ...props }), suffix ? _jsx("span", { className: "text-slate-400", children: suffix }) : null] }));
});
Input.displayName = 'Input';
