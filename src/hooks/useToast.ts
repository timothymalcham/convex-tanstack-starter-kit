import { toast } from "~/components/ui/Toast";

// React hook for using toasts
export function useToast() {
    return {
        toast: toast.default,
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
        action: toast.action,
        loading: toast.loading,
        dismiss: toast.dismiss,
        promise: toast.promise,
    };
}
