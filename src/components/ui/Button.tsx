/**
 * Button Component
 *
 * A clickable button element with multiple variants and sizes. Built with standard HTML button.
 *
 * @example
 * // Basic button
 * <Button>Click me</Button>
 *
 * // Different variants
 * <Button variant="primary">Primary Action</Button>
 * <Button variant="secondary">Secondary Action</Button>
 * <Button variant="danger">Delete</Button>
 * <Button variant="ghost">Subtle Action</Button>
 *
 * // Different sizes
 * <Button size="sm">Small</Button>
 * <Button size="md">Medium</Button>
 * <Button size="lg">Large</Button>
 *
 * // Full width
 * <Button fullWidth>Full Width Button</Button>
 *
 * // With icons
 * <Button>
 *   <PlusIcon className="w-4 h-4 mr-2" />
 *   Add Item
 * </Button>
 *
 * // Disabled state
 * <Button disabled>Disabled</Button>
 *
 * // As form submit
 * <Button type="submit">Submit Form</Button>
 *
 * @usage
 * - Primary actions (save, submit, confirm)
 * - Secondary actions (cancel, reset)
 * - Destructive actions (delete, remove)
 * - Navigation triggers
 * - Form submissions
 * - Modal triggers
 *
 * @best-practices
 * - Use primary for main actions (max 1 per section)
 * - Use secondary for alternative actions
 * - Use danger for destructive actions with confirmation
 * - Use ghost for subtle actions in compact spaces
 * - Keep button text concise and action-oriented
 * - Provide loading states for async actions
 * - Use consistent sizing within button groups
 * - Ensure sufficient touch targets (44px minimum)
 */

import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost" | "shimmer" | "glow";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", fullWidth = false, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-tight relative overflow-hidden";

        const variantStyles = {
            primary:
                "bg-white dark:bg-neutral-200 text-neutral-900 dark:text-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-100 focus-visible:ring-neutral-400/30 active:scale-[0.98]",
            secondary:
                "bg-neutral-50 dark:bg-neutral-300 text-neutral-900 dark:text-neutral-900 hover:bg-white dark:hover:bg-neutral-200 focus-visible:ring-neutral-400/30 active:scale-[0.98]",
            danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-400/30 active:scale-[0.98]",
            ghost: "text-neutral-700 dark:text-neutral-300 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:ring-neutral-400/30 active:scale-[0.98]",
            shimmer:
                "bg-white dark:bg-neutral-200 text-neutral-900 dark:text-neutral-900 focus-visible:ring-neutral-400/30 active:scale-[0.98] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-neutral-100/50 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-out",
            glow: "bg-white dark:bg-neutral-200 text-neutral-900 dark:text-neutral-900 focus-visible:ring-neutral-400/30 active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] dark:shadow-[0_0_20px_rgba(147,51,234,0.5)] dark:hover:shadow-[0_0_30px_rgba(147,51,234,0.7)]",
        };

        const sizeStyles = {
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4",
            lg: "h-12 px-6 text-lg",
        };

        const widthStyles = fullWidth ? "w-full" : "";

        return (
            <button
                ref={ref}
                className={twMerge(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)}
                {...props}
            />
        );
    },
);

Button.displayName = "Button";
