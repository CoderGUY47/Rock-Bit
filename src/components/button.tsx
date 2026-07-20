import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all active:scale-95 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-interactive shadow-md shadow-primary/10 rounded-full cursor-pointer',
        destructive: 'bg-[#D33535] text-white hover:bg-[#D33535]/90 rounded-full cursor-pointer',
        outline: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-55 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-full cursor-pointer',
        secondary: 'bg-secondary text-white hover:bg-secondary/80 rounded-full cursor-pointer',
        ghost: 'hover:bg-gray-55 dark:hover:bg-gray-800 text-secondary dark:text-secondary2 hover:text-primary dark:hover:text-primary rounded-full cursor-pointer',
        link: 'text-primary underline-offset-4 hover:underline cursor-pointer',
      },
      size: {
        default: 'px-5 py-2.5 text-xs',
        sm: 'px-4 py-2 text-xs rounded-full',
        lg: 'px-8 py-4 text-base rounded-full',
        icon: 'p-2 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
