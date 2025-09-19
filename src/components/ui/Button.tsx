import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl border border-transparent font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c6ac4] disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-allow-primary text-white shadow-soft hover:bg-[#4b5ab5] border-none',
        ghost:
          'bg-white text-slate-600 hover:bg-[#eef1ff] border-slate-200',
        subtle:
          'bg-[#f7f8fe] text-slate-600 hover:bg-[#eef1ff] border-slate-200',
        destructive:
          'bg-[#f97068] text-white border-none hover:bg-[#f56b63]',
      },
      size: {
        md: 'h-11 px-5 text-sm',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-6 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

export function Button({ className, variant, size, fullWidth, rounded, asChild, ...props }: ButtonProps) {
  const Component: any = asChild ? 'span' : 'button';
  return <Component className={clsx(buttonVariants({ variant, size, fullWidth, rounded }), className)} {...props} />;
}
