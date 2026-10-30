import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "accent" | "muted" | "white";
  label?: string;
  fullPage?: boolean;
}

const sizeClasses = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
};

const variantClasses = {
  default: "text-ink",
  accent: "text-accent",
  muted: "text-muted",
  white: "text-white",
};

export function Spinner({
  size = "md",
  variant = "accent",
  label,
  fullPage = false,
  className,
  ...props
}: SpinnerProps) {
  const content = (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2.5",
        fullPage ? "flex-col justify-center text-center p-8" : "",
        className
      )}
      {...props}
    >
      <Loader2
        className={cn(
          "animate-spin shrink-0",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      {label ? (
        <span
          className={cn(
            "text-xs font-medium tracking-wide",
            variant === "white" ? "text-white" : "text-muted"
          )}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">Loading...</span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper/80 backdrop-blur-xs">
        {content}
      </div>
    );
  }

  return content;
}

