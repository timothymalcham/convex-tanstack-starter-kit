import { Popover as BasePopover } from "@base-ui-components/react/popover";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Popover Component
 *
 * An accessible popup component anchored to a trigger element, perfect for tooltips,
 * help text, user profiles, quick actions, and additional information overlays.
 *
 * @example
 * ```jsx
 * import { Popover, PopoverContent } from '@/components/ui/Popover'
 * import { Button } from '@/components/ui/Button'
 *
 * // Basic popover with content
 * <Popover.Root>
 *   <Popover.Trigger asChild>
 *     <Button variant="ghost">Help</Button>
 *   </Popover.Trigger>
 *   <PopoverContent>
 *     <Popover.Title>Quick Help</Popover.Title>
 *     <Popover.Description>
 *       This feature helps you manage your tasks more efficiently.
 *       Click anywhere outside to close.
 *     </Popover.Description>
 *   </PopoverContent>
 * </Popover.Root>
 *
 * // User profile popover
 * <Popover.Root>
 *   <Popover.Trigger asChild>
 *     <Button variant="ghost" className="p-1">
 *       <img
 *         src="/avatar.jpg"
 *         alt="Profile"
 *         className="w-8 h-8 rounded-full"
 *       />
 *     </Button>
 *   </Popover.Trigger>
 *   <PopoverContent side="bottom" align="end">
 *     <div className="flex items-center gap-3 mb-3">
 *       <img
 *         src="/avatar.jpg"
 *         alt="Profile"
 *         className="w-12 h-12 rounded-full"
 *       />
 *       <div>
 *         <Popover.Title className="text-base">John Doe</Popover.Title>
 *         <Popover.Description>john.doe@example.com</Popover.Description>
 *       </div>
 *     </div>
 *     <div className="space-y-2">
 *       <Button variant="ghost" className="w-full justify-start">
 *         View Profile
 *       </Button>
 *       <Button variant="ghost" className="w-full justify-start">
 *         Settings
 *       </Button>
 *       <hr className="my-2" />
 *       <Button variant="ghost" className="w-full justify-start text-red-600">
 *         Sign Out
 *       </Button>
 *     </div>
 *   </PopoverContent>
 * </Popover.Root>
 *
 * // Settings popover with form
 * <Popover.Root>
 *   <Popover.Trigger asChild>
 *     <Button variant="secondary">⚙️ Settings</Button>
 *   </Popover.Trigger>
 *   <PopoverContent>
 *     <div className="space-y-4">
 *       <div>
 *         <Popover.Title>Notification Settings</Popover.Title>
 *         <Popover.Description>
 *           Configure how you receive notifications
 *         </Popover.Description>
 *       </div>
 *
 *       <div className="space-y-3">
 *         <label className="flex items-center space-x-2">
 *           <input type="checkbox" defaultChecked />
 *           <span className="text-sm">Email notifications</span>
 *         </label>
 *         <label className="flex items-center space-x-2">
 *           <input type="checkbox" />
 *           <span className="text-sm">Push notifications</span>
 *         </label>
 *         <label className="flex items-center space-x-2">
 *           <input type="checkbox" defaultChecked />
 *           <span className="text-sm">SMS notifications</span>
 *         </label>
 *       </div>
 *
 *       <div className="flex gap-2 pt-2">
 *         <Button size="sm" className="flex-1">Save</Button>
 *         <Popover.Close asChild>
 *           <Button size="sm" variant="ghost">Cancel</Button>
 *         </Popover.Close>
 *       </div>
 *     </div>
 *   </PopoverContent>
 * </Popover.Root>
 *
 * // Information popover with arrow
 * <Popover.Root>
 *   <Popover.Trigger asChild>
 *     <Button variant="ghost" size="sm">
 *       ℹ️ Info
 *     </Button>
 *   </Popover.Trigger>
 *   <PopoverContent showArrow>
 *     <Popover.Arrow />
 *     <Popover.Title>Feature Information</Popover.Title>
 *     <Popover.Description>
 *       This feature is currently in beta. Some functionality
 *       may be limited or change in future updates.
 *     </Popover.Description>
 *   </PopoverContent>
 * </Popover.Root>
 *
 * // Quick actions popover
 * <Popover.Root>
 *   <Popover.Trigger asChild>
 *     <Button variant="ghost">
 *       ⋯ More Actions
 *     </Button>
 *   </Popover.Trigger>
 *   <PopoverContent side="bottom" className="p-2">
 *     <div className="grid grid-cols-2 gap-1">
 *       <Button variant="ghost" size="sm" className="justify-start">
 *         📋 Copy Link
 *       </Button>
 *       <Button variant="ghost" size="sm" className="justify-start">
 *         📤 Share
 *       </Button>
 *       <Button variant="ghost" size="sm" className="justify-start">
 *         ⭐ Favorite
 *       </Button>
 *       <Button variant="ghost" size="sm" className="justify-start">
 *         🗑️ Delete
 *       </Button>
 *     </div>
 *   </PopoverContent>
 * </Popover.Root>
 *
 * // Controlled popover
 * const [open, setOpen] = React.useState(false)
 *
 * <div className="space-y-2">
 *   <Popover.Root open={open} onOpenChange={setOpen}>
 *     <Popover.Trigger asChild>
 *       <Button>
 *         {open ? 'Close' : 'Open'} Popover
 *       </Button>
 *     </Popover.Trigger>
 *     <PopoverContent>
 *       <Popover.Title>Controlled Popover</Popover.Title>
 *       <Popover.Description>
 *         This popover's state is controlled by React state.
 *       </Popover.Description>
 *       <Button
 *         size="sm"
 *         className="mt-3"
 *         onClick={() => setOpen(false)}
 *       >
 *         Close Programmatically
 *       </Button>
 *     </PopoverContent>
 *   </Popover.Root>
 *
 *   <div className="text-sm text-gray-600">
 *     Popover is {open ? 'open' : 'closed'}
 *   </div>
 * </div>
 *
 * // Hover popover (tooltip-like)
 * <Popover.Root openDelay={200} closeDelay={0}>
 *   <Popover.Trigger asChild>
 *     <Button variant="ghost">
 *       Hover me
 *     </Button>
 *   </Popover.Trigger>
 *   <PopoverContent side="top">
 *     <Popover.Description className="text-sm">
 *       This appears on hover with a slight delay
 *     </Popover.Description>
 *   </PopoverContent>
 * </Popover.Root>
 * ```
 */

