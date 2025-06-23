import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Dialog Component
 *
 * A flexible modal dialog that opens on top of the page content. Unlike AlertDialog,
 * Dialog is more general-purpose and doesn't interrupt the user's workflow.
 *
 * @example
 * ```jsx
 * import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/Dialog'
 * import { Button } from '@/components/ui/Button'
 * import { Field } from '@/components/ui/Field'
 *
 * // Basic dialog
 * <Dialog.Root>
 *   <Dialog.Trigger asChild>
 *     <Button>Open Dialog</Button>
 *   </Dialog.Trigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <Dialog.Title>Edit Profile</Dialog.Title>
 *       <Dialog.Description>
 *         Make changes to your profile here. Click save when you're done.
 *       </Dialog.Description>
 *     </DialogHeader>
 *     <div className="grid gap-4 py-4">
 *       <Field.Root>
 *         <Field.Label htmlFor="name">Name</Field.Label>
 *         <Field.Control id="name" defaultValue="Pedro Duarte" />
 *       </Field.Root>
 *       <Field.Root>
 *         <Field.Label htmlFor="username">Username</Field.Label>
 *         <Field.Control id="username" defaultValue="@peduarte" />
 *       </Field.Root>
 *     </div>
 *     <DialogFooter>
 *       <Dialog.Close asChild>
 *         <Button variant="ghost">Cancel</Button>
 *       </Dialog.Close>
 *       <Button>Save changes</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog.Root>
 *
 * // Controlled dialog
 * const [open, setOpen] = React.useState(false)
 *
 * <Dialog.Root open={open} onOpenChange={setOpen}>
 *   <Dialog.Trigger asChild>
 *     <Button>Settings</Button>
 *   </Dialog.Trigger>
 *   <DialogContent className="max-w-2xl">
 *     <DialogHeader>
 *       <Dialog.Title>Application Settings</Dialog.Title>
 *       <Dialog.Description>
 *         Configure your application preferences and settings.
 *       </Dialog.Description>
 *     </DialogHeader>
 *     <div className="space-y-6">
 *       <div>
 *         <h3 className="text-lg font-medium">Notifications</h3>
 *         <div className="mt-2 space-y-2">
 *           <label className="flex items-center space-x-2">
 *             <input type="checkbox" defaultChecked />
 *             <span>Email notifications</span>
 *           </label>
 *           <label className="flex items-center space-x-2">
 *             <input type="checkbox" />
 *             <span>Push notifications</span>
 *           </label>
 *         </div>
 *       </div>
 *     </div>
 *     <DialogFooter>
 *       <Dialog.Close asChild>
 *         <Button variant="ghost">Cancel</Button>
 *       </Dialog.Close>
 *       <Button onClick={() => setOpen(false)}>Save</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog.Root>
 *
 * // Full-screen dialog on mobile
 * <Dialog.Root>
 *   <Dialog.Trigger asChild>
 *     <Button>View Details</Button>
 *   </Dialog.Trigger>
 *   <DialogContent className="sm:max-w-lg h-full sm:h-auto">
 *     <DialogHeader>
 *       <Dialog.Title>Product Details</Dialog.Title>
 *     </DialogHeader>
 *     <div className="flex-1 overflow-y-auto">
 *       <img src="/product.jpg" alt="Product" className="w-full h-48 object-cover mb-4" />
 *       <div className="space-y-4">
 *         <p>Detailed product description goes here...</p>
 *         <div className="space-y-2">
 *           <div className="flex justify-between">
 *             <span>Price:</span>
 *             <span className="font-semibold">$99.99</span>
 *           </div>
 *           <div className="flex justify-between">
 *             <span>Stock:</span>
 *             <span>In stock</span>
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *     <DialogFooter>
 *       <Button className="w-full">Add to Cart</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog.Root>
 *
 * // Custom sized dialog
 * <Dialog.Root>
 *   <Dialog.Trigger asChild>
 *     <Button>Large Dialog</Button>
 *   </Dialog.Trigger>
 *   <DialogContent size="xl">
 *     <DialogHeader>
 *       <Dialog.Title>Data Visualization</Dialog.Title>
 *     </DialogHeader>
 *     <div className="h-96">
 *       <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
 *         Chart placeholder
 *       </div>
 *     </div>
 *   </DialogContent>
 * </Dialog.Root>
 * ```
 */

interface DialogRootProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Root> {}

const DialogRoot = BaseDialog.Root;

interface DialogTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger> {
    asChild?: boolean;
}

const DialogTrigger = BaseDialog.Trigger;

interface DialogPortalProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Portal> {}

const DialogPortal = BaseDialog.Portal;

interface DialogBackdropProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop> {
    className?: string;
}

const DialogBackdrop = React.forwardRef<HTMLDivElement, DialogBackdropProps>(({ className, ...props }, ref) => {
    return (
        <BaseDialog.Backdrop
            ref={ref}
            className={twMerge(
                "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
                "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
                "animate-in fade-in-0 duration-200",
                "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:duration-200",
                className,
            )}
            {...props}
        />
    );
});
DialogBackdrop.displayName = "Dialog.Backdrop";

interface DialogPopupProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

const DialogPopup = React.forwardRef<HTMLDivElement, DialogPopupProps>(({ className, size = "md", ...props }, ref) => {
    const sizeStyles = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-none w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]",
    };

    return (
        <BaseDialog.Popup
            ref={ref}
            className={twMerge(
                "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%]",
                "gap-4 border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950",
                "rounded-lg",
                "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
                "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
                "animate-in fade-in-0 zoom-in-95 duration-200",
                "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[ending-style]:duration-200",
                sizeStyles[size],
                className,
            )}
            {...props}
        />
    );
});
DialogPopup.displayName = "Dialog.Popup";

interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Title> {
    className?: string;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, ...props }, ref) => {
    return (
        <BaseDialog.Title
            ref={ref}
            className={twMerge(
                "text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100",
                className,
            )}
            {...props}
        />
    );
});
DialogTitle.displayName = "Dialog.Title";

interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Description> {
    className?: string;
}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseDialog.Description
                ref={ref}
                className={twMerge("text-sm text-gray-500 dark:text-gray-400", className)}
                {...props}
            />
        );
    },
);
DialogDescription.displayName = "Dialog.Description";

interface DialogCloseProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Close> {
    asChild?: boolean;
}

const DialogClose = BaseDialog.Close;

// Compound components for better DX
interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
    ({ children, className, size, ...props }, ref) => {
        return (
            <DialogPortal>
                <DialogBackdrop />
                <DialogPopup ref={ref} className={className} size={size} {...props}>
                    {children}
                </DialogPopup>
            </DialogPortal>
        );
    },
);
DialogContent.displayName = "DialogContent";

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={twMerge("flex flex-col space-y-1.5 text-center sm:text-left", className)}
            {...props}
        />
    );
});
DialogHeader.displayName = "DialogHeader";

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2", className)}
            {...props}
        />
    );
});
DialogFooter.displayName = "DialogFooter";

export const Dialog = {
    Root: DialogRoot,
    Trigger: DialogTrigger,
    Portal: DialogPortal,
    Backdrop: DialogBackdrop,
    Popup: DialogPopup,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
};
