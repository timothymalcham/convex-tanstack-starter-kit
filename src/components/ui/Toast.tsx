/**
 * Toast Component
 *
 * Notification toasts using Sonner. Shows temporary messages to users.
 *
 * @example
 * // Import the toast functions
 * import { toast } from "~/components/ui/Toast";
 * import { useToast } from "~/hooks/useToast";
 *
 * // Basic usage
 * toast.success("Profile updated successfully!");
 * toast.error("Failed to save changes");
 * toast.info("New version available");
 * toast.warning("Storage almost full");
 *
 * // With descriptions
 * toast.success("Profile updated", {
 *   description: "Your changes have been saved"
 * });
 *
 * // With actions
 * toast.action("New message received", {
 *   label: "View",
 *   onClick: (e) => router.push("/messages")
 * });
 *
 * // Using the hook
 * function MyComponent() {
 *   const { success, error, dismiss } = useToast();
 *
 *   const handleSave = async () => {
 *     try {
 *       await saveData();
 *       success("Data saved!");
 *     } catch (error) {
 *       error("Failed to save");
 *     }
 *   };
 * }
 *
 * // Loading states
 * const promise = fetch('/api/data');
 * toast.promise(promise, {
 *   loading: 'Saving...',
 *   success: 'Data saved!',
 *   error: 'Failed to save'
 * });
 *
 * @usage
 * - Success confirmations
 * - Error messages
 * - Form validation feedback
 * - Background operation notifications
 * - Undo actions
 * - System status updates
 *
 * @best-practices
 * - Keep messages concise and actionable
 * - Use appropriate variants for context
 * - Don't overuse - avoid toast fatigue
 * - Provide actions for important notifications
 * - Consider persistence for critical errors
 * - Test on mobile for readability
 * - Use loading toasts for async operations
 */

import * as React from "react";
import { toast as sonnerToast, Toaster } from "sonner";

interface ToasterProps {
    className?: string;
}

export const Toast = React.forwardRef<HTMLDivElement, ToasterProps>(({ className, ...props }, ref) => {
    return (
        <Toaster
            ref={ref}
            position="bottom-right"
            richColors={false}
            className={className}
            toastOptions={{
                style: {},
                className: "",
                descriptionClassName: "text-sm text-gray-600",
                actionButtonStyle: {},
                cancelButtonStyle: {},
            }}
            {...props}
        />
    );
});

Toast.displayName = "Toast";

interface ToastOptions {
    description?: string;
    action?: {
        label: string;
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    };
    cancel?: {
        label: string;
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    };
}

export const toast = {
    default: (message: string, options?: ToastOptions) => {
        return sonnerToast(message, {
            description: options?.description,
            action: options?.action,
            cancel: options?.cancel,
        });
    },

    success: (message: string, options?: ToastOptions) => {
        return sonnerToast.success(message, {
            description: options?.description,
            action: options?.action,
            cancel: options?.cancel,
        });
    },

    info: (message: string, options?: ToastOptions) => {
        return sonnerToast.info(message, {
            description: options?.description,
            action: options?.action,
            cancel: options?.cancel,
        });
    },

    warning: (message: string, options?: ToastOptions) => {
        return sonnerToast.warning(message, {
            description: options?.description,
            action: options?.action,
            cancel: options?.cancel,
        });
    },

    error: (message: string, options?: ToastOptions) => {
        return sonnerToast.error(message, {
            description: options?.description,
            action: options?.action,
            cancel: options?.cancel,
        });
    },

    action: (
        message: string,
        action: { label: string; onClick: (event: React.MouseEvent<HTMLButtonElement>) => void },
        options?: Omit<ToastOptions, "action">,
    ) => {
        return sonnerToast(message, {
            description: options?.description,
            action,
            cancel: options?.cancel,
        });
    },

    // Utility functions
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
    loading: (message: string, options?: Omit<ToastOptions, "action" | "cancel">) =>
        sonnerToast.loading(message, { description: options?.description }),
    promise: sonnerToast.promise,
};
