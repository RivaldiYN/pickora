import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-ink/85 dark:hover:bg-ink/90",
        accent: "bg-accent text-white hover:bg-accent-hover",
        destructive: "bg-accent text-white hover:bg-accent-hover",
        outline: "border border-rule bg-surface text-ink hover:border-ink/40 dark:hover:border-ink/60",
        ghost: "text-muted hover:bg-ink/5 hover:text-ink",
      },
      size: {
        default: "min-h-11 px-4",
        sm: "min-h-9 px-3 text-xs",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, loadingText, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading && (
        <Loader2 className="size-4 animate-spin shrink-0" />
      )}
      {isLoading ? (loadingText ?? children) : children}
    </button>
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
