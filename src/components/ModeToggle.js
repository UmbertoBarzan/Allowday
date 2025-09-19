import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './ui/Button';
export function ModeToggle({ value, onChange, disabled }) {
    return (_jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { type: "button", variant: value === 'soft' ? 'primary' : 'ghost', size: "sm", onClick: () => onChange('soft'), disabled: disabled, className: "min-w-[120px] rounded-2xl", children: "Modalit\u00E0 soft" }), _jsx(Button, { type: "button", variant: value === 'hard' ? 'primary' : 'ghost', size: "sm", onClick: () => onChange('hard'), disabled: disabled, className: "min-w-[120px] rounded-2xl", children: "Modalit\u00E0 hard" })] }));
}
