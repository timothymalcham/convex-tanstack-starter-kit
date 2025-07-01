/**
 * Toggle Component
 *
 * A button that can be toggled between pressed and unpressed states. Built with Base UI Toggle.
 *
 * @example
 * // Basic toggle
 * <Toggle aria-label="Bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * // Controlled toggle
 * const [bold, setBold] = useState(false);
 * <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * // Different variants and sizes
 * <Toggle variant="outline" size="lg">
 *   <ItalicIcon />
 * </Toggle>
 *
 * // With text
 * <Toggle>
 *   <BoldIcon />
 *   Bold
 * </Toggle>
 *
 * // Custom render prop
 * <Toggle
 *   render={(props, state) => (
 *     <button {...props}>
 *       {state.pressed ? <HeartFilledIcon /> : <HeartOutlineIcon />}
 *     </button>
 *   )}
 * />
 *
 * @usage
 * - Text formatting controls (bold, italic, underline)
 * - Favorite/bookmark buttons
 * - Visibility toggles
 * - Filter activation
 * - Tool selection in editors
 * - Single-choice options that can be deselected
 *
 * @best-practices
 * - Always provide aria-label for icon-only toggles
 * - Use consistent visual states across your app
 * - Consider grouping related toggles with ToggleGroup
 * - Provide clear visual feedback for pressed state
 * - Use appropriate icons that clearly show state
 * - Avoid for destructive actions
 */

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ToggleProps extends React.ComponentPropsWithoutRef<typeof BaseToggle> {
    className?: string;
    variant?: "default" | "outline";
    size?: "sm" | "md" | "lg";
}

export const Toggle = React.forwardRef<React.ElementRef<typeof BaseToggle>, ToggleProps>(
    ({ className, variant = "default", size = "md", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md select-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 disabled:pointer-events-none disabled:opacity-50 shadow-sm";

        const variantStyles = {
            default:
                "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 data-[pressed]:bg-blue-600 data-[pressed]:text-white data-[pressed]:border-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:data-[pressed]:bg-blue-500",
            outline:
                "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 data-[pressed]:bg-gray-900 data-[pressed]:text-white data-[pressed]:border-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:data-[pressed]:bg-gray-100 dark:data-[pressed]:text-gray-900",
        };

        const sizeStyles = {
            sm: "h-8 px-3 text-xs min-w-8",
            md: "h-10 px-4 text-sm min-w-10",
            lg: "h-12 px-6 text-base min-w-12",
        };

        return (
            <BaseToggle
                ref={ref}
                className={twMerge(baseStyles, variantStyles[variant], sizeStyles[size], className)}
                {...props}
            />
        );
    },
);

Toggle.displayName = "Toggle";
