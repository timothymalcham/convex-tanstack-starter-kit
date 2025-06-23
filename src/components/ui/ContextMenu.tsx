import { ContextMenu as BaseContextMenu } from "@base-ui-components/react/context-menu";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * ContextMenu Component
 *
 * A menu that appears at the pointer on right click or long press, providing contextual actions.
 *
 * @example
 * ```jsx
 * import { ContextMenu } from '@/components/ui/ContextMenu'
 *
 * // Basic context menu
 * <ContextMenu.Root>
 *   <ContextMenu.Trigger asChild>
 *     <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
 *       Right click me
 *     </div>
 *   </ContextMenu.Trigger>
 *   <ContextMenuContent>
 *     <ContextMenu.Item>Edit</ContextMenu.Item>
 *     <ContextMenu.Item>Copy</ContextMenu.Item>
 *     <ContextMenu.Item>Delete</ContextMenu.Item>
 *   </ContextMenuContent>
 * </ContextMenu.Root>
 *
 * // With separators and groups
 * <ContextMenu.Root>
 *   <ContextMenu.Trigger asChild>
 *     <img src="/image.jpg" alt="Photo" className="w-48 h-32 object-cover rounded" />
 *   </ContextMenu.Trigger>
 *   <ContextMenuContent>
 *     <ContextMenu.Item>View Full Size</ContextMenu.Item>
 *     <ContextMenu.Item>Download</ContextMenu.Item>
 *     <ContextMenu.Separator />
 *     <ContextMenu.Group>
 *       <ContextMenu.GroupLabel>Actions</ContextMenu.GroupLabel>
 *       <ContextMenu.Item>Edit</ContextMenu.Item>
 *       <ContextMenu.Item>Duplicate</ContextMenu.Item>
 *       <ContextMenu.Item disabled>Share</ContextMenu.Item>
 *     </ContextMenu.Group>
 *     <ContextMenu.Separator />
 *     <ContextMenu.Item className="text-red-600">Delete</ContextMenu.Item>
 *   </ContextMenuContent>
 * </ContextMenu.Root>
 *
 * // With checkbox items
 * <ContextMenu.Root>
 *   <ContextMenu.Trigger asChild>
 *     <div className="p-4 border rounded">Text editor area</div>
 *   </ContextMenu.Trigger>
 *   <ContextMenuContent>
 *     <ContextMenu.CheckboxItem checked>
 *       <ContextMenu.ItemIndicator>✓</ContextMenu.ItemIndicator>
 *       Show line numbers
 *     </ContextMenu.CheckboxItem>
 *     <ContextMenu.CheckboxItem>
 *       <ContextMenu.ItemIndicator>✓</ContextMenu.ItemIndicator>
 *       Word wrap
 *     </ContextMenu.CheckboxItem>
 *     <ContextMenu.Separator />
 *     <ContextMenu.Item>Find and Replace</ContextMenu.Item>
 *   </ContextMenuContent>
 * </ContextMenu.Root>
 *
 * // With radio group
 * <ContextMenu.Root>
 *   <ContextMenu.Trigger asChild>
 *     <div className="p-4 border rounded">Theme selector</div>
 *   </ContextMenu.Trigger>
 *   <ContextMenuContent>
 *     <ContextMenu.RadioGroup value="light">
 *       <ContextMenu.RadioItem value="light">
 *         <ContextMenu.ItemIndicator>●</ContextMenu.ItemIndicator>
 *         Light theme
 *       </ContextMenu.RadioItem>
 *       <ContextMenu.RadioItem value="dark">
 *         <ContextMenu.ItemIndicator>●</ContextMenu.ItemIndicator>
 *         Dark theme
 *       </ContextMenu.RadioItem>
 *       <ContextMenu.RadioItem value="system">
 *         <ContextMenu.ItemIndicator>●</ContextMenu.ItemIndicator>
 *         System theme
 *       </ContextMenu.RadioItem>
 *     </ContextMenu.RadioGroup>
 *   </ContextMenuContent>
 * </ContextMenu.Root>
 * ```
 */

interface ContextMenuRootProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Root> {}

const ContextMenuRoot = BaseContextMenu.Root;

interface ContextMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger> {
    asChild?: boolean;
}

const ContextMenuTrigger = BaseContextMenu.Trigger;

interface ContextMenuPortalProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Portal> {}

const ContextMenuPortal = BaseContextMenu.Portal;

interface ContextMenuPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Positioner> {
    className?: string;
}

const ContextMenuPositioner = React.forwardRef<HTMLDivElement, ContextMenuPositionerProps>(
    ({ className, ...props }, ref) => {
        return <BaseContextMenu.Positioner ref={ref} className={twMerge("z-50", className)} {...props} />;
    },
);
ContextMenuPositioner.displayName = "ContextMenu.Positioner";

interface ContextMenuPopupProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup> {
    className?: string;
}

