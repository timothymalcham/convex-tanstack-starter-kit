import * as React from "react";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import { Checkbox } from "@base-ui-components/react/checkbox";
import { twMerge } from "tailwind-merge";

/**
 * CheckboxGroup Component
 *
 * Manages shared state for multiple checkboxes, enabling collective selection.
 *
 * @example
 * ```jsx
 * import { CheckboxGroup, CheckboxItem } from '@/components/ui/CheckboxGroup'
 * import { Field } from '@/components/ui/Field'
 *
 * // Basic checkbox group
 * const [selectedValues, setSelectedValues] = React.useState(['option1'])
 *
 * <CheckboxGroup value={selectedValues} onValueChange={setSelectedValues}>
 *   <div className="space-y-2">
 *     <CheckboxItem value="option1">Option 1</CheckboxItem>
 *     <CheckboxItem value="option2">Option 2</CheckboxItem>
 *     <CheckboxItem value="option3">Option 3</CheckboxItem>
 *   </div>
 * </CheckboxGroup>
 *
 * // With label and description
 * <Field.Root>
 *   <Field.Label>Preferences</Field.Label>
 *   <Field.Description>Select your communication preferences</Field.Description>
 *   <CheckboxGroup defaultValue={['email']}>
 *     <div className="space-y-2">
 *       <CheckboxItem value="email">
 *         Email notifications
 *       </CheckboxItem>
 *       <CheckboxItem value="sms">
 *         SMS notifications
 *       </CheckboxItem>
 *       <CheckboxItem value="push">
 *         Push notifications
 *       </CheckboxItem>
 *     </div>
 *   </CheckboxGroup>
 * </Field.Root>
 *
 * // Disabled state
 * <CheckboxGroup disabled>
 *   <div className="space-y-2">
 *     <CheckboxItem value="option1">Disabled Option 1</CheckboxItem>
 *     <CheckboxItem value="option2">Disabled Option 2</CheckboxItem>
 *   </div>
 * </CheckboxGroup>
 *
 * // Different sizes
 * <div className="space-y-4">
 *   <CheckboxGroup>
 *     <CheckboxItem value="small" size="sm">Small checkbox</CheckboxItem>
 *   </CheckboxGroup>
 *   <CheckboxGroup>
 *     <CheckboxItem value="medium" size="md">Medium checkbox (default)</CheckboxItem>
 *   </CheckboxGroup>
 *   <CheckboxGroup>
 *     <CheckboxItem value="large" size="lg">Large checkbox</CheckboxItem>
 *   </CheckboxGroup>
 * </div>
 * ```
 */

interface CheckboxGroupProps extends React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup> {
    className?: string;
    children?: React.ReactNode;
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseCheckboxGroup ref={ref} className={twMerge("group", className)} {...props}>
                {children}
            </BaseCheckboxGroup>
        );
    },
);
CheckboxGroup.displayName = "CheckboxGroup";

interface CheckboxItemProps {
    value: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    size?: "sm" | "md" | "lg";
    children?: React.ReactNode;
}

export const CheckboxItem = React.forwardRef<HTMLLabelElement, CheckboxItemProps>(
    ({ value, name, disabled, className, size = "md", children }, ref) => {
        const sizeStyles = {
            sm: "size-4",
            md: "size-5",
            lg: "size-6",
        };

        return (
            <label
                ref={ref}
                className={twMerge(
                    "flex items-center gap-2 cursor-pointer",
                    "hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded p-1 -m-1",
                    "transition-colors duration-150",
                    disabled && "cursor-not-allowed opacity-50",
                    className,
                )}
            >
                <Checkbox.Root
                    name={name}
                    value={value}
                    disabled={disabled}
                    className={twMerge(
                        "flex items-center justify-center rounded border border-gray-300 dark:border-gray-700",
                        "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                        "focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400",
                        "data-[checked]:bg-blue-600 data-[checked]:border-blue-600",
                        "data-[checked]:dark:bg-blue-500 data-[checked]:dark:border-blue-500",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "transition-colors duration-150",
                        sizeStyles[size],
                    )}
                >
                    <Checkbox.Indicator className="flex text-white data-[unchecked]:hidden">
                        <CheckIcon
                            className={twMerge(
                                size === "sm" && "size-3",
                                size === "md" && "size-3.5",
                                size === "lg" && "size-4",
                            )}
                        />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                {children && (
                    <span
                        className={twMerge(
                            "select-none font-medium leading-none",
                            size === "sm" && "text-sm",
                            size === "md" && "text-sm",
                            size === "lg" && "text-base",
                        )}
                    >
                        {children}
                    </span>
                )}
            </label>
        );
    },
);
CheckboxItem.displayName = "CheckboxItem";

function CheckIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg fill="currentColor" viewBox="0 0 10 10" {...props}>
            <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
        </svg>
    );
}
