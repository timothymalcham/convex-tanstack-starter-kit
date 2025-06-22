import * as React from "react";
import { Menubar as BaseMenubar } from "@base-ui-components/react/menubar";
import { twMerge } from "tailwind-merge";

/**
 * MenuBar Component
 *
 * A horizontal menu bar providing commands and options for your application,
 * similar to desktop application menu bars (File, Edit, View, etc.).
 *
 * @example
 * ```jsx
 * import { MenuBar } from '@/components/ui/MenuBar'
 *
 * // Basic application menu bar
 * <MenuBar.Root>
 *   <MenuBar.Menu>
 *     <MenuBar.MenuTrigger>File</MenuBar.MenuTrigger>
 *     <MenuBarMenuContent>
 *       <MenuBar.Item>New File</MenuBar.Item>
 *       <MenuBar.Item>Open...</MenuBar.Item>
 *       <MenuBar.Item>Save</MenuBar.Item>
 *       <MenuBar.Separator />
 *       <MenuBar.Item>Exit</MenuBar.Item>
 *     </MenuBarMenuContent>
 *   </MenuBar.Menu>
 *
 *   <MenuBar.Menu>
 *     <MenuBar.MenuTrigger>Edit</MenuBar.MenuTrigger>
 *     <MenuBarMenuContent>
 *       <MenuBar.Item>Undo</MenuBar.Item>
 *       <MenuBar.Item>Redo</MenuBar.Item>
 *       <MenuBar.Separator />
 *       <MenuBar.Item>Cut</MenuBar.Item>
 *       <MenuBar.Item>Copy</MenuBar.Item>
 *       <MenuBar.Item>Paste</MenuBar.Item>
 *     </MenuBarMenuContent>
 *   </MenuBar.Menu>
 *
 *   <MenuBar.Menu>
 *     <MenuBar.MenuTrigger>View</MenuBar.MenuTrigger>
 *     <MenuBarMenuContent>
 *       <MenuBar.CheckboxItem checked>
 *         <MenuBar.ItemIndicator>✓</MenuBar.ItemIndicator>
 *         Show Sidebar
 *       </MenuBar.CheckboxItem>
 *       <MenuBar.CheckboxItem>
 *         <MenuBar.ItemIndicator>✓</MenuBar.ItemIndicator>
 *         Show Status Bar
 *       </MenuBar.CheckboxItem>
 *       <MenuBar.Separator />
 *       <MenuBar.RadioGroup value="dark">
 *         <MenuBar.RadioItem value="light">
 *           <MenuBar.ItemIndicator>●</MenuBar.ItemIndicator>
 *           Light Theme
 *         </MenuBar.RadioItem>
 *         <MenuBar.RadioItem value="dark">
 *           <MenuBar.ItemIndicator>●</MenuBar.ItemIndicator>
 *           Dark Theme
 *         </MenuBar.RadioItem>
 *         <MenuBar.RadioItem value="system">
 *           <MenuBar.ItemIndicator>●</MenuBar.ItemIndicator>
 *           System Theme
 *         </MenuBar.RadioItem>
 *       </MenuBar.RadioGroup>
 *     </MenuBarMenuContent>
 *   </MenuBar.Menu>
 * </MenuBar.Root>
 *
 * // With keyboard shortcuts displayed
 * <MenuBar.Root>
 *   <MenuBar.Menu>
 *     <MenuBar.MenuTrigger>File</MenuBar.MenuTrigger>
 *     <MenuBarMenuContent>
 *       <MenuBar.Item>
 *         <span>New File</span>
 *         <span className="ml-auto text-xs text-gray-400">Ctrl+N</span>
 *       </MenuBar.Item>
 *       <MenuBar.Item>
 *         <span>Open...</span>
 *         <span className="ml-auto text-xs text-gray-400">Ctrl+O</span>
 *       </MenuBar.Item>
 *       <MenuBar.Item>
 *         <span>Save</span>
 *         <span className="ml-auto text-xs text-gray-400">Ctrl+S</span>
 *       </MenuBar.Item>
 *     </MenuBarMenuContent>
 *   </MenuBar.Menu>
 * </MenuBar.Root>
 *
 * // Disabled menu example
 * <MenuBar.Root disabled>
 *   <MenuBar.Menu>
 *     <MenuBar.MenuTrigger>File</MenuBar.MenuTrigger>
 *     <MenuBarMenuContent>
 *       <MenuBar.Item>New File</MenuBar.Item>
 *     </MenuBarMenuContent>
 *   </MenuBar.Menu>
 * </MenuBar.Root>
 *
 * // Custom styled menu bar
 * <MenuBar.Root className="bg-gray-800 text-white">
 *   <MenuBar.Menu>
 *     <MenuBar.MenuTrigger className="text-white hover:bg-gray-700">
 *       Tools
 *     </MenuBar.MenuTrigger>
 *     <MenuBarMenuContent>
 *       <MenuBar.Group>
 *         <MenuBar.GroupLabel>Development</MenuBar.GroupLabel>
 *         <MenuBar.Item>Terminal</MenuBar.Item>
 *         <MenuBar.Item>Developer Tools</MenuBar.Item>
 *       </MenuBar.Group>
 *       <MenuBar.Separator />
 *       <MenuBar.Group>
 *         <MenuBar.GroupLabel>Design</MenuBar.GroupLabel>
 *         <MenuBar.Item>Color Picker</MenuBar.Item>
 *         <MenuBar.Item>Ruler</MenuBar.Item>
 *       </MenuBar.Group>
 *     </MenuBarMenuContent>
 *   </MenuBar.Menu>
 * </MenuBar.Root>
 *
 * // With icons and complex items
 * <MenuBar.Root>
 *   <MenuBar.Menu>
 *     <MenuBar.MenuTrigger>
 *       <span className="flex items-center gap-1">
 *         📁 Project
 *       </span>
 *     </MenuBar.MenuTrigger>
 *     <MenuBarMenuContent>
 *       <MenuBar.Item>
 *         <span className="flex items-center gap-2">
 *           <span>📄</span>
 *           <span>New Project</span>
 *         </span>
 *       </MenuBar.Item>
 *       <MenuBar.Item>
 *         <span className="flex items-center gap-2">
 *           <span>📂</span>
 *           <span>Open Project</span>
 *         </span>
 *       </MenuBar.Item>
 *       <MenuBar.Item disabled>
 *         <span className="flex items-center gap-2">
 *           <span>💾</span>
 *           <span>Save Project</span>
 *         </span>
 *       </MenuBar.Item>
 *     </MenuBarMenuContent>
 *   </MenuBar.Menu>
 * </MenuBar.Root>
 * ```
 */

