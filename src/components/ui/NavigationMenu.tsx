import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * NavigationMenu Component
 *
 * A collection of links and menus for website navigation, perfect for headers,
 * sidebars, and complex navigation structures with dropdowns and mega menus.
 *
 * @example
 * ```jsx
 * import { NavigationMenu, NavigationMenuContent } from '@/components/ui/NavigationMenu'
 *
 * // Basic navigation menu
 * <NavigationMenu.Root>
 *   <NavigationMenu.List>
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
 *     </NavigationMenu.Item>
 *
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Trigger>
 *         Products
 *         <NavigationMenu.Icon />
 *       </NavigationMenu.Trigger>
 *       <NavigationMenuContent>
 *         <div className="grid w-80 gap-3 p-4">
 *           <NavigationMenu.Link href="/products/web-apps">
 *             <div className="font-medium">Web Applications</div>
 *             <div className="text-sm text-gray-500">Build modern web apps</div>
 *           </NavigationMenu.Link>
 *           <NavigationMenu.Link href="/products/mobile-apps">
 *             <div className="font-medium">Mobile Applications</div>
 *             <div className="text-sm text-gray-500">Native mobile development</div>
 *           </NavigationMenu.Link>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenu.Item>
 *
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
 *     </NavigationMenu.Item>
 *   </NavigationMenu.List>
 * </NavigationMenu.Root>
 *
 * // Mega menu with complex content
 * <NavigationMenu.Root>
 *   <NavigationMenu.List>
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Trigger>
 *         Solutions
 *         <NavigationMenu.Icon />
 *       </NavigationMenu.Trigger>
 *       <NavigationMenuContent>
 *         <div className="w-screen max-w-6xl">
 *           <div className="grid grid-cols-3 gap-8 p-8">
 *             <div>
 *               <h3 className="font-semibold mb-4">For Developers</h3>
 *               <div className="space-y-3">
 *                 <NavigationMenu.Link href="/docs">
 *                   <div className="font-medium">Documentation</div>
 *                   <div className="text-sm text-gray-500">API reference and guides</div>
 *                 </NavigationMenu.Link>
 *                 <NavigationMenu.Link href="/tools">
 *                   <div className="font-medium">Developer Tools</div>
 *                   <div className="text-sm text-gray-500">CLI, SDKs, and integrations</div>
 *                 </NavigationMenu.Link>
 *               </div>
 *             </div>
 *
 *             <div>
 *               <h3 className="font-semibold mb-4">For Teams</h3>
 *               <div className="space-y-3">
 *                 <NavigationMenu.Link href="/collaboration">
 *                   <div className="font-medium">Collaboration</div>
 *                   <div className="text-sm text-gray-500">Work together seamlessly</div>
 *                 </NavigationMenu.Link>
 *                 <NavigationMenu.Link href="/analytics">
 *                   <div className="font-medium">Analytics</div>
 *                   <div className="text-sm text-gray-500">Track your progress</div>
 *                 </NavigationMenu.Link>
 *               </div>
 *             </div>
 *
 *             <div>
 *               <h3 className="font-semibold mb-4">Enterprise</h3>
 *               <div className="space-y-3">
 *                 <NavigationMenu.Link href="/security">
 *                   <div className="font-medium">Security</div>
 *                   <div className="text-sm text-gray-500">Enterprise-grade protection</div>
 *                 </NavigationMenu.Link>
 *                 <NavigationMenu.Link href="/support">
 *                   <div className="font-medium">Support</div>
 *                   <div className="text-sm text-gray-500">24/7 dedicated support</div>
 *                 </NavigationMenu.Link>
 *               </div>
 *             </div>
 *           </div>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenu.Item>
 *   </NavigationMenu.List>
 * </NavigationMenu.Root>
 *
 * // Mobile-friendly navigation
 * <NavigationMenu.Root orientation="vertical" className="md:hidden">
 *   <NavigationMenu.List className="flex-col space-y-2">
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Link href="/" className="w-full justify-start">
 *         Home
 *       </NavigationMenu.Link>
 *     </NavigationMenu.Item>
 *
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Trigger className="w-full justify-between">
 *         Products
 *         <NavigationMenu.Icon />
 *       </NavigationMenu.Trigger>
 *       <NavigationMenuContent>
 *         <div className="p-4 space-y-2">
 *           <NavigationMenu.Link href="/products/web">Web Apps</NavigationMenu.Link>
 *           <NavigationMenu.Link href="/products/mobile">Mobile Apps</NavigationMenu.Link>
 *           <NavigationMenu.Link href="/products/desktop">Desktop Apps</NavigationMenu.Link>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenu.Item>
 *   </NavigationMenu.List>
 * </NavigationMenu.Root>
 *
 * // Navigation with icons and badges
 * <NavigationMenu.Root>
 *   <NavigationMenu.List>
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Trigger>
 *         <span className="flex items-center gap-2">
 *           🛍️ Shop
 *           <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">Sale</span>
 *         </span>
 *         <NavigationMenu.Icon />
 *       </NavigationMenu.Trigger>
 *       <NavigationMenuContent>
 *         <div className="grid grid-cols-2 gap-4 p-6 w-96">
 *           <NavigationMenu.Link href="/shop/clothing" className="flex items-center gap-3">
 *             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
 *               👕
 *             </div>
 *             <div>
 *               <div className="font-medium">Clothing</div>
 *               <div className="text-sm text-gray-500">Latest fashion trends</div>
 *             </div>
 *           </NavigationMenu.Link>
 *
 *           <NavigationMenu.Link href="/shop/electronics" className="flex items-center gap-3">
 *             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
 *               📱
 *             </div>
 *             <div>
 *               <div className="font-medium">Electronics</div>
 *               <div className="text-sm text-gray-500">Latest tech gadgets</div>
 *             </div>
 *           </NavigationMenu.Link>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenu.Item>
 *   </NavigationMenu.List>
 * </NavigationMenu.Root>
 *
 * // Sidebar navigation
 * <NavigationMenu.Root orientation="vertical" className="w-64">
 *   <NavigationMenu.List className="flex-col space-y-1">
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Link href="/dashboard" className="w-full justify-start">
 *         📊 Dashboard
 *       </NavigationMenu.Link>
 *     </NavigationMenu.Item>
 *
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Trigger className="w-full justify-between">
 *         👥 Users
 *         <NavigationMenu.Icon />
 *       </NavigationMenu.Trigger>
 *       <NavigationMenuContent>
 *         <div className="p-2 space-y-1">
 *           <NavigationMenu.Link href="/users" className="w-full justify-start text-sm">
 *             All Users
 *           </NavigationMenu.Link>
 *           <NavigationMenu.Link href="/users/roles" className="w-full justify-start text-sm">
 *             Roles & Permissions
 *           </NavigationMenu.Link>
 *           <NavigationMenu.Link href="/users/invites" className="w-full justify-start text-sm">
 *             Pending Invites
 *           </NavigationMenu.Link>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenu.Item>
 *   </NavigationMenu.List>
 * </NavigationMenu.Root>
 * ```
 */

