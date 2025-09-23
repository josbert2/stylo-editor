import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import "./StyloApp.css";
import { Label } from "react-aria-components";

const labelVariants = cva("stylo-label", {
  variants: {
    size: {
      sm: "stylo-label-sm",
      md: "stylo-label-md",
      lg: "stylo-label-lg"
    },
    weight: {
      normal: "stylo-label-weight-normal",
      medium: "stylo-label-weight-medium",
      bold: "stylo-label-weight-bold"
    },
    required: {
      true: "stylo-label-required"
    },
    theme: {
      default: "stylo-label-theme-default",
      primary: "stylo-label-theme-primary",
      secondary: "stylo-label-theme-secondary",
      subtle: "stylo-label-theme-subtle",
      error: "stylo-label-theme-error"
    }
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    required: false,
    theme: "default"
  }
});

export type StyloAppProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants> & {
    /**
     * Text content of the label
     */
    children: React.ReactNode;
    /**
     * HTML for attribute to link with form control
     */
    htmlFor?: string;
    /**
     * Whether to show required asterisk
     */
    required?: boolean;
    /**
     * Helper text to display below the label
     */
    helperText?: string;
  };

/**
 * Label component for form controls
 */
export const StyloApp = React.forwardRef<HTMLLabelElement, StyloAppProps>(
  (
    {
      className,
      children,
      size,
      weight,
      theme,
      required,
      htmlFor,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <div className="stylo-app">
        <label
          className={cn(
            labelVariants({ size, weight, required, theme }),
            className
          )}
          ref={ref}
          htmlFor={htmlFor}
          {...props}
        >
          {children}
        </label>
        {helperText && (
          <span className="stylo-label-helper-text">{helperText}</span>
        )}
      </div>
    );
  }
);

StyloApp.displayName = "StyloApp";


// Export removed as it's now exported with the type definition