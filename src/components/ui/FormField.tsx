import { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface FormFieldProps {
  label: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, description, children, className }: FormFieldProps) {
  return (
    <label className={clsx('flex flex-col gap-2 rounded-3xl border border-slate-100 bg-white p-5 shadow-soft', className)}>
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        {description ? <p className="text-xs text-slate-400">{description}</p> : null}
      </div>
      {children}
    </label>
  );
}
