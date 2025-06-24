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
            "inline-flex items-center justify-center font-medium transition-colors rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variantStyles = {
            primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
            secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
            danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
            ghost: "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
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
