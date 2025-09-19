import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  prefix?: string;
  suffix?: string;
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type = 'text', prefix, suffix, ...props }, ref) => {
    return (
      <div
        className={clsx(
          'flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-inner',
          containerClassName
        )}
      >
        {prefix ? <span className="text-slate-400">{prefix}</span> : null}
        <input
          ref={ref}
          type={type}
          className={clsx(
            'flex-1 border-none bg-transparent text-base font-semibold text-slate-700 outline-none placeholder:text-slate-300',
            className
          )}
          {...props}
        />
        {suffix ? <span className="text-slate-400">{suffix}</span> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
