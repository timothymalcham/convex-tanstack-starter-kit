import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Checkbox Component
 *
 * A customizable checkbox for forms with support for indeterminate state.
 *
 * @example
 * ```jsx
 * import { Checkbox } from '@/components/ui/Checkbox'
 *
 * // Basic uncontrolled checkbox
 * <Checkbox.Root>
 *   <Checkbox.Indicator />
 * </Checkbox.Root>
 *
 * // Controlled checkbox
 * const [checked, setChecked] = React.useState(false)
 *
 * <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
 *   <Checkbox.Indicator />
 * </Checkbox.Root>
 *
 * // With label using Field component
 * <Field.Root>
 *   <div className="flex items-center gap-2">
 *     <Checkbox.Root id="terms">
 *       <Checkbox.Indicator />
 *     </Checkbox.Root>
 *     <Field.Label htmlFor="terms">
 *       I agree to the terms and conditions
 *     </Field.Label>
 *   </div>
 * </Field.Root>
 *
 * // Indeterminate state
 * <Checkbox.Root indeterminate>
 *   <Checkbox.Indicator />
 * </Checkbox.Root>
 *
 * // Disabled state
 * <Checkbox.Root disabled>
 *   <Checkbox.Indicator />
 * </Checkbox.Root>
 *
 * // In a form with different sizes
 * <form>
 *   <Checkbox.Root name="subscribe" size="sm">
 *     <Checkbox.Indicator />
 *   </Checkbox.Root>
 *   <Checkbox.Root name="notifications" size="lg">
 *     <Checkbox.Indicator />
 *   </Checkbox.Root>
 * </form>
 * ```
 */

interface CheckboxRootProps extends React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
    className?: string;
    size?: "sm" | "md" | "lg";
}

const CheckboxRoot = React.forwardRef<HTMLButtonElement, CheckboxRootProps>(
    ({ className, size = "md", ...props }, ref) => {
        const sizeStyles = {
            sm: "h-4 w-4",
            md: "h-5 w-5",
            lg: "h-6 w-6",
        };

        return (
            <BaseCheckbox.Root
                ref={ref}
                className={twMerge(
                    "peer inline-flex shrink-0 cursor-pointer items-center justify-center",
                    "rounded border-2 border-gray-300 dark:border-gray-700",
                    "bg-white dark:bg-gray-950",
                    "transition-colors duration-150",
                    "hover:border-gray-400 dark:hover:border-gray-600",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "data-[checked]:bg-blue-600 data-[checked]:border-blue-600",
                    "data-[checked]:hover:bg-blue-700 data-[checked]:hover:border-blue-700",
                    "data-[indeterminate]:bg-blue-600 data-[indeterminate]:border-blue-600",
                    sizeStyles[size],
                    className,
                )}
                {...props}
            />
        );
    },
);
CheckboxRoot.displayName = "Checkbox.Root";

interface CheckboxIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseCheckbox.Indicator> {
    className?: string;
}

const CheckboxIndicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(({ className, ...props }, ref) => {
    return (
        <BaseCheckbox.Indicator
            ref={ref}
            className={twMerge(
                "pointer-events-none flex items-center justify-center text-current",
                "text-white dark:text-white",
                "data-[unchecked]:opacity-0",
                "data-[checked]:opacity-100",
                "data-[indeterminate]:opacity-100",
                className,
            )}
            {...props}
        >
            {props.children || (
                <>
                    {/* Checkmark icon */}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="data-[indeterminate]:hidden"
                    >
                        <path
                            d="M10.5 3.5L4.5 9.5L1.5 6.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {/* Indeterminate icon (minus) */}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden data-[indeterminate]:block"
                    >
                        <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </>
            )}
        </BaseCheckbox.Indicator>
    );
});
CheckboxIndicator.displayName = "Checkbox.Indicator";

export const Checkbox = {
    Root: CheckboxRoot,
    Indicator: CheckboxIndicator,
};
