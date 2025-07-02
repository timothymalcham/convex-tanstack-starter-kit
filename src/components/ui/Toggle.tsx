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
            "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md select-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-800 disabled:pointer-events-none disabled:opacity-50 shadow-sm";

        const variantStyles = {
            default:
                "border border-neutral-200/60 bg-gradient-to-b from-white to-neutral-50/30 text-neutral-700 hover:from-neutral-50 hover:to-neutral-100/30 hover:border-neutral-300 hover:shadow-md active:from-neutral-100 active:to-neutral-200/30 data-[pressed]:bg-gradient-to-b data-[pressed]:from-neutral-800 data-[pressed]:to-neutral-900 data-[pressed]:text-white data-[pressed]:border-neutral-800 data-[pressed]:shadow-lg dark:border-neutral-700/60 dark:from-neutral-800 dark:to-neutral-700/30 dark:text-neutral-300 dark:hover:from-neutral-700 dark:hover:to-neutral-600/30 dark:data-[pressed]:from-neutral-600 dark:data-[pressed]:to-neutral-700",
            outline:
                "border border-neutral-200/60 bg-gradient-to-b from-white to-neutral-50/30 text-neutral-700 hover:from-neutral-50 hover:to-neutral-100/30 hover:border-neutral-300 hover:shadow-md active:from-neutral-100 active:to-neutral-200/30 data-[pressed]:bg-gradient-to-b data-[pressed]:from-neutral-900 data-[pressed]:to-neutral-800 data-[pressed]:text-white data-[pressed]:border-neutral-900 data-[pressed]:shadow-lg dark:border-neutral-700/60 dark:from-neutral-800 dark:to-neutral-700/30 dark:text-neutral-300 dark:hover:from-neutral-700 dark:hover:to-neutral-600/30 dark:data-[pressed]:from-neutral-100 dark:data-[pressed]:to-neutral-200 dark:data-[pressed]:text-neutral-900",
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
