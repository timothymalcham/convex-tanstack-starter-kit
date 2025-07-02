import { Input as BaseInput } from "@base-ui-components/react/input";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Input Component
 *
 * A flexible input component that provides a styled alternative to Field.Control.
 * Built on top of Base UI's Input component with comprehensive styling and state management.
 *
 * @example
 * ```jsx
 * import { Input } from '@/components/ui/Input'
 *
 * // Basic input
 * <Input placeholder="Enter your name" />
 *
 * // With different sizes
 * <Input size="sm" placeholder="Small input" />
 * <Input size="md" placeholder="Medium input" />
 * <Input size="lg" placeholder="Large input" />
 *
 * // Different input types
 * <Input type="email" placeholder="Email address" />
 * <Input type="password" placeholder="Password" />
 * <Input type="number" placeholder="Age" />
 * <Input type="tel" placeholder="Phone number" />
 * <Input type="url" placeholder="Website URL" />
 *
 * // With states
 * <Input disabled placeholder="Disabled input" />
 * <Input data-invalid placeholder="Invalid input" />
 *
 * // Controlled input
 * const [value, setValue] = React.useState('')
 *
 * <Input
 *   value={value}
 *   onValueChange={(newValue) => setValue(newValue)}
 *   placeholder="Controlled input"
 * />
 *
 * // Full width input
 * <Input fullWidth placeholder="Full width input" />
 *
 * // With Field component for labels and validation
 * <Field.Root>
 *   <Field.Label>Email Address</Field.Label>
 *   <Input type="email" placeholder="john@example.com" />
 *   <Field.Description>We'll never share your email.</Field.Description>
 * </Field.Root>
 *
 * // With error state
 * <Field.Root>
 *   <Field.Label>Password</Field.Label>
 *   <Input type="password" data-invalid placeholder="Password" />
 *   <Field.Error>Password must be at least 8 characters</Field.Error>
 * </Field.Root>
 *
 * // With custom styling
 * <Input
 *   className="border-green-500 focus:ring-green-500"
 *   placeholder="Custom styled input"
 * />
 *
 * // In a form
 * <form>
 *   <Input name="firstName" placeholder="First Name" required />
 *   <Input name="lastName" placeholder="Last Name" required />
 *   <Input name="email" type="email" placeholder="Email" required />
 * </form>
 * ```
 */

interface InputProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, "size"> {
    /**
     * Additional CSS classes to apply to the input
     */
    className?: string;
    /**
     * The size of the input
     * @default 'md'
     */
    size?: "sm" | "md" | "lg";
    /**
     * Whether the input should take the full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The type of input
     * @default 'text'
     */
    type?:
        | "text"
        | "email"
        | "password"
        | "number"
        | "tel"
        | "url"
        | "search"
        | "date"
        | "datetime-local"
        | "month"
        | "time"
        | "week";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, size = "md", fullWidth = false, type = "text", ...props }, ref) => {
        const baseStyles = [
            "rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm",
            "bg-gradient-to-b from-white to-neutral-50/30 dark:from-neutral-900 dark:to-neutral-800/30",
            "text-neutral-900 dark:text-neutral-100",
            "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
            "transition-all duration-200 ease-out",
            "focus:border-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-neutral-400/30 focus:shadow-lg backdrop-blur-sm",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50 dark:disabled:bg-neutral-800",
            "data-[invalid]:border-red-400/60 data-[invalid]:focus:border-red-500 data-[invalid]:focus:ring-red-400/30",
            "data-[valid]:border-emerald-400/60 data-[valid]:focus:border-emerald-500 data-[valid]:focus:ring-emerald-400/30",
            "data-[dirty]:border-neutral-300 dark:data-[dirty]:border-neutral-600",
            "data-[filled]:border-neutral-300 dark:data-[filled]:border-neutral-600",
            "hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md",
            "data-[invalid]:hover:border-red-400",
            "data-[valid]:hover:border-emerald-400",
        ];

        const sizeStyles = {
            sm: "h-8 px-2 text-sm",
            md: "h-10 px-3",
            lg: "h-12 px-4 text-lg",
        };

        const widthStyles = fullWidth ? "w-full" : "";

        return (
            <BaseInput
                ref={ref}
                type={type}
                className={twMerge(baseStyles, sizeStyles[size], widthStyles, className)}
                {...props}
            />
        );
    },
);

Input.displayName = "Input";
