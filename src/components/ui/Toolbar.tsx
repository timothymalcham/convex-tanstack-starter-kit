/**
 * Toolbar Component
 *
 * A container for grouping related controls and actions. Built with Base UI Toolbar.
 *
 * @example
 * // Basic toolbar
 * <Toolbar.Root>
 *   <Toolbar.Button>Save</Toolbar.Button>
 *   <Toolbar.Button variant="ghost">Cancel</Toolbar.Button>
 *   <Toolbar.Separator />
 *   <Toolbar.Button>Delete</Toolbar.Button>
 * </Toolbar.Root>
 *
 * // With toggle groups
 * <Toolbar.Root>
 *   <ToggleGroup defaultValue="left">
 *     <Toolbar.Button render={<Toggle />} value="left">
 *       Align Left
 *     </Toolbar.Button>
 *     <Toolbar.Button render={<Toggle />} value="center">
 *       Align Center
 *     </Toolbar.Button>
 *   </ToggleGroup>
 *   <Toolbar.Separator />
 *   <Toolbar.Group>
 *     <Toolbar.Button size="sm">$</Toolbar.Button>
 *     <Toolbar.Button size="sm">%</Toolbar.Button>
 *   </Toolbar.Group>
 * </Toolbar.Root>
 *
 * // With additional elements
 * <Toolbar.Root>
 *   <Toolbar.Button>Bold</Toolbar.Button>
 *   <Toolbar.Button>Italic</Toolbar.Button>
 *   <Toolbar.Separator />
 *   <Select.Root>
 *     <Toolbar.Button render={<Select.Trigger />}>
 *       <Select.Value placeholder="Font" />
 *     </Toolbar.Button>
 *   </Select.Root>
 *   <Toolbar.Link href="#" className="ml-auto">
 *     Last saved 2m ago
 *   </Toolbar.Link>
 * </Toolbar.Root>
 *
 * @usage
 * - Text editors (formatting controls)
 * - Image editors (tool palettes)
 * - Data tables (actions bar)
 * - Form headers (save/cancel)
 * - Media players (playback controls)
 * - Drawing applications
 *
 * @best-practices
 * - Group related actions together
 * - Use separators to create logical sections
 * - Place primary actions on the left
 * - Place secondary/meta info on the right
 * - Keep toolbars focused and not overwhelming
 * - Use consistent button sizes within groups
 * - Provide keyboard navigation
 * - Consider responsive behavior for mobile
 */

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ToolbarRootProps extends React.ComponentPropsWithoutRef<typeof BaseToolbar.Root> {
    className?: string;
}

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof BaseToolbar.Button> {
    className?: string;
    variant?: "default" | "ghost";
    size?: "sm" | "md" | "lg";
}

interface ToolbarGroupProps extends React.ComponentPropsWithoutRef<typeof BaseToolbar.Group> {
    className?: string;
}

interface ToolbarSeparatorProps extends React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator> {
    className?: string;
}

interface ToolbarLinkProps extends React.ComponentPropsWithoutRef<typeof BaseToolbar.Link> {
    className?: string;
}

export const ToolbarRoot = React.forwardRef<React.ElementRef<typeof BaseToolbar.Root>, ToolbarRootProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseToolbar.Root
                ref={ref}
                className={twMerge(
                    "flex items-center gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5",
                    className,
                )}
                {...props}
            />
        );
    },
);

export const ToolbarButton = React.forwardRef<React.ElementRef<typeof BaseToolbar.Button>, ToolbarButtonProps>(
    ({ className, variant = "default", size = "md", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium text-gray-600 transition-colors rounded-sm select-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 disabled:pointer-events-none disabled:opacity-50";

        const variantStyles = {
            default: "hover:bg-gray-100 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900",
            ghost: "hover:bg-gray-100 hover:text-gray-900",
        };

        const sizeStyles = {
            sm: "h-6 px-2 text-xs",
            md: "h-8 px-3 text-sm",
            lg: "h-10 px-4 text-base",
        };

        return (
            <BaseToolbar.Button
                ref={ref}
                className={twMerge(baseStyles, variantStyles[variant], sizeStyles[size], className)}
                {...props}
            />
        );
    },
);

export const ToolbarGroup = React.forwardRef<React.ElementRef<typeof BaseToolbar.Group>, ToolbarGroupProps>(
    ({ className, ...props }, ref) => {
        return <BaseToolbar.Group ref={ref} className={twMerge("flex gap-1", className)} {...props} />;
    },
);

export const ToolbarSeparator = React.forwardRef<React.ElementRef<typeof BaseToolbar.Separator>, ToolbarSeparatorProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseToolbar.Separator ref={ref} className={twMerge("m-1 h-4 w-px bg-gray-300", className)} {...props} />
        );
    },
);

export const ToolbarLink = React.forwardRef<React.ElementRef<typeof BaseToolbar.Link>, ToolbarLinkProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseToolbar.Link
                ref={ref}
                className={twMerge(
                    "flex-none self-center text-sm text-gray-500 no-underline hover:text-blue-800 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-800",
                    className,
                )}
                {...props}
            />
        );
    },
);

ToolbarRoot.displayName = "ToolbarRoot";
ToolbarButton.displayName = "ToolbarButton";
ToolbarGroup.displayName = "ToolbarGroup";
ToolbarSeparator.displayName = "ToolbarSeparator";
ToolbarLink.displayName = "ToolbarLink";

// Compound component pattern for easier usage
export const Toolbar = {
    Root: ToolbarRoot,
    Button: ToolbarButton,
    Group: ToolbarGroup,
    Separator: ToolbarSeparator,
    Link: ToolbarLink,
};
