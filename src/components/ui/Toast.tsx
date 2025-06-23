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
