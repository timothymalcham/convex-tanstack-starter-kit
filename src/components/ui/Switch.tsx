/**
 * Switch Component
 *
 * A toggle switch for binary choices. Built with Base UI Switch.
 *
 * @example
 * // Basic switch
 * <Switch defaultChecked />
 *
 * // Controlled switch
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * // With label (preferred - accessible)
 * <SwitchWithLabel label="Enable notifications" />
 *
 * // With label and description
 * <SwitchWithLabel
 *   label="Push notifications"
 *   description="Receive alerts about new messages"
 * />
 *
 * // Label on the left
 * <SwitchWithLabel
 *   label="Dark mode"
 *   labelPosition="left"
 * />
 *
 * // Manual label (legacy approach)
 * <label className="flex items-center gap-2">
 *   <Switch />
 *   Enable notifications
 * </label>
 *
 * // Custom styling
 * <Switch
 *   className="bg-green-600 data-[checked]:bg-green-700"
 *   thumbClassName="bg-white"
 * />
 *
 * // Advanced usage with custom children
 * <SwitchRoot checked={enabled} onCheckedChange={setEnabled}>
 *   <SwitchThumb />
 * </SwitchRoot>
 *
 * @usage
 * - Settings toggles (dark mode, notifications)
 * - Feature flags
 * - Binary preferences
 * - Replacing checkboxes for immediate actions
 * - Visibility toggles
 *
 * @best-practices
 * - Use for immediate actions, not form submissions
 * - Always include clear labels
 * - Provide visual feedback for state changes
 * - Consider loading states for async operations
 * - Use consistent positioning (left/right) across your app
 * - Avoid for destructive actions without confirmation
 */

import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
    className?: string;
    thumbClassName?: string;
}

interface SwitchWithLabelProps extends SwitchProps {
    label?: React.ReactNode;
    description?: React.ReactNode;
    labelPosition?: "left" | "right";
    id?: string;
}

export const Switch = React.forwardRef<React.ElementRef<typeof BaseSwitch.Root>, SwitchProps>(
    ({ className, thumbClassName, children, ...props }, ref) => {
        return (
            <BaseSwitch.Root
                ref={ref}
                className={twMerge(
                    "relative flex h-6 w-10 rounded-full bg-gradient-to-r from-neutral-700 from-35% to-neutral-200 to-65% bg-[length:6.5rem_100%] bg-[100%_0%] bg-no-repeat p-px shadow-[inset_0_1.5px_2px] shadow-neutral-200/60 outline -outline-offset-1 outline-neutral-200/60 transition-[background-position,box-shadow] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full before:outline-offset-2 before:outline-neutral-800 focus-visible:before:inset-0 focus-visible:before:outline active:bg-neutral-100 data-[checked]:bg-[0%_0%] data-[checked]:active:bg-neutral-500 dark:from-neutral-500 dark:shadow-black/75 dark:outline-white/15 dark:data-[checked]:shadow-none",
                    className,
                )}
                {...props}
            >
                {children || (
                    <BaseSwitch.Thumb
                        className={twMerge(
                            "aspect-square h-full rounded-full bg-white shadow-[0_0_1px_1px,0_1px_1px,1px_2px_4px_-1px] shadow-neutral-100/60 transition-transform duration-150 data-[checked]:translate-x-4 dark:shadow-black/25",
                            thumbClassName,
                        )}
                    />
                )}
            </BaseSwitch.Root>
        );
    },
);

Switch.displayName = "Switch";

// Component with built-in label support
export const SwitchWithLabel = React.forwardRef<React.ElementRef<typeof BaseSwitch.Root>, SwitchWithLabelProps>(
    ({ label, description, labelPosition = "right", id, className, thumbClassName, children, ...props }, ref) => {
        const generatedId = React.useId();
        const switchId = id || generatedId;

        const switchElement = (
            <Switch ref={ref} id={switchId} className={className} thumbClassName={thumbClassName} {...props}>
                {children}
            </Switch>
        );

        if (!label) {
            return switchElement;
        }

        return (
            <div className="flex items-center gap-3">
                {labelPosition === "left" && (
                    <label htmlFor={switchId} className="cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{label}</span>
                            {description && (
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">{description}</span>
                            )}
                        </div>
                    </label>
                )}

                {switchElement}

                {labelPosition === "right" && (
                    <label htmlFor={switchId} className="cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{label}</span>
                            {description && (
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">{description}</span>
                            )}
                        </div>
                    </label>
                )}
            </div>
        );
    },
);

SwitchWithLabel.displayName = "SwitchWithLabel";

// Export sub-components for advanced usage
export const SwitchRoot = BaseSwitch.Root;
export const SwitchThumb = BaseSwitch.Thumb;
