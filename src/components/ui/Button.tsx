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
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", fullWidth = false, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm tracking-tight";

        const variantStyles = {
            primary:
                "bg-gradient-to-b from-neutral-900 to-neutral-800 text-white hover:from-neutral-800 hover:to-neutral-700 focus-visible:ring-neutral-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0",
            secondary:
                "bg-gradient-to-b from-neutral-100 to-neutral-200/80 dark:from-neutral-800 dark:to-neutral-700 text-neutral-900 dark:text-neutral-100 hover:from-neutral-200 hover:to-neutral-300/80 dark:hover:from-neutral-700 dark:hover:to-neutral-600 focus-visible:ring-neutral-500 border border-neutral-200/60 dark:border-neutral-600/60",
            danger: "bg-gradient-to-b from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 focus-visible:ring-red-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0",
            ghost: "text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-600 focus-visible:ring-neutral-500 backdrop-blur-sm",
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
