import { Button } from './ui/Button';

interface ModeToggleProps {
  value: 'soft' | 'hard';
  onChange: (value: 'soft' | 'hard') => void;
  disabled?: boolean;
}

export function ModeToggle({ value, onChange, disabled }: ModeToggleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant={value === 'soft' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onChange('soft')}
        disabled={disabled}
        className="min-w-[120px] rounded-2xl"
      >
        Modalità soft
      </Button>
      <Button
        type="button"
        variant={value === 'hard' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onChange('hard')}
        disabled={disabled}
        className="min-w-[120px] rounded-2xl"
      >
        Modalità hard
      </Button>
    </div>
  );
}