const ContextMenuPopup = React.forwardRef<HTMLDivElement, ContextMenuPopupProps>(({ className, ...props }, ref) => {
    return (
        <BaseContextMenu.Popup
            ref={ref}
            className={twMerge(
                "min-w-32 overflow-hidden rounded-md border bg-white p-1 shadow-lg",
                "dark:border-gray-800 dark:bg-gray-950",
                "data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95",
                "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95",
                "data-[starting-style]:duration-100 data-[ending-style]:duration-75",
                className,
            )}
            {...props}
        />
    );
});
ContextMenuPopup.displayName = "ContextMenu.Popup";

interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item> {
    className?: string;
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(({ className, ...props }, ref) => {
    return (
        <BaseContextMenu.Item
            ref={ref}
            className={twMerge(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden",
                "transition-colors duration-100",
                "focus:bg-gray-100 focus:text-gray-900",
                "dark:focus:bg-gray-800 dark:focus:text-gray-50",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className,
            )}
            {...props}
        />
    );
});
ContextMenuItem.displayName = "ContextMenu.Item";

interface ContextMenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator> {
    className?: string;
}

const ContextMenuSeparator = React.forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseContextMenu.Separator
                ref={ref}
                className={twMerge("-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800", className)}
                {...props}
            />
        );
    },
);
ContextMenuSeparator.displayName = "ContextMenu.Separator";

interface ContextMenuGroupProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.Group> {
    className?: string;
}

const ContextMenuGroup = React.forwardRef<HTMLDivElement, ContextMenuGroupProps>(({ className, ...props }, ref) => {
    return <BaseContextMenu.Group ref={ref} className={className} {...props} />;
});
ContextMenuGroup.displayName = "ContextMenu.Group";

interface ContextMenuGroupLabelProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel> {
    className?: string;
}

const ContextMenuGroupLabel = React.forwardRef<HTMLDivElement, ContextMenuGroupLabelProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseContextMenu.GroupLabel
                ref={ref}
                className={twMerge("px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400", className)}
                {...props}
            />
        );
    },
);
ContextMenuGroupLabel.displayName = "ContextMenu.GroupLabel";

interface ContextMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem> {
    className?: string;
}

const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseContextMenu.CheckboxItem
                ref={ref}
                className={twMerge(
                    "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden",
                    "transition-colors duration-100",
                    "focus:bg-gray-100 focus:text-gray-900",
                    "dark:focus:bg-gray-800 dark:focus:text-gray-50",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className,
                )}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">{children}</span>
            </BaseContextMenu.CheckboxItem>
        );
    },
);
ContextMenuCheckboxItem.displayName = "ContextMenu.CheckboxItem";

interface ContextMenuRadioGroupProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioGroup> {
    className?: string;
}

const ContextMenuRadioGroup = React.forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
    ({ className, ...props }, ref) => {
        return <BaseContextMenu.RadioGroup ref={ref} className={className} {...props} />;
    },
);
ContextMenuRadioGroup.displayName = "ContextMenu.RadioGroup";

interface ContextMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem> {
    className?: string;
}

const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseContextMenu.RadioItem
                ref={ref}
                className={twMerge(
                    "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden",
                    "transition-colors duration-100",
                    "focus:bg-gray-100 focus:text-gray-900",
                    "dark:focus:bg-gray-800 dark:focus:text-gray-50",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className,
                )}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">{children}</span>
            </BaseContextMenu.RadioItem>
        );
    },
);
ContextMenuRadioItem.displayName = "ContextMenu.RadioItem";

interface ContextMenuItemIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseContextMenu.ItemIndicator> {
    className?: string;
}

const ContextMenuItemIndicator = React.forwardRef<HTMLSpanElement, ContextMenuItemIndicatorProps>(
    ({ className, ...props }, ref) => {
        return <BaseContextMenu.ItemIndicator ref={ref} className={twMerge("text-current", className)} {...props} />;
    },
);
ContextMenuItemIndicator.displayName = "ContextMenu.ItemIndicator";

// Compound components for better DX
interface ContextMenuContentProps {
    children: React.ReactNode;
    className?: string;
}

export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
    ({ children, className }, ref) => {
        return (
            <ContextMenuPortal>
                <ContextMenuPositioner>
                    <ContextMenuPopup ref={ref} className={className}>
                        {children}
                    </ContextMenuPopup>
                </ContextMenuPositioner>
            </ContextMenuPortal>
        );
    },
);
ContextMenuContent.displayName = "ContextMenuContent";

export const ContextMenu = {
    Root: ContextMenuRoot,
    Trigger: ContextMenuTrigger,
    Portal: ContextMenuPortal,
    Positioner: ContextMenuPositioner,
    Popup: ContextMenuPopup,
    Item: ContextMenuItem,
    Separator: ContextMenuSeparator,
    Group: ContextMenuGroup,
    GroupLabel: ContextMenuGroupLabel,
    CheckboxItem: ContextMenuCheckboxItem,
    RadioGroup: ContextMenuRadioGroup,
    RadioItem: ContextMenuRadioItem,
    ItemIndicator: ContextMenuItemIndicator,
};
