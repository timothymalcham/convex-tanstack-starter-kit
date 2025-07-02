import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Collapsible Component
 *
 * A collapsible panel controlled by a button for showing/hiding content.
 *
 * @example
 * ```jsx
 * import { Collapsible } from '@/components/ui/Collapsible'
 * import { Button } from '@/components/ui/Button'
 *
 * // Basic collapsible
 * <Collapsible.Root>
 *   <Collapsible.Trigger asChild>
 *     <Button variant="ghost">Toggle Content</Button>
 *   </Collapsible.Trigger>
 *   <Collapsible.Panel>
 *     <div className="p-4 text-sm">
 *       This content can be collapsed and expanded.
 *     </div>
 *   </Collapsible.Panel>
 * </Collapsible.Root>
 *
 * // Controlled collapsible
 * const [isOpen, setIsOpen] = React.useState(false)
 *
 * <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <Collapsible.Trigger asChild>
 *     <Button variant="secondary">
 *       {isOpen ? 'Hide' : 'Show'} Details
 *     </Button>
 *   </Collapsible.Trigger>
 *   <Collapsible.Panel>
 *     <div className="border-t mt-2 pt-2">
 *       <p>Here are the details you requested...</p>
 *     </div>
 *   </Collapsible.Panel>
 * </Collapsible.Root>
 *
 * // With custom trigger styling
 * <Collapsible.Root defaultOpen>
 *   <Collapsible.Trigger>
 *     <span className="font-medium">Advanced Settings</span>
 *     <svg
 *       className="h-4 w-4"
 *       fill="none"
 *       stroke="currentColor"
 *       viewBox="0 0 24 24"
 *     >
 *       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
 *     </svg>
 *   </Collapsible.Trigger>
 *   <Collapsible.Panel>
 *     <div className="p-4 space-y-3 bg-gray-50">
 *       <div>
 *         <label className="block text-sm font-medium mb-1">Setting 1</label>
 *         <input type="text" className="w-full border rounded px-2 py-1" />
 *       </div>
 *       <div>
 *         <label className="block text-sm font-medium mb-1">Setting 2</label>
 *         <select className="w-full border rounded px-2 py-1">
 *           <option>Option 1</option>
 *           <option>Option 2</option>
 *         </select>
 *       </div>
 *     </div>
 *   </Collapsible.Panel>
 * </Collapsible.Root>
 *
 * // FAQ-style collapsible
 * <div className="space-y-2">
 *   <Collapsible.Root>
 *     <Collapsible.Trigger>
 *       <span className="font-medium">What is your return policy?</span>
 *       <span className="text-gray-400">▼</span>
 *     </Collapsible.Trigger>
 *     <Collapsible.Panel>
 *       <div className="px-4 pb-4 text-gray-600">
 *         We offer a 30-day return policy for all unused items in their original packaging.
 *       </div>
 *     </Collapsible.Panel>
 *   </Collapsible.Root>
 * </div>
 *
 * // Disabled state
 * <Collapsible.Root disabled>
 *   <Collapsible.Trigger asChild>
 *     <Button disabled>Cannot Toggle</Button>
 *   </Collapsible.Trigger>
 *   <Collapsible.Panel>
 *     This content cannot be toggled.
 *   </Collapsible.Panel>
 * </Collapsible.Root>
 * ```
 */

interface CollapsibleRootProps extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Root> {
    className?: string;
}

const CollapsibleRoot = React.forwardRef<HTMLDivElement, CollapsibleRootProps>(({ className, ...props }, ref) => {
    return <BaseCollapsible.Root ref={ref} className={twMerge("group", className)} {...props} />;
});
CollapsibleRoot.displayName = "Collapsible.Root";

interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger> {
    className?: string;
    asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
    ({ className, asChild, ...props }, ref) => {
        if (asChild) {
            return <BaseCollapsible.Trigger ref={ref} {...props} />;
        }

        return (
            <BaseCollapsible.Trigger
                ref={ref}
                className={twMerge(
                    "flex items-center justify-between w-full rounded-lg text-sm font-medium text-left",
                    "transition-all duration-200 ease-out",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 shadow-sm hover:shadow-md",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "bg-gradient-to-b from-neutral-50 to-neutral-100/80 text-neutral-900 hover:from-neutral-100 hover:to-neutral-200/80 border border-neutral-200/60",
                    "dark:bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-700/80 dark:text-neutral-100 dark:hover:from-neutral-700 dark:hover:to-neutral-600/80 dark:border-neutral-700/60",
                    "px-4 py-3",
                    "[&>svg]:data-[panel-open]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-200",
                    className,
                )}
                {...props}
            />
        );
    },
);
CollapsibleTrigger.displayName = "Collapsible.Trigger";

interface CollapsiblePanelProps extends React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel> {
    className?: string;
}

const CollapsiblePanel = React.forwardRef<HTMLDivElement, CollapsiblePanelProps>(({ className, ...props }, ref) => {
    return (
        <BaseCollapsible.Panel
            ref={ref}
            className={twMerge(
                "overflow-hidden transition-all duration-200 ease-out",
                "data-[starting-style]:h-0",
                "data-[ending-style]:h-0",
                "data-[open]:animate-collapsible-down",
                "data-[closed]:animate-collapsible-up",
                "border-x border-b border-neutral-200/60 dark:border-neutral-700/60 rounded-b-lg -mt-px bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm",
                className,
            )}
            {...props}
        />
    );
});
CollapsiblePanel.displayName = "Collapsible.Panel";

export const Collapsible = {
    Root: CollapsibleRoot,
    Trigger: CollapsibleTrigger,
    Panel: CollapsiblePanel,
};
