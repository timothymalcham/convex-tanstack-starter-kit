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
 * // With label
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

export const Switch = React.forwardRef<React.ElementRef<typeof BaseSwitch.Root>, SwitchProps>(
    ({ className, thumbClassName, children, ...props }, ref) => {
        return (
            <BaseSwitch.Root
                ref={ref}
                className={twMerge(
                    "relative flex h-6 w-10 rounded-full bg-gradient-to-r from-gray-700 from-35% to-gray-200 to-65% bg-[length:6.5rem_100%] bg-[100%_0%] bg-no-repeat p-px shadow-[inset_0_1.5px_2px] shadow-gray-200 outline outline-1 -outline-offset-1 outline-gray-200 transition-[background-position,box-shadow] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full before:outline-offset-2 before:outline-blue-800 focus-visible:before:inset-0 focus-visible:before:outline focus-visible:before:outline-2 active:bg-gray-100 data-[checked]:bg-[0%_0%] data-[checked]:active:bg-gray-500 dark:from-gray-500 dark:shadow-black/75 dark:outline-white/15 dark:data-[checked]:shadow-none",
                    className,
                )}
                {...props}
            >
                {children || (
                    <BaseSwitch.Thumb
                        className={twMerge(
                            "aspect-square h-full rounded-full bg-white shadow-[0_0_1px_1px,0_1px_1px,1px_2px_4px_-1px] shadow-gray-100 transition-transform duration-150 data-[checked]:translate-x-4 dark:shadow-black/25",
                            thumbClassName,
                        )}
                    />
                )}
            </BaseSwitch.Root>
        );
    },
);

Switch.displayName = "Switch";

// Export sub-components for advanced usage
export const SwitchRoot = BaseSwitch.Root;
export const SwitchThumb = BaseSwitch.Thumb;
