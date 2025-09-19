import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './ui/Button';
const QUICK_PRESETS = [10, 20, 30];
export function SpendControls({ onApply, onReset, onQuickAdd, disabled }) {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(Button, { type: "button", onClick: onApply, disabled: disabled === true, className: "rounded-2xl bg-allow-primary text-white shadow-soft hover:bg-[#4b5ab5]", children: "Salva la spesa di oggi" }), _jsx(Button, { type: "button", variant: "ghost", onClick: onReset, className: "rounded-2xl border-slate-200 text-slate-500", children: "Azzera" })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-slate-500", children: ["Aggiungi al volo:", QUICK_PRESETS.map((amount) => (_jsxs(Button, { type: "button", size: "sm", variant: "subtle", onClick: () => onQuickAdd(amount), className: "rounded-full bg-white text-slate-600 shadow-none hover:bg-[#eef1ff]", children: ["+\u20AC ", amount] }, amount)))] })] }));
}
