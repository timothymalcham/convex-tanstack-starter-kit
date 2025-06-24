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
            "inline-flex items-center justify-center font-medium transition-colors rounded-sm select-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 disabled:pointer-events-none disabled:opacity-50";

        const variantStyles = {
            default:
                "text-gray-600 hover:bg-gray-100 active:bg-gray-200 data-[pressed]:text-gray-900 data-[pressed]:bg-gray-100",
            outline:
                "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:bg-gray-100 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900",
        };

        const sizeStyles = {
            sm: "size-6 text-xs",
            md: "size-8 text-sm",
            lg: "size-10 text-base",
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