interface MenuBarRootProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Root> {
    className?: string;
}

const MenuBarRoot = React.forwardRef<HTMLDivElement, MenuBarRootProps>(({ className, ...props }, ref) => {
    return (
        <BaseMenubar.Root
            ref={ref}
            className={twMerge(
                "flex h-10 items-center space-x-1 rounded-md border bg-white p-1",
                "dark:border-gray-800 dark:bg-gray-950",
                "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
                className,
            )}
            {...props}
        />
    );
});
MenuBarRoot.displayName = "MenuBar.Root";

interface MenuBarMenuProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu> {
    className?: string;
}

const MenuBarMenu = React.forwardRef<HTMLDivElement, MenuBarMenuProps>(({ className, ...props }, ref) => {
    return <BaseMenubar.Menu ref={ref} className={className} {...props} />;
});
MenuBarMenu.displayName = "MenuBar.Menu";

interface MenuBarMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.Trigger> {
    className?: string;
}

const MenuBarMenuTrigger = React.forwardRef<HTMLButtonElement, MenuBarMenuTriggerProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseMenubar.Menu.Trigger
                ref={ref}
                className={twMerge(
                    "flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium",
                    "outline-hidden transition-colors duration-100",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "focus:bg-gray-100 dark:focus:bg-gray-800",
                    "data-[open]:bg-gray-100 dark:data-[open]:bg-gray-800",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className,
                )}
                {...props}
            />
        );
    },
);
MenuBarMenuTrigger.displayName = "MenuBar.MenuTrigger";

interface MenuBarPortalProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.Portal> {}

const MenuBarPortal = BaseMenubar.Menu.Portal;
MenuBarPortal.displayName = "MenuBar.Portal";

interface MenuBarPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.Positioner> {
    className?: string;
}

const MenuBarPositioner = React.forwardRef<HTMLDivElement, MenuBarPositionerProps>(({ className, ...props }, ref) => {
    return <BaseMenubar.Menu.Positioner ref={ref} className={twMerge("z-50", className)} {...props} />;
});
MenuBarPositioner.displayName = "MenuBar.Positioner";

interface MenuBarPopupProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.Popup> {
    className?: string;
}

