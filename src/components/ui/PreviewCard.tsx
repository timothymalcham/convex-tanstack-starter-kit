import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * PreviewCard Component
 *
 * A popup that appears when a link is hovered, showing a rich preview for sighted users.
 * Perfect for link previews, user profiles, product details, and contextual information.
 *
 * @example
 * ```jsx
 * import { PreviewCard, PreviewCardContent } from '@/components/ui/PreviewCard'
 *
 * // Basic link preview
 * <PreviewCard.Root>
 *   <PreviewCard.Trigger href="https://example.com">
 *     Visit our website
 *   </PreviewCard.Trigger>
 *   <PreviewCardContent>
 *     <div className="space-y-3">
 *       <img
 *         src="/website-preview.jpg"
 *         alt="Website preview"
 *         className="w-full h-32 object-cover rounded"
 *       />
 *       <div>
 *         <h3 className="font-semibold">Example Company</h3>
 *         <p className="text-sm text-gray-600">
 *           The leading platform for modern web development.
 *         </p>
 *       </div>
 *       <div className="text-xs text-gray-400">
 *         example.com
 *       </div>
 *     </div>
 *   </PreviewCardContent>
 * </PreviewCard.Root>
 *
 * // User profile preview
 * <PreviewCard.Root>
 *   <PreviewCard.Trigger href="/users/johndoe" className="text-blue-600 hover:underline">
 *     @johndoe
 *   </PreviewCard.Trigger>
 *   <PreviewCardContent>
 *     <div className="flex items-start gap-3">
 *       <img
 *         src="/users/johndoe.jpg"
 *         alt="John Doe"
 *         className="w-12 h-12 rounded-full"
 *       />
 *       <div className="space-y-2">
 *         <div>
 *           <h3 className="font-semibold">John Doe</h3>
 *           <p className="text-sm text-gray-600">Senior Developer</p>
 *         </div>
 *         <p className="text-sm">
 *           Full-stack developer with 8+ years of experience
 *           in React, Node.js, and cloud architecture.
 *         </p>
 *         <div className="flex gap-4 text-xs text-gray-500">
 *           <span>1.2k Followers</span>
 *           <span>342 Following</span>
 *           <span>San Francisco, CA</span>
 *         </div>
 *       </div>
 *     </div>
 *   </PreviewCardContent>
 * </PreviewCard.Root>
 *
 * // Product preview
 * <PreviewCard.Root>
 *   <PreviewCard.Trigger href="/products/laptop-pro" className="font-medium text-gray-900">
 *     MacBook Pro 16"
 *   </PreviewCard.Trigger>
 *   <PreviewCardContent showArrow>
 *     <PreviewCard.Arrow />
 *     <div className="space-y-3">
 *       <img
 *         src="/products/macbook-pro.jpg"
 *         alt="MacBook Pro"
 *         className="w-full h-40 object-cover rounded"
 *       />
 *       <div>
 *         <h3 className="font-semibold">MacBook Pro 16-inch</h3>
 *         <p className="text-sm text-gray-600 mt-1">
 *           Apple M3 Pro chip with 12-core CPU and 18-core GPU
 *         </p>
 *       </div>
 *       <div className="flex justify-between items-center">
 *         <span className="text-lg font-bold">$2,499</span>
 *         <div className="flex gap-2">
 *           <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
 *             In Stock
 *           </span>
 *           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
 *             Free Shipping
 *           </span>
 *         </div>
 *       </div>
 *     </div>
 *   </PreviewCardContent>
 * </PreviewCard.Root>
 *
 * // Article preview
 * <PreviewCard.Root>
 *   <PreviewCard.Trigger href="/blog/react-best-practices" className="text-blue-600 hover:underline">
 *     React Best Practices for 2024
 *   </PreviewCard.Trigger>
 *   <PreviewCardContent side="top">
 *     <article className="space-y-3">
 *       <img
 *         src="/blog/react-cover.jpg"
 *         alt="Article cover"
 *         className="w-full h-24 object-cover rounded"
 *       />
 *       <div>
 *         <h3 className="font-semibold line-clamp-2">
 *           React Best Practices for 2024: Performance, Security, and Maintainability
 *         </h3>
 *         <p className="text-sm text-gray-600 mt-2 line-clamp-3">
 *           Discover the latest React patterns and techniques that will help you
 *           build faster, more secure, and maintainable applications this year.
 *         </p>
 *       </div>
 *       <div className="flex items-center gap-3 text-xs text-gray-500">
 *         <span>By Sarah Johnson</span>
 *         <span>•</span>
 *         <span>Mar 15, 2024</span>
 *         <span>•</span>
 *         <span>8 min read</span>
 *       </div>
 *     </article>
 *   </PreviewCardContent>
 * </PreviewCard.Root>
 *
 * // GitHub repository preview
 * <PreviewCard.Root>
 *   <PreviewCard.Trigger href="https://github.com/facebook/react" className="font-mono text-blue-600">
 *     facebook/react
 *   </PreviewCard.Trigger>
 *   <PreviewCardContent>
 *     <div className="space-y-3">
 *       <div className="flex items-start gap-3">
 *         <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
 *           📁
 *         </div>
 *         <div className="flex-1">
 *           <h3 className="font-semibold">react</h3>
 *           <p className="text-sm text-gray-600">
 *             The library for web and native user interfaces
 *           </p>
 *         </div>
 *       </div>
 *
 *       <div className="flex gap-4 text-sm">
 *         <div className="flex items-center gap-1">
 *           <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
 *           <span>JavaScript</span>
 *         </div>
 *         <div className="flex items-center gap-1">
 *           ⭐ 220k
 *         </div>
 *         <div className="flex items-center gap-1">
 *           🍴 45k
 *         </div>
 *       </div>
 *
 *       <div className="text-xs text-gray-500">
 *         Updated 2 hours ago
 *       </div>
 *     </div>
 *   </PreviewCardContent>
 * </PreviewCard.Root>
 *
 * // Custom delay configuration
 * <PreviewCard.Root openDelay={300} closeDelay={100}>
 *   <PreviewCard.Trigger href="/docs/api-reference" className="text-purple-600">
 *     API Documentation
 *   </PreviewCard.Trigger>
 *   <PreviewCardContent>
 *     <div className="space-y-2">
 *       <h3 className="font-semibold">API Reference</h3>
 *       <p className="text-sm text-gray-600">
 *         Complete documentation for all available endpoints,
 *         parameters, and response formats.
 *       </p>
 *       <div className="flex gap-2 mt-3">
 *         <span className="text-xs bg-gray-100 px-2 py-1 rounded">REST API</span>
 *         <span className="text-xs bg-gray-100 px-2 py-1 rounded">GraphQL</span>
 *         <span className="text-xs bg-gray-100 px-2 py-1 rounded">WebSocket</span>
 *       </div>
 *     </div>
 *   </PreviewCardContent>
 * </PreviewCard.Root>
 *
 * // Large preview card
 * <PreviewCard.Root>
 *   <PreviewCard.Trigger href="/case-studies/startup-success" className="text-green-600 font-medium">
 *     Success Story: 10x Growth
 *   </PreviewCard.Trigger>
 *   <PreviewCardContent className="max-w-md">
 *     <div className="space-y-4">
 *       <img
 *         src="/case-studies/growth-chart.png"
 *         alt="Growth chart"
 *         className="w-full h-32 object-cover rounded"
 *       />
 *       <div>
 *         <h3 className="font-bold text-lg">From Startup to Scale-up</h3>
 *         <p className="text-gray-600 mt-2">
 *           How TechCorp achieved 10x revenue growth in 18 months using
 *           our platform and strategic consulting services.
 *         </p>
 *       </div>
 *       <div className="grid grid-cols-3 gap-4 text-center">
 *         <div>
 *           <div className="font-bold text-green-600">10x</div>
 *           <div className="text-xs text-gray-500">Revenue Growth</div>
 *         </div>
 *         <div>
 *           <div className="font-bold text-blue-600">85%</div>
 *           <div className="text-xs text-gray-500">Cost Reduction</div>
 *         </div>
 *         <div>
 *           <div className="font-bold text-purple-600">18mo</div>
 *           <div className="text-xs text-gray-500">Timeline</div>
 *         </div>
 *       </div>
 *     </div>
 *   </PreviewCardContent>
 * </PreviewCard.Root>
 * ```
 */

interface PreviewCardRootProps extends React.ComponentPropsWithoutRef<typeof BasePreviewCard.Root> {}

const PreviewCardRoot = BasePreviewCard.Root;
PreviewCardRoot.displayName = "PreviewCard.Root";

interface PreviewCardTriggerProps extends React.ComponentPropsWithoutRef<typeof BasePreviewCard.Trigger> {
    className?: string;
}

const PreviewCardTrigger = React.forwardRef<HTMLAnchorElement, PreviewCardTriggerProps>(
    ({ className, ...props }, ref) => {
        return (
            <BasePreviewCard.Trigger
                ref={ref}
                className={twMerge(
                    "text-blue-600 hover:text-blue-800 hover:underline",
                    "focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded",
                    "transition-colors duration-150",
                    className,
                )}
                {...props}
            />
        );
    },
);
PreviewCardTrigger.displayName = "PreviewCard.Trigger";

interface PreviewCardPortalProps extends React.ComponentPropsWithoutRef<typeof BasePreviewCard.Portal> {}

const PreviewCardPortal = BasePreviewCard.Portal;

interface PreviewCardBackdropProps extends React.ComponentPropsWithoutRef<typeof BasePreviewCard.Backdrop> {
    className?: string;
}

const PreviewCardBackdrop = React.forwardRef<HTMLDivElement, PreviewCardBackdropProps>(
    ({ className, ...props }, ref) => {
        return (
            <BasePreviewCard.Backdrop
                ref={ref}
                className={twMerge(
                    "fixed inset-0 z-40 bg-black/5 backdrop-blur-sm",
                    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
                    "animate-in fade-in-0 duration-200",
                    "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:duration-200",
                    className,
                )}
                {...props}
            />
        );
    },
);
PreviewCardBackdrop.displayName = "PreviewCard.Backdrop";

interface PreviewCardPositionerProps extends React.ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner> {
    className?: string;
}

const PreviewCardPositioner = React.forwardRef<HTMLDivElement, PreviewCardPositionerProps>(
    ({ className, ...props }, ref) => {
        return <BasePreviewCard.Positioner ref={ref} className={twMerge("z-50", className)} {...props} />;
    },
);
PreviewCardPositioner.displayName = "PreviewCard.Positioner";

interface PreviewCardPopupProps extends React.ComponentPropsWithoutRef<typeof BasePreviewCard.Popup> {
    className?: string;
}

const PreviewCardPopup = React.forwardRef<HTMLDivElement, PreviewCardPopupProps>(({ className, ...props }, ref) => {
    return (
        <BasePreviewCard.Popup
            ref={ref}
            className={twMerge(
                "max-w-sm overflow-hidden rounded-lg border bg-white p-4 shadow-xl",
                "dark:border-gray-800 dark:bg-gray-950",
                "data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:translate-y-1",
                "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:translate-y-1",
                "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-1 duration-200",
                "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[ending-style]:slide-out-to-bottom-1 data-[ending-style]:duration-150",
                className,
            )}
            {...props}
        />
    );
});
PreviewCardPopup.displayName = "PreviewCard.Popup";

interface PreviewCardArrowProps extends React.ComponentPropsWithoutRef<typeof BasePreviewCard.Arrow> {
    className?: string;
}

const PreviewCardArrow = React.forwardRef<HTMLDivElement, PreviewCardArrowProps>(({ className, ...props }, ref) => {
    return (
        <BasePreviewCard.Arrow
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
PreviewCardArrow.displayName = "PreviewCard.Arrow";

// Compound component for better DX
interface PreviewCardContentProps {
    children: React.ReactNode;
    className?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    showArrow?: boolean;
    showBackdrop?: boolean;
}

export const PreviewCardContent = React.forwardRef<HTMLDivElement, PreviewCardContentProps>(
    ({ children, className, side = "bottom", align = "center", showArrow = false, showBackdrop = false }, ref) => {
        return (
            <PreviewCardPortal>
                {showBackdrop && <PreviewCardBackdrop />}
                <PreviewCardPositioner side={side} align={align}>
                    <PreviewCardPopup ref={ref} className={className}>
                        {showArrow && <PreviewCardArrow />}
                        {children}
                    </PreviewCardPopup>
                </PreviewCardPositioner>
            </PreviewCardPortal>
        );
    },
);
PreviewCardContent.displayName = "PreviewCardContent";

export const PreviewCard = {
    Root: PreviewCardRoot,
    Trigger: PreviewCardTrigger,
    Portal: PreviewCardPortal,
    Backdrop: PreviewCardBackdrop,
    Positioner: PreviewCardPositioner,
    Popup: PreviewCardPopup,
    Arrow: PreviewCardArrow,
};
