import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-ring",
  {
    variants: {
      variant: {
        primary:
          "bg-amber text-navy-deep shadow-[0_2px_0_0_var(--amber-dark)] hover:brightness-105 active:shadow-[0_0px_0_0_var(--amber-dark)] active:translate-y-[2px]",
        secondary: "bg-navy text-paper hover:bg-navy-light",
        outline: "border border-ink/15 bg-transparent hover:bg-ink/5 text-ink",
        ghost: "bg-transparent hover:bg-ink/5 text-ink",
        teal: "bg-teal text-navy-deep hover:brightness-105",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-7 py-3.5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

// For rendering a Link (or any element) styled as a button, without nesting
// an <a> inside a <button> (invalid HTML). Usage: <Link className={buttonClass()}>
export function buttonClass(
  opts?: VariantProps<typeof buttonVariants>,
  className?: string,
) {
  return cn(buttonVariants(opts), className);
}
