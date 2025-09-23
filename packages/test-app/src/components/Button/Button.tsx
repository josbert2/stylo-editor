import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import "./Button.css";

const buttonVariants = cva("button-base", {
  variants: {
    variant: {
      primary: "button-primary",
      secondary: "button-secondary",
      outline: "button-outline",
      ghost: "button-ghost",
    },
    size: {
      sm: "button-sm",
      md: "button-md",
      lg: "button-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="loading-spinner">
            <span className="sr-only">Loading...</span>
          </span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };