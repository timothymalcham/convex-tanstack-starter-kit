/**
 * Tooltip Component
 *
 * Displays informative text when users hover over or focus on an element. Built with Base UI Tooltip.
 *
 * @example
 * // Basic tooltip
 * <Tooltip.Provider>
 *   <Tooltip.Root>
 *     <Tooltip.Trigger>
 *       <Button>Hover me</Button>
 *     </Tooltip.Trigger>
 *     <Tooltip.Portal>
 *       <Tooltip.Positioner>
 *         <Tooltip.Popup>
 *           <Tooltip.Arrow />
 *           This is a helpful tooltip!
 *         </Tooltip.Popup>
 *       </Tooltip.Positioner>
 *     </Tooltip.Portal>
 *   </Tooltip.Root>
 * </Tooltip.Provider>
 *
 * // Multiple tooltips
 * <Tooltip.Provider>
 *   <div className="flex gap-2">
 *     <Tooltip.Root>
 *       <Tooltip.Trigger>
 *         <Button><BoldIcon /></Button>
 *       </Tooltip.Trigger>
 *       <Tooltip.Portal>
 *         <Tooltip.Positioner>
 *           <Tooltip.Popup>
 *             <Tooltip.Arrow />
 *             Bold (Ctrl+B)
 *           </Tooltip.Popup>
 *         </Tooltip.Positioner>
 *       </Tooltip.Portal>
 *     </Tooltip.Root>
 *   </div>
 * </Tooltip.Provider>
 *
 * // Custom positioning
 * <Tooltip.Positioner sideOffset={20} side="bottom">
 *   <Tooltip.Popup className="bg-black text-white">
 *     Custom styled tooltip
 *   </Tooltip.Popup>
 * </Tooltip.Positioner>
 *
 * // Without arrow
 * <Tooltip.Popup>
 *   Tooltip without arrow
 * </Tooltip.Popup>
 *
 * @usage
 * - Icon button explanations
 * - Keyboard shortcut hints
 * - Form field help text
 * - Feature explanations
 * - Status information
 * - Abbreviated content expansion
 *
 * @best-practices
 * - Keep text concise and helpful
 * - Don't use for critical information
 * - Ensure tooltips don't cover important content
 * - Include keyboard shortcuts when relevant
 * - Test on touch devices (consider alternatives)
 * - Don't nest interactive elements in tooltips
 * - Use consistent delay timing
 * - Provide fallback for screen readers
 */

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger> {
    className?: string;
}

interface TooltipPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner> {
    sideOffset?: number;
}

interface TooltipPopupProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> {
    className?: string;
}

interface TooltipArrowProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Arrow> {
    className?: string;
}

export const TooltipProvider = BaseTooltip.Provider;

export const TooltipRoot = BaseTooltip.Root;

export const TooltipTrigger = React.forwardRef<React.ElementRef<typeof BaseTooltip.Trigger>, TooltipTriggerProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseTooltip.Trigger
                ref={ref}
                className={twMerge(
                    "flex items-center justify-center rounded-sm text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[popup-open]:bg-gray-100 focus-visible:[&:not(:hover)]:bg-transparent",
                    className,
                )}
                {...props}
            />
        );
    },
);

export const TooltipPortal = BaseTooltip.Portal;

export const TooltipPositioner = React.forwardRef<
    React.ElementRef<typeof BaseTooltip.Positioner>,
    TooltipPositionerProps
>(({ sideOffset = 10, ...props }, ref) => {
    return <BaseTooltip.Positioner ref={ref} sideOffset={sideOffset} {...props} />;
});

export const TooltipPopup = React.forwardRef<React.ElementRef<typeof BaseTooltip.Popup>, TooltipPopupProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseTooltip.Popup
                ref={ref}
                className={twMerge(
                    "flex origin-[var(--transform-origin)] flex-col rounded-md bg-[canvas] px-2 py-1 text-sm shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[instant]:duration-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300",
                    className,
                )}
                {...props}
            />
        );
    },
);

export const TooltipArrow = React.forwardRef<React.ElementRef<typeof BaseTooltip.Arrow>, TooltipArrowProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseTooltip.Arrow
                ref={ref}
                className={twMerge(
                    "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
                    className,
                )}
                {...props}
            >
                {children || <DefaultArrow />}
            </BaseTooltip.Arrow>
        );
    },
);

// Default arrow SVG component
function DefaultArrow() {
    return (
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
            <path
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                className="fill-[canvas]"
            />
            <path
                d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
                className="fill-gray-200 dark:fill-none"
            />
            <path
                d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
                className="dark:fill-gray-300"
            />
        </svg>
    );
}

TooltipTrigger.displayName = "TooltipTrigger";
TooltipPositioner.displayName = "TooltipPositioner";
TooltipPopup.displayName = "TooltipPopup";
TooltipArrow.displayName = "TooltipArrow";

// Compound component pattern for easier usage
export const Tooltip = {
    Provider: TooltipProvider,
    Root: TooltipRoot,
    Trigger: TooltipTrigger,
    Portal: TooltipPortal,
    Positioner: TooltipPositioner,
    Popup: TooltipPopup,
    Arrow: TooltipArrow,
};
