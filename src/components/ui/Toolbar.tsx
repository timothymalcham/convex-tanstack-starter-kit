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
