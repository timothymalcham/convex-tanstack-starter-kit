/**
 * Separator Component
 *
 * A visual divider that separates content sections. Built with Base UI Separator.
 *
 * @example
 * // Horizontal separator (default)
 * <Separator />
 *
 * // Vertical separator
 * <Separator orientation="vertical" className="h-6" />
 *
 * // In a navigation menu
 * <div className="flex items-center gap-4">
 *   <a href="/home">Home</a>
 *   <a href="/about">About</a>
 *   <Separator orientation="vertical" className="h-4" />
 *   <a href="/login">Login</a>
 * </div>
 *
 * @usage
 * - Use to visually separate content sections
 * - In navigation menus to group related items
 * - In lists to create logical divisions
 * - In forms to separate field groups
 *
 * @best-practices
 * - Use sparingly to avoid visual clutter
 * - Ensure sufficient contrast with background
 * - Consider using spacing instead of separators when possible
 * - Use vertical separators only when horizontal space is limited
 */

import { Separator as BaseSeparator } from "@base-ui-components/react/separator";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof BaseSeparator> {
    orientation?: "horizontal" | "vertical";
    className?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    ({ orientation = "horizontal", className, ...props }, ref) => {
        const defaultStyles = orientation === "horizontal" ? "h-px w-full bg-gray-300" : "w-px h-full bg-gray-300";

        return (
            <BaseSeparator
                ref={ref}
                orientation={orientation}
                className={twMerge(defaultStyles, className)}
                {...props}
            />
        );
    },
);

Separator.displayName = "Separator";