const MenuBarPopup = React.forwardRef<HTMLDivElement, MenuBarPopupProps>(({ className, ...props }, ref) => {
    return (
        <BaseMenubar.Menu.Popup
            ref={ref}
            className={twMerge(
                "min-w-48 overflow-hidden rounded-md border bg-white p-1 shadow-lg",
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
MenuBarPopup.displayName = "MenuBar.Popup";

interface MenuBarItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.Item> {
    className?: string;
}

const MenuBarItem = React.forwardRef<HTMLDivElement, MenuBarItemProps>(({ className, ...props }, ref) => {
    return (
        <BaseMenubar.Menu.Item
            ref={ref}
            className={twMerge(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm",
                "outline-hidden transition-colors duration-100",
                "hover:bg-gray-100 hover:text-gray-900",
                "dark:hover:bg-gray-800 dark:hover:text-gray-50",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className,
            )}
            {...props}
        />
    );
});
MenuBarItem.displayName = "MenuBar.Item";

interface MenuBarSeparatorProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.Separator> {
    className?: string;
}

const MenuBarSeparator = React.forwardRef<HTMLDivElement, MenuBarSeparatorProps>(({ className, ...props }, ref) => {
    return (
        <BaseMenubar.Menu.Separator
            ref={ref}
            className={twMerge("-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800", className)}
            {...props}
        />
    );
});
MenuBarSeparator.displayName = "MenuBar.Separator";

interface MenuBarGroupProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.Group> {
    className?: string;
}

const MenuBarGroup = React.forwardRef<HTMLDivElement, MenuBarGroupProps>(({ className, ...props }, ref) => {
    return <BaseMenubar.Menu.Group ref={ref} className={className} {...props} />;
});
MenuBarGroup.displayName = "MenuBar.Group";

interface MenuBarGroupLabelProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.GroupLabel> {
    className?: string;
}

const MenuBarGroupLabel = React.forwardRef<HTMLDivElement, MenuBarGroupLabelProps>(({ className, ...props }, ref) => {
    return (
        <BaseMenubar.Menu.GroupLabel
            ref={ref}
            className={twMerge("px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400", className)}
            {...props}
        />
    );
});
MenuBarGroupLabel.displayName = "MenuBar.GroupLabel";

interface MenuBarCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.CheckboxItem> {
    className?: string;
}

const MenuBarCheckboxItem = React.forwardRef<HTMLDivElement, MenuBarCheckboxItemProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseMenubar.Menu.CheckboxItem
                ref={ref}
                className={twMerge(
                    "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
                    "outline-hidden transition-colors duration-100",
                    "hover:bg-gray-100 hover:text-gray-900",
                    "dark:hover:bg-gray-800 dark:hover:text-gray-50",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className,
                )}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">{children}</span>
            </BaseMenubar.Menu.CheckboxItem>
        );
    },
);
MenuBarCheckboxItem.displayName = "MenuBar.CheckboxItem";

interface MenuBarRadioGroupProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.RadioGroup> {
    className?: string;
}

const MenuBarRadioGroup = React.forwardRef<HTMLDivElement, MenuBarRadioGroupProps>(({ className, ...props }, ref) => {
    return <BaseMenubar.Menu.RadioGroup ref={ref} className={className} {...props} />;
});
MenuBarRadioGroup.displayName = "MenuBar.RadioGroup";

interface MenuBarRadioItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.RadioItem> {
    className?: string;
}

const MenuBarRadioItem = React.forwardRef<HTMLDivElement, MenuBarRadioItemProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseMenubar.Menu.RadioItem
                ref={ref}
                className={twMerge(
                    "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
                    "outline-hidden transition-colors duration-100",
                    "hover:bg-gray-100 hover:text-gray-900",
                    "dark:hover:bg-gray-800 dark:hover:text-gray-50",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className,
                )}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">{children}</span>
            </BaseMenubar.Menu.RadioItem>
        );
    },
);
MenuBarRadioItem.displayName = "MenuBar.RadioItem";

interface MenuBarItemIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseMenubar.Menu.ItemIndicator> {
    className?: string;
}

const MenuBarItemIndicator = React.forwardRef<HTMLSpanElement, MenuBarItemIndicatorProps>(
    ({ className, ...props }, ref) => {
        return <BaseMenubar.Menu.ItemIndicator ref={ref} className={twMerge("text-current", className)} {...props} />;
    },
);
MenuBarItemIndicator.displayName = "MenuBar.ItemIndicator";

// Compound component for better DX
interface MenuBarMenuContentProps {
    children: React.ReactNode;
    className?: string;
}

export const MenuBarMenuContent = React.forwardRef<HTMLDivElement, MenuBarMenuContentProps>(
    ({ children, className }, ref) => {
        return (
            <MenuBarPortal>
                <MenuBarPositioner>
                    <MenuBarPopup ref={ref} className={className}>
                        {children}
                    </MenuBarPopup>
                </MenuBarPositioner>
            </MenuBarPortal>
        );
    },
);
MenuBarMenuContent.displayName = "MenuBarMenuContent";

export const MenuBar = {
    Root: MenuBarRoot,
    Menu: MenuBarMenu,
    MenuTrigger: MenuBarMenuTrigger,
    Portal: MenuBarPortal,
    Positioner: MenuBarPositioner,
    Popup: MenuBarPopup,
    Item: MenuBarItem,
    Separator: MenuBarSeparator,
    Group: MenuBarGroup,
    GroupLabel: MenuBarGroupLabel,
    CheckboxItem: MenuBarCheckboxItem,
    RadioGroup: MenuBarRadioGroup,
    RadioItem: MenuBarRadioItem,
    ItemIndicator: MenuBarItemIndicator,
};
