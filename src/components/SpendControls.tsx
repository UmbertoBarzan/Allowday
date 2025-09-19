import { Button } from './ui/Button';

interface SpendControlsProps {
  onApply: () => void;
  onReset: () => void;
  onQuickAdd: (value: number) => void;
  disabled?: boolean;
}

const QUICK_PRESETS = [10, 20, 30];

export function SpendControls({ onApply, onReset, onQuickAdd, disabled }: SpendControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={onApply}
          disabled={disabled === true}
          className="rounded-2xl bg-allow-primary text-white shadow-soft hover:bg-[#4b5ab5]"
        >
          Salva la spesa di oggi
        </Button>
        <Button type="button" variant="ghost" onClick={onReset} className="rounded-2xl border-slate-200 text-slate-500">
          Azzera
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        Aggiungi al volo:
        {QUICK_PRESETS.map((amount) => (
          <Button
            key={amount}
            type="button"
            size="sm"
            variant="subtle"
            onClick={() => onQuickAdd(amount)}
            className="rounded-full bg-white text-slate-600 shadow-none hover:bg-[#eef1ff]"
          >
            +€ {amount}
          </Button>
        ))}
      </div>
    </div>
  );
}
