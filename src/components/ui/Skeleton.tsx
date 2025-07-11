import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Skeleton Component
 *
 * Loading placeholder that shows a shimmer animation while content is being loaded.
 * Use skeletons to improve perceived performance and prevent layout shift.
 *
 * @example Basic skeleton shapes:
 * ```jsx
 * // Text skeleton
 * <Skeleton className="h-4 w-32" />
 *
 * // Avatar skeleton
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * // Card skeleton
 * <Skeleton className="h-24 w-full rounded-lg" />
 * ```
 *
 * @example Complete skeleton layout:
 * ```jsx
 * <div className="space-y-4">
 *   <Skeleton className="h-8 w-48" /> // Title
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-full" /> // Text line
 *     <Skeleton className="h-4 w-full" /> // Text line
 *     <Skeleton className="h-4 w-3/4" /> // Partial text line
 *   </div>
 *   <Skeleton className="h-32 w-full rounded-lg" /> // Image
 * </div>
 * ```
 *
 * @example With custom animation:
 * ```jsx
 * // Disable animation
 * <Skeleton className="h-4 w-32" animate={false} />
 *
 * // Custom shimmer color
 * <Skeleton
 *   className="h-4 w-32"
 *   shimmerClassName="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100"
 * />
 * ```
 */

export interface SkeletonProps {
    className?: string;
    animate?: boolean;
    shimmerClassName?: string;
    children?: React.ReactNode;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, animate = true, shimmerClassName, children }, ref) => {
        return (
            <div
                ref={ref}
                className={twMerge(
                    "relative overflow-hidden bg-interactive-muted",
                    animate &&
                        "before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
                    className,
                )}
                style={{
                    backgroundImage: animate && shimmerClassName ? undefined : undefined,
                }}
            >
                {children}
                {animate && shimmerClassName && (
                    <div className={twMerge("absolute inset-0 animate-shimmer", shimmerClassName)} />
                )}
            </div>
        );
    },
);

Skeleton.displayName = "Skeleton";

/**
 * SkeletonText Component
 *
 * Preset skeleton for text content with multiple lines.
 *
 * @example
 * ```jsx
 * // Single line
 * <SkeletonText />
 *
 * // Multiple lines
 * <SkeletonText lines={3} />
 *
 * // With custom width for last line
 * <SkeletonText lines={3} lastLineWidth="60%" />
 * ```
 */

export interface SkeletonTextProps {
    lines?: number;
    className?: string;
    lineClassName?: string;
    lastLineWidth?: string;
    animate?: boolean;
}

export function SkeletonText({
    lines = 1,
    className,
    lineClassName,
    lastLineWidth = "75%",
    animate = true,
}: SkeletonTextProps) {
    return (
        <div className={twMerge("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    className={twMerge(
                        "h-4",
                        index === lines - 1 && lines > 1 ? `w-[${lastLineWidth}]` : "w-full",
                        lineClassName,
                    )}
                    animate={animate}
                    style={index === lines - 1 && lines > 1 ? { width: lastLineWidth } : undefined}
                />
            ))}
        </div>
    );
}

/**
 * SkeletonButton Component
 *
 * Preset skeleton for button elements.
 *
 * @example
 * ```jsx
 * <SkeletonButton />
 * <SkeletonButton size="lg" />
 * <SkeletonButton variant="icon" />
 * ```
 */

export interface SkeletonButtonProps {
    size?: "sm" | "md" | "lg";
    variant?: "default" | "icon";
    className?: string;
    animate?: boolean;
}

export function SkeletonButton({ size = "md", variant = "default", className, animate = true }: SkeletonButtonProps) {
    const sizeClasses = {
        sm: variant === "icon" ? "h-8 w-8" : "h-8 w-20",
        md: variant === "icon" ? "h-10 w-10" : "h-10 w-24",
        lg: variant === "icon" ? "h-12 w-12" : "h-12 w-32",
    };

    return <Skeleton className={twMerge(sizeClasses[size], "rounded-md", className)} animate={animate} />;
}

/**
 * SkeletonAvatar Component
 *
 * Preset skeleton for avatar elements.
 *
 * @example
 * ```jsx
 * <SkeletonAvatar />
 * <SkeletonAvatar size="lg" />
 * <SkeletonAvatar shape="square" />
 * ```
 */

export interface SkeletonAvatarProps {
    size?: "sm" | "md" | "lg" | "xl";
    shape?: "circle" | "square";
    className?: string;
    animate?: boolean;
}

export function SkeletonAvatar({ size = "md", shape = "circle", className, animate = true }: SkeletonAvatarProps) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
    };

    return (
        <Skeleton
            className={twMerge(sizeClasses[size], shape === "circle" ? "rounded-full" : "rounded-md", className)}
            animate={animate}
        />
    );
}

/**
 * SkeletonCard Component
 *
 * Preset skeleton for card layouts with header, content, and footer.
 *
 * @example
 * ```jsx
 * <SkeletonCard />
 *
 * // With custom content
 * <SkeletonCard>
 *   <SkeletonAvatar />
 *   <SkeletonText lines={2} />
 * </SkeletonCard>
 * ```
 */

export interface SkeletonCardProps {
    className?: string;
    children?: React.ReactNode;
    animate?: boolean;
}

export function SkeletonCard({ className, children, animate = true }: SkeletonCardProps) {
    return (
        <div className={twMerge("rounded-lg border border-border-outline bg-surface-card p-6", className)}>
            {children || (
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <SkeletonAvatar animate={animate} />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" animate={animate} />
                            <Skeleton className="h-3 w-24" animate={animate} />
                        </div>
                    </div>
                    <SkeletonText lines={3} animate={animate} />
                    <div className="flex gap-2">
                        <SkeletonButton size="sm" animate={animate} />
                        <SkeletonButton size="sm" animate={animate} />
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * SkeletonTable Component
 *
 * Preset skeleton for table layouts.
 *
 * @example
 * ```jsx
 * <SkeletonTable rows={5} columns={4} />
 * ```
 */

export interface SkeletonTableProps {
    rows?: number;
    columns?: number;
    className?: string;
    showHeader?: boolean;
    animate?: boolean;
}

export function SkeletonTable({
    rows = 5,
    columns = 3,
    className,
    showHeader = true,
    animate = true,
}: SkeletonTableProps) {
    return (
        <div className={twMerge("w-full space-y-4", className)}>
            {showHeader && (
                <div className="flex gap-4 border-b border-border-outline pb-4">
                    {Array.from({ length: columns }).map((_, index) => (
                        <Skeleton key={index} className="h-4 flex-1" animate={animate} />
                    ))}
                </div>
            )}
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-4">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Skeleton key={colIndex} className="h-8 flex-1" animate={animate} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Add shimmer animation to app.css
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;
