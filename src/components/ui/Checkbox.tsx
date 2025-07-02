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
 * // With label (preferred - accessible)
 * <CheckboxWithLabel label="I agree to the terms and conditions" />
 *
 * // With label and description
 * <CheckboxWithLabel
 *   label="Subscribe to newsletter"
 *   description="Get weekly updates about new features and tips"
 * />
 *
 * // With label using Field component (manual approach)
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

interface CheckboxWithLabelProps extends CheckboxRootProps {
    label?: React.ReactNode;
    description?: React.ReactNode;
    id?: string;
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
                    "rounded-md border-2 border-neutral-200/80 dark:border-neutral-700/80 shadow-sm",
                    "bg-gradient-to-b from-white to-neutral-50/30 dark:from-neutral-900 dark:to-neutral-800/30",
                    "transition-all duration-200 ease-out",
                    "hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400/30 focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "data-[checked]:bg-gradient-to-b data-[checked]:from-neutral-800 data-[checked]:to-neutral-900 data-[checked]:border-neutral-800",
                    "data-[checked]:hover:from-neutral-700 data-[checked]:hover:to-neutral-800 data-[checked]:hover:border-neutral-700 data-[checked]:shadow-lg",
                    "data-[indeterminate]:bg-gradient-to-b data-[indeterminate]:from-neutral-800 data-[indeterminate]:to-neutral-900 data-[indeterminate]:border-neutral-800",
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

// Component with built-in label support
export const CheckboxWithLabel = React.forwardRef<HTMLButtonElement, CheckboxWithLabelProps>(
    ({ label, description, id, className, size = "md", children, ...props }, ref) => {
        const generatedId = React.useId();
        const checkboxId = id || generatedId;

        const checkboxElement = (
            <CheckboxRoot ref={ref} id={checkboxId} className={className} size={size} {...props}>
                {children || <CheckboxIndicator />}
            </CheckboxRoot>
        );

        if (!label) {
            return checkboxElement;
        }

        return (
            <div className="flex items-start gap-2">
                {checkboxElement}
                <label htmlFor={checkboxId} className="cursor-pointer">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {label}
                        </span>
                        {description && (
                            <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{description}</span>
                        )}
                    </div>
                </label>
            </div>
        );
    },
);

CheckboxWithLabel.displayName = "CheckboxWithLabel";

export const Checkbox = {
    Root: CheckboxRoot,
    Indicator: CheckboxIndicator,
};