interface PopoverRootProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Root> {}

const PopoverRoot = BasePopover.Root;

interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Trigger> {
    asChild?: boolean;
}

const PopoverTrigger = BasePopover.Trigger;

interface PopoverPortalProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Portal> {}

const PopoverPortal = BasePopover.Portal;

interface PopoverBackdropProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Backdrop> {
    className?: string;
}

const PopoverBackdrop = React.forwardRef<HTMLDivElement, PopoverBackdropProps>(({ className, ...props }, ref) => {
    return (
        <BasePopover.Backdrop
            ref={ref}
            className={twMerge(
                "fixed inset-0 z-40 bg-black/10 backdrop-blur-sm",
                "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
                "animate-in fade-in-0 duration-200",
                "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:duration-200",
                className,
            )}
            {...props}
        />
    );
});
PopoverBackdrop.displayName = "Popover.Backdrop";

interface PopoverPositionerProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Positioner> {
    className?: string;
}

const PopoverPositioner = React.forwardRef<HTMLDivElement, PopoverPositionerProps>(({ className, ...props }, ref) => {
    return <BasePopover.Positioner ref={ref} className={twMerge("z-50", className)} {...props} />;
});
PopoverPositioner.displayName = "Popover.Positioner";

interface PopoverPopupProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Popup> {
    className?: string;
}

const PopoverPopup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(({ className, ...props }, ref) => {
    return (
        <BasePopover.Popup
            ref={ref}
            className={twMerge(
                "min-w-32 max-w-xs overflow-hidden rounded-lg border bg-white p-4 shadow-lg",
                "dark:border-gray-800 dark:bg-gray-950",
                "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
                "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
                "animate-in fade-in-0 zoom-in-95 duration-200",
                "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[ending-style]:duration-200",
                className,
            )}
            {...props}
        />
    );
});
PopoverPopup.displayName = "Popover.Popup";

interface PopoverArrowProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Arrow> {
    className?: string;
}

const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(({ className, ...props }, ref) => {
    return (
        <BasePopover.Arrow
            ref={ref}
            className={twMerge(
                "h-2 w-2 rotate-45 border border-gray-200 bg-white",
                "dark:border-gray-800 dark:bg-gray-950",
                className,
            )}
            {...props}
        />
    );
});
PopoverArrow.displayName = "Popover.Arrow";

interface PopoverTitleProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Title> {
    className?: string;
}

const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(({ className, ...props }, ref) => {
    return (
        <BasePopover.Title
            ref={ref}
            className={twMerge("font-semibold text-gray-900 dark:text-gray-100", className)}
            {...props}
        />
    );
});
PopoverTitle.displayName = "Popover.Title";

interface PopoverDescriptionProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Description> {
    className?: string;
}

const PopoverDescription = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
    ({ className, ...props }, ref) => {
        return (
            <BasePopover.Description
                ref={ref}
                className={twMerge("text-sm text-gray-500 dark:text-gray-400", className)}
                {...props}
            />
        );
    },
);
PopoverDescription.displayName = "Popover.Description";

interface PopoverCloseProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Close> {
    asChild?: boolean;
}

const PopoverClose = BasePopover.Close;
PopoverClose.displayName = "Popover.Close";

// Compound component for better DX
interface PopoverContentProps {
    children: React.ReactNode;
    className?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    showArrow?: boolean;
    showBackdrop?: boolean;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ children, className, side = "bottom", align = "center", showArrow = false, showBackdrop = false }, ref) => {
        return (
            <PopoverPortal>
                {showBackdrop && <PopoverBackdrop />}
                <PopoverPositioner side={side} align={align}>
                    <PopoverPopup ref={ref} className={className}>
                        {showArrow && <PopoverArrow />}
                        {children}
                    </PopoverPopup>
                </PopoverPositioner>
            </PopoverPortal>
        );
    },
);
PopoverContent.displayName = "PopoverContent";

export const Popover = {
    Root: PopoverRoot,
    Trigger: PopoverTrigger,
    Portal: PopoverPortal,
    Backdrop: PopoverBackdrop,
    Positioner: PopoverPositioner,
    Popup: PopoverPopup,
    Arrow: PopoverArrow,
    Title: PopoverTitle,
    Description: PopoverDescription,
    Close: PopoverClose,
};
