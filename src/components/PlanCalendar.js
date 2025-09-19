import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from 'react';
import { addDays, addMonths, differenceInCalendarDays, differenceInCalendarMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, } from 'date-fns';
import { it } from 'date-fns/locale';
const STATUS_COLORS = {
    green: { bg: 'bg-[#e3f8f5]', dot: 'bg-[#4fb286]', text: 'text-[#1d7a65]' },
    yellow: { bg: 'bg-[#fff6e0]', dot: 'bg-[#f7c948]', text: 'text-[#b68a12]' },
    red: { bg: 'bg-[#fee8ea]', dot: 'bg-[#f97068]', text: 'text-[#c2403d]' },
    pending: { bg: 'bg-[#f7f8fe]', dot: 'bg-[#d0d7ff]', text: 'text-slate-400' },
    past: { bg: 'bg-white', dot: 'bg-slate-200', text: 'text-slate-300' },
};
export function PlanCalendar({ plan }) {
    const today = useMemo(() => new Date(), []);
    const lastPlannedDay = useMemo(() => addDays(today, plan.futureDays.length), [today, plan.futureDays.length]);
    const maxOffset = useMemo(() => Math.max(0, differenceInCalendarMonths(startOfMonth(lastPlannedDay), startOfMonth(today))), [lastPlannedDay, today]);
    const [monthOffset, setMonthOffset] = useState(0);
    useEffect(() => {
        if (monthOffset > maxOffset) {
            setMonthOffset(maxOffset);
        }
    }, [maxOffset, monthOffset]);
    const { monthLabel, grid, viewMonth } = useMemo(() => {
        const viewMonth = addMonths(today, monthOffset);
        const monthStart = startOfMonth(viewMonth);
        const monthEnd = endOfMonth(viewMonth);
        const gridStart = startOfWeek(monthStart, { locale: it, weekStartsOn: 1 });
        const gridEnd = endOfWeek(monthEnd, { locale: it, weekStartsOn: 1 });
        const days = eachDayOfInterval({ start: gridStart, end: gridEnd }).map((date) => buildDayInfo(date, today, plan));
        return {
            monthLabel: format(viewMonth, "MMMM yyyy", { locale: it }),
            grid: days,
            viewMonth,
        };
    }, [monthOffset, plan, today]);
    return (_jsxs("div", { className: "rounded-3xl border border-slate-100 bg-white p-6 shadow-soft", children: [_jsxs("header", { className: "mb-6 flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-400", children: "Passo 2 \u2014 Guarda il tuo calendario" }), _jsx("h2", { className: "text-lg font-semibold text-slate-800", children: monthLabel })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: () => setMonthOffset((prev) => Math.max(0, prev - 1)), disabled: monthOffset === 0, className: "inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:text-allow-primary disabled:opacity-40", children: "\u2039" }), _jsx("button", { type: "button", onClick: () => setMonthOffset((prev) => Math.min(maxOffset, prev + 1)), disabled: monthOffset === maxOffset, className: "inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:text-allow-primary disabled:opacity-40", children: "\u203A" })] })] }), _jsxs("div", { className: "mb-4 flex items-center gap-4 text-xs text-slate-500", children: [_jsx(Legend, { color: "bg-[#4fb286]", label: "Verde = vai tranquillo" }), _jsx(Legend, { color: "bg-[#f7c948]", label: "Giallo = vai piano" }), _jsx(Legend, { color: "bg-[#f97068]", label: "Rosso = fermati" })] }), _jsx("div", { className: "grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400", children: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day) => (_jsx("div", { children: day }, day))) }), _jsx("div", { className: "mt-2 grid grid-cols-7 gap-2", children: grid.map((cell) => (_jsx(CalendarCell, { day: cell, isCurrentMonth: isSameMonth(cell.date, viewMonth) }, cell.date.toISOString()))) })] }));
}
function buildDayInfo(date, today, plan) {
    const diff = differenceInCalendarDays(date, today);
    if (diff < 0) {
        return { date, status: 'past', amount: null, delta: null };
    }
    if (diff === 0) {
        return { date, status: plan.status, amount: plan.baseAmount, delta: plan.todayDelta };
    }
    const future = plan.futureDays[diff - 1];
    if (future) {
        return { date, status: future.status, amount: future.amount, delta: future.deltaFromBase };
    }
    return { date, status: 'pending', amount: null, delta: null };
}
function CalendarCell({ day, isCurrentMonth }) {
    const colors = STATUS_COLORS[day.status];
    const showAmount = typeof day.amount === 'number';
    const isToday = isSameDay(day.date, new Date());
    return (_jsxs("div", { className: `flex min-h-[92px] flex-col justify-between rounded-2xl border border-slate-100 p-3 text-left ${isCurrentMonth ? colors.bg : 'bg-[#f3f4f8]'} ${isToday ? 'ring-2 ring-allow-primary/30' : ''}`, children: [_jsxs("div", { className: "flex items-center justify-between text-xs font-semibold text-slate-500", children: [_jsx("span", { className: `flex h-5 w-5 items-center justify-center rounded-full ${colors.dot} text-[11px] text-white`, children: format(day.date, 'd', { locale: it }) }), isToday ? _jsx("span", { className: "rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-allow-primary", children: "Oggi" }) : null] }), _jsx("div", { className: `mt-3 text-sm font-semibold ${colors.text}`, children: showAmount ? `€ ${day.amount?.toFixed(2)}` : '—' }), showAmount && day.delta !== null ? (_jsx("p", { className: "text-[10px] text-slate-500", children: day.delta === 0
                    ? 'Quota base'
                    : day.delta > 0
                        ? `+€ ${Math.abs(day.delta).toFixed(2)} rispetto alla base`
                        : `-€ ${Math.abs(day.delta).toFixed(2)} rispetto alla base` })) : (_jsx("p", { className: "text-[10px] text-slate-400", children: "Nessun dato ancora" }))] }));
}
function Legend({ color, label }) {
    return (_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { className: `h-2.5 w-2.5 rounded-full ${color}` }), label] }));
}
