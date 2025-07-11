import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Spinner Component
 *
 * Animated loading indicator for showing progress or busy states.
 * Use spinners when content is being loaded or processed.
 *
 * @example Basic usage:
 * ```jsx
 * <Spinner />
 * <Spinner size="lg" />
 * <Spinner color="primary" />
 * ```
 *
 * @example With loading text:
 * ```jsx
 * <div className="flex items-center gap-2">
 *   <Spinner size="sm" />
 *   <span>Loading...</span>
 * </div>
 * ```
 *
 * @example Full page loader:
 * ```jsx
 * <div className="fixed inset-0 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
 *   <Spinner size="xl" />
 * </div>
 * ```
 *
 * @example Button with loading state:
 * ```jsx
 * <Button disabled={isLoading}>
 *   {isLoading && <Spinner size="sm" className="mr-2" />}
 *   {isLoading ? 'Saving...' : 'Save'}
 * </Button>
 * ```
 */

export interface SpinnerProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    color?: "primary" | "secondary" | "accent" | "current";
    className?: string;
    thickness?: number;
    speed?: "slow" | "normal" | "fast";
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
    ({ size = "md", color = "primary", className, thickness = 2, speed = "normal" }, ref) => {
        const sizeClasses = {
            xs: "h-3 w-3",
            sm: "h-4 w-4",
            md: "h-6 w-6",
            lg: "h-8 w-8",
            xl: "h-12 w-12",
        };

        const colorClasses = {
            primary: "text-interactive-primary",
            secondary: "text-interactive-secondary",
            accent: "text-interactive-accent",
            current: "text-current",
        };

        const speedClasses = {
            slow: "animate-spin-slow",
            normal: "animate-spin",
            fast: "animate-spin-fast",
        };

        return (
            <svg
                ref={ref}
                className={twMerge(sizeClasses[size], colorClasses[color], speedClasses[speed], className)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={thickness} />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );
    },
);

Spinner.displayName = "Spinner";

/**
 * LoadingDots Component
 *
 * Three animated dots for subtle loading indicators.
 *
 * @example
 * ```jsx
 * <LoadingDots />
 * <LoadingDots size="lg" color="secondary" />
 * ```
 */

export interface LoadingDotsProps {
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "accent" | "current";
    className?: string;
}

export function LoadingDots({ size = "md", color = "primary", className }: LoadingDotsProps) {
    const sizeClasses = {
        sm: "h-1 w-1",
        md: "h-2 w-2",
        lg: "h-3 w-3",
    };

    const colorClasses = {
        primary: "bg-interactive-primary",
        secondary: "bg-interactive-secondary",
        accent: "bg-interactive-accent",
        current: "bg-current",
    };

    return (
        <div className={twMerge("flex items-center gap-1", className)}>
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    className={twMerge("animate-bounce rounded-full", sizeClasses[size], colorClasses[color])}
                    style={{
                        animationDelay: `${index * 0.15}s`,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * LoadingBar Component
 *
 * Progress bar style loading indicator.
 *
 * @example
 * ```jsx
 * <LoadingBar />
 * <LoadingBar progress={75} />
 * <LoadingBar indeterminate={false} progress={50} />
 * ```
 */

export interface LoadingBarProps {
    progress?: number;
    indeterminate?: boolean;
    color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
    className?: string;
    height?: "sm" | "md" | "lg";
}

export function LoadingBar({
    progress = 0,
    indeterminate = true,
    color = "primary",
    className,
    height = "md",
}: LoadingBarProps) {
    const heightClasses = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
    };

    const colorClasses = {
        primary: "bg-interactive-primary",
        secondary: "bg-interactive-secondary",
        accent: "bg-interactive-accent",
        success: "bg-state-success",
        warning: "bg-state-warning",
        error: "bg-state-error",
    };

    return (
        <div
            className={twMerge(
                "w-full overflow-hidden rounded-full bg-interactive-muted",
                heightClasses[height],
                className,
            )}
        >
            <div
                className={twMerge(
                    "h-full transition-all duration-300",
                    colorClasses[color],
                    indeterminate && "animate-progress",
                )}
                style={{
                    width: indeterminate ? "30%" : `${Math.min(100, Math.max(0, progress))}%`,
                }}
            />
        </div>
    );
}

/**
 * LoadingOverlay Component
 *
 * Full overlay with spinner for blocking interactions during loading.
 *
 * @example
 * ```jsx
 * {isLoading && <LoadingOverlay />}
 *
 * // With custom message
 * {isLoading && (
 *   <LoadingOverlay>
 *     <p className="mt-4 text-sm">Processing your request...</p>
 *   </LoadingOverlay>
 * )}
 * ```
 */

export interface LoadingOverlayProps {
    className?: string;
    children?: React.ReactNode;
    blur?: boolean;
}

export function LoadingOverlay({ className, children, blur = true }: LoadingOverlayProps) {
    return (
        <div
            className={twMerge(
                "fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface/80",
                blur && "backdrop-blur-sm",
                className,
            )}
        >
            <Spinner size="xl" />
            {children}
        </div>
    );
}

/**
 * InlineLoader Component
 *
 * Small inline loading indicator for text or small areas.
 *
 * @example
 * ```jsx
 * <span>
 *   Saving <InlineLoader />
 * </span>
 * ```
 */

export interface InlineLoaderProps {
    className?: string;
}

export function InlineLoader({ className }: InlineLoaderProps) {
    return (
        <span className={twMerge("inline-flex", className)}>
            <LoadingDots size="sm" />
        </span>
    );
}
