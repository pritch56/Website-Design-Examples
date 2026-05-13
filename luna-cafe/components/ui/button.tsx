import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-charcoal)] text-[var(--color-cream)] hover:bg-[var(--color-tan-dark)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(44,44,44,0.4)]",
        primary:
          "bg-[var(--color-tan)] text-[var(--color-charcoal)] hover:bg-[var(--color-tan-light)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(212,163,115,0.55)]",
        outline:
          "border border-[var(--color-charcoal)]/15 bg-transparent text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-cream)] hover:border-[var(--color-charcoal)]",
        ghost:
          "bg-transparent text-[var(--color-charcoal)] hover:bg-[var(--color-cream-200)]",
        translucent:
          "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-[var(--color-charcoal)]",
        link:
          "underline-offset-4 hover:underline text-[var(--color-tan-dark)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-9 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