interface NavigationMenuRootProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root> {
    className?: string;
}

const NavigationMenuRoot = React.forwardRef<HTMLElement, NavigationMenuRootProps>(({ className, ...props }, ref) => {
    return (
        <BaseNavigationMenu.Root
            ref={ref}
            className={twMerge("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
            {...props}
        />
    );
});
NavigationMenuRoot.displayName = "NavigationMenu.Root";

interface NavigationMenuListProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.List> {
    className?: string;
}

const NavigationMenuList = React.forwardRef<HTMLDivElement, NavigationMenuListProps>(({ className, ...props }, ref) => {
    return (
        <BaseNavigationMenu.List
            ref={ref}
            className={twMerge("group flex flex-1 list-none items-center justify-center space-x-1", className)}
            {...props}
        />
    );
});
NavigationMenuList.displayName = "NavigationMenu.List";

interface NavigationMenuItemProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Item> {
    className?: string;
}

const NavigationMenuItem = React.forwardRef<HTMLDivElement, NavigationMenuItemProps>(({ className, ...props }, ref) => {
    return <BaseNavigationMenu.Item ref={ref} className={className} {...props} />;
});
NavigationMenuItem.displayName = "NavigationMenu.Item";

interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger> {
    className?: string;
}

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseNavigationMenu.Trigger
                ref={ref}
                className={twMerge(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium",
                    "transition-colors hover:bg-gray-100 hover:text-gray-900",
                    "focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "data-[open]:bg-gray-100/50 dark:bg-gray-950",
                    "dark:hover:bg-gray-800 dark:hover:text-gray-50",
                    "dark:focus:bg-gray-800 dark:focus:text-gray-50",
                    "dark:data-[open]:bg-gray-800/50",
                    className,
                )}
                {...props}
            >
                {children}
            </BaseNavigationMenu.Trigger>
        );
    },
);
NavigationMenuTrigger.displayName = "NavigationMenu.Trigger";

interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link> {
    className?: string;
    href?: string;
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseNavigationMenu.Link
                ref={ref}
                className={twMerge(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline",
                    "outline-hidden transition-colors hover:bg-gray-100 hover:text-gray-900",
                    "focus:bg-gray-100 focus:text-gray-900",
                    "dark:hover:bg-gray-800 dark:hover:text-gray-50",
                    "dark:focus:bg-gray-800 dark:focus:text-gray-50",
                    className,
                )}
                {...props}
            />
        );
    },
);
NavigationMenuLink.displayName = "NavigationMenu.Link";

interface NavigationMenuIconProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Icon> {
    className?: string;
}

const NavigationMenuIcon = React.forwardRef<HTMLDivElement, NavigationMenuIconProps>(({ className, ...props }, ref) => {
    return (
        <BaseNavigationMenu.Icon
            ref={ref}
            className={twMerge(
                "relative top-[1px] ml-1 h-3 w-3 transition duration-200",
                "group-data-[open]:rotate-180",
                className,
            )}
            {...props}
        >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </svg>
        </BaseNavigationMenu.Icon>
    );
});
NavigationMenuIcon.displayName = "NavigationMenu.Icon";

interface NavigationMenuPortalProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Portal> {}

const NavigationMenuPortal = BaseNavigationMenu.Portal;

interface NavigationMenuPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner> {
    className?: string;
}

const NavigationMenuPositioner = React.forwardRef<HTMLDivElement, NavigationMenuPositionerProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseNavigationMenu.Positioner
                ref={ref}
                className={twMerge("absolute left-0 top-0 flex w-full justify-center", className)}
                {...props}
            />
        );
    },
);
NavigationMenuPositioner.displayName = "NavigationMenu.Positioner";

interface NavigationMenuPopupProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Popup> {
    className?: string;
}

const NavigationMenuPopup = React.forwardRef<HTMLDivElement, NavigationMenuPopupProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseNavigationMenu.Popup
                ref={ref}
                className={twMerge(
                    "origin-top-center relative mt-1.5 h-var(--navigation-menu-viewport-height) w-full overflow-hidden",
                    "rounded-md border bg-white text-gray-950 shadow-lg",
                    "data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-90",
                    "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95",
                    "data-[starting-style]:duration-200 data-[ending-style]:duration-150",
                    "dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
                    className,
                )}
                {...props}
            />
        );
    },
);
NavigationMenuPopup.displayName = "NavigationMenu.Popup";

interface NavigationMenuViewportProps extends React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Viewport> {
    className?: string;
}

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className="absolute left-0 top-full flex justify-center">
                <BaseNavigationMenu.Viewport
                    ref={ref}
                    className={twMerge(
                        "origin-top-center relative mt-1.5 h-var(--navigation-menu-viewport-height) w-full overflow-hidden",
                        "rounded-md border bg-white text-gray-950 shadow-lg",
                        "data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-90",
                        "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95",
                        "data-[starting-style]:duration-200 data-[ending-style]:duration-150",
                        "dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
                        className,
                    )}
                    {...props}
                />
            </div>
        );
    },
);
NavigationMenuViewport.displayName = "NavigationMenu.Viewport";

// Compound component for better DX
interface NavigationMenuContentProps {
    children: React.ReactNode;
    className?: string;
}

export const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
    ({ children, className }, ref) => {
        return (
            <NavigationMenuPortal>
                <NavigationMenuPositioner>
                    <NavigationMenuPopup ref={ref} className={className}>
                        {children}
                    </NavigationMenuPopup>
                </NavigationMenuPositioner>
            </NavigationMenuPortal>
        );
    },
);
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenu = {
    Root: NavigationMenuRoot,
    List: NavigationMenuList,
    Item: NavigationMenuItem,
    Trigger: NavigationMenuTrigger,
    Link: NavigationMenuLink,
    Icon: NavigationMenuIcon,
    Portal: NavigationMenuPortal,
    Positioner: NavigationMenuPositioner,
    Popup: NavigationMenuPopup,
    Viewport: NavigationMenuViewport,
};
