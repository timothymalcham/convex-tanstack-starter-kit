import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Radio Component
 *
 * A customizable radio button for forms with support for radio groups,
 * allowing users to select one option from a set of mutually exclusive choices.
 *
 * @example
 * ```jsx
 * import { RadioGroup, Radio } from '@/components/ui/Radio'
 * import { Field } from '@/components/ui/Field'
 *
 * // Basic radio group with labels (preferred - accessible)
 * <RadioGroup.Root defaultValue="medium">
 *   <div className="space-y-2">
 *     <RadioWithLabel value="small" label="Small" />
 *     <RadioWithLabel value="medium" label="Medium" />
 *     <RadioWithLabel value="large" label="Large" />
 *   </div>
 * </RadioGroup.Root>
 *
 * // With descriptions
 * <RadioGroup.Root defaultValue="medium">
 *   <div className="space-y-3">
 *     <RadioWithLabel
 *       value="small"
 *       label="Small"
 *       description="Perfect for simple projects"
 *     />
 *     <RadioWithLabel
 *       value="medium"
 *       label="Medium"
 *       description="Good for most use cases"
 *     />
 *     <RadioWithLabel
 *       value="large"
 *       label="Large"
 *       description="Enterprise-grade features"
 *     />
 *   </div>
 * </RadioGroup.Root>
 *
 * // Manual approach (legacy)
 * <RadioGroup.Root defaultValue="medium">
 *   <div className="space-y-2">
 *     <Radio.Root value="small">
 *       <Radio.Indicator />
 *       <span className="ml-2">Small</span>
 *     </Radio.Root>
 *     <Radio.Root value="medium">
 *       <Radio.Indicator />
 *       <span className="ml-2">Medium</span>
 *     </Radio.Root>
 *     <Radio.Root value="large">
 *       <Radio.Indicator />
 *       <span className="ml-2">Large</span>
 *     </Radio.Root>
 *   </div>
 * </RadioGroup.Root>
 *
 * // With Field component for forms
 * <Field.Root>
 *   <Field.Label>Choose your plan</Field.Label>
 *   <RadioGroup.Root defaultValue="pro">
 *     <div className="space-y-3 mt-2">
 *       <Radio.Root value="basic" className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50">
 *         <Radio.Indicator />
 *         <div>
 *           <div className="font-medium">Basic Plan</div>
 *           <div className="text-sm text-gray-600">$9/month • Up to 5 projects</div>
 *         </div>
 *       </Radio.Root>
 *
 *       <Radio.Root value="pro" className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50">
 *         <Radio.Indicator />
 *         <div>
 *           <div className="font-medium">Pro Plan</div>
 *           <div className="text-sm text-gray-600">$29/month • Unlimited projects</div>
 *         </div>
 *       </Radio.Root>
 *
 *       <Radio.Root value="enterprise" className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50">
 *         <Radio.Indicator />
 *         <div>
 *           <div className="font-medium">Enterprise Plan</div>
 *           <div className="text-sm text-gray-600">$99/month • Advanced features</div>
 *         </div>
 *       </Radio.Root>
 *     </div>
 *   </RadioGroup.Root>
 *   <Field.Description>
 *     You can change your plan anytime
 *   </Field.Description>
 * </Field.Root>
 *
 * // Controlled radio group
 * const [selectedColor, setSelectedColor] = React.useState('blue')
 *
 * <div className="space-y-3">
 *   <label className="text-sm font-medium">Choose a color</label>
 *   <RadioGroup.Root value={selectedColor} onValueChange={setSelectedColor}>
 *     <div className="flex gap-4">
 *       <Radio.Root value="red" className="flex items-center gap-2">
 *         <Radio.Indicator />
 *         <div className="flex items-center gap-2">
 *           <div className="w-4 h-4 bg-red-500 rounded"></div>
 *           <span>Red</span>
 *         </div>
 *       </Radio.Root>
 *
 *       <Radio.Root value="blue" className="flex items-center gap-2">
 *         <Radio.Indicator />
 *         <div className="flex items-center gap-2">
 *           <div className="w-4 h-4 bg-blue-500 rounded"></div>
 *           <span>Blue</span>
 *         </div>
 *       </Radio.Root>
 *
 *       <Radio.Root value="green" className="flex items-center gap-2">
 *         <Radio.Indicator />
 *         <div className="flex items-center gap-2">
 *           <div className="w-4 h-4 bg-green-500 rounded"></div>
 *           <span>Green</span>
 *         </div>
 *       </Radio.Root>
 *     </div>
 *   </RadioGroup.Root>
 *
 *   <div className="text-sm text-gray-600">
 *     Selected: {selectedColor}
 *   </div>
 * </div>
 *
 * // Radio cards for settings
 * <RadioGroup.Root defaultValue="auto">
 *   <div className="grid grid-cols-1 gap-3">
 *     <Radio.Root value="light" className="flex items-center gap-3 p-4 border-2 rounded-lg hover:border-blue-200 data-[checked]:border-blue-500 data-[checked]:bg-blue-50">
 *       <Radio.Indicator />
 *       <div className="flex items-center gap-3">
 *         <div className="w-8 h-8 bg-white border rounded flex items-center justify-center">
 *           ☀️
 *         </div>
 *         <div>
 *           <div className="font-medium">Light Mode</div>
 *           <div className="text-sm text-gray-600">Clean and bright interface</div>
 *         </div>
 *       </div>
 *     </Radio.Root>
 *
 *     <Radio.Root value="dark" className="flex items-center gap-3 p-4 border-2 rounded-lg hover:border-blue-200 data-[checked]:border-blue-500 data-[checked]:bg-blue-50">
 *       <Radio.Indicator />
 *       <div className="flex items-center gap-3">
 *         <div className="w-8 h-8 bg-gray-900 border rounded flex items-center justify-center">
 *           🌙
 *         </div>
 *         <div>
 *           <div className="font-medium">Dark Mode</div>
 *           <div className="text-sm text-gray-600">Easy on the eyes</div>
 *         </div>
 *       </div>
 *     </Radio.Root>
 *
 *     <Radio.Root value="auto" className="flex items-center gap-3 p-4 border-2 rounded-lg hover:border-blue-200 data-[checked]:border-blue-500 data-[checked]:bg-blue-50">
 *       <Radio.Indicator />
 *       <div className="flex items-center gap-3">
 *         <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-blue-900 border rounded flex items-center justify-center">
 *           🌗
 *         </div>
 *         <div>
 *           <div className="font-medium">Auto Mode</div>
 *           <div className="text-sm text-gray-600">Follow system preference</div>
 *         </div>
 *       </div>
 *     </Radio.Root>
 *   </div>
 * </RadioGroup.Root>
 *
 * // Survey/questionnaire style
 * <div className="space-y-6">
 *   <div>
 *     <h3 className="font-medium mb-3">How would you rate our service?</h3>
 *     <RadioGroup.Root>
 *       <div className="space-y-2">
 *         {[
 *           { value: '5', label: 'Excellent', emoji: '😍' },
 *           { value: '4', label: 'Good', emoji: '😊' },
 *           { value: '3', label: 'Average', emoji: '😐' },
 *           { value: '2', label: 'Poor', emoji: '😔' },
 *           { value: '1', label: 'Terrible', emoji: '😞' },
 *         ].map((option) => (
 *           <Radio.Root key={option.value} value={option.value} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
 *             <Radio.Indicator />
 *             <span className="text-xl">{option.emoji}</span>
 *             <span>{option.label}</span>
 *           </Radio.Root>
 *         ))}
 *       </div>
 *     </RadioGroup.Root>
 *   </div>
 * </div>
 *
 * // Disabled options
 * <RadioGroup.Root defaultValue="standard">
 *   <div className="space-y-2">
 *     <Radio.Root value="basic">
 *       <Radio.Indicator />
 *       <span className="ml-2">Basic Shipping (5-7 days)</span>
 *     </Radio.Root>
 *
 *     <Radio.Root value="standard">
 *       <Radio.Indicator />
 *       <span className="ml-2">Standard Shipping (3-5 days)</span>
 *     </Radio.Root>
 *
 *     <Radio.Root value="express" disabled>
 *       <Radio.Indicator />
 *       <span className="ml-2">Express Shipping (1-2 days) - Not available</span>
 *     </Radio.Root>
 *
 *     <Radio.Root value="overnight" disabled>
 *       <Radio.Indicator />
 *       <span className="ml-2">Overnight Shipping - Not available</span>
 *     </Radio.Root>
 *   </div>
 * </RadioGroup.Root>
 *
 * // In a form with validation
 * const [paymentMethod, setPaymentMethod] = React.useState('')
 * const [error, setError] = React.useState('')
 *
 * const handleSubmit = (e) => {
 *   e.preventDefault()
 *   if (!paymentMethod) {
 *     setError('Please select a payment method')
 *     return
 *   }
 *   setError('')
 *   // Process form
 * }
 *
 * <form onSubmit={handleSubmit} className="space-y-4">
 *   <Field.Root>
 *     <Field.Label required>Payment Method</Field.Label>
 *     <RadioGroup.Root value={paymentMethod} onValueChange={setPaymentMethod}>
 *       <div className="space-y-3 mt-2">
 *         <Radio.Root value="credit" className="flex items-center gap-3 p-3 border rounded">
 *           <Radio.Indicator />
 *           <div className="flex items-center gap-2">
 *             <span>💳</span>
 *             <span>Credit Card</span>
 *           </div>
 *         </Radio.Root>
 *
 *         <Radio.Root value="paypal" className="flex items-center gap-3 p-3 border rounded">
 *           <Radio.Indicator />
 *           <div className="flex items-center gap-2">
 *             <span>🅿️</span>
 *             <span>PayPal</span>
 *           </div>
 *         </Radio.Root>
 *
 *         <Radio.Root value="bank" className="flex items-center gap-3 p-3 border rounded">
 *           <Radio.Indicator />
 *           <div className="flex items-center gap-2">
 *             <span>🏦</span>
 *             <span>Bank Transfer</span>
 *           </div>
 *         </Radio.Root>
 *       </div>
 *     </RadioGroup.Root>
 *     {error && <Field.Error>{error}</Field.Error>}
 *   </Field.Root>
 *
 *   <button
 *     type="submit"
 *     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
 *   >
 *     Continue
 *   </button>
 * </form>
 * ```
 */

interface RadioGroupRootProps extends React.ComponentPropsWithoutRef<typeof BaseRadioGroup> {
    className?: string;
}

const RadioGroupRoot = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(({ className, ...props }, ref) => {
    return <BaseRadioGroup ref={ref} className={twMerge("group", className)} {...props} />;
});
RadioGroupRoot.displayName = "RadioGroup.Root";

interface RadioRootProps extends React.ComponentPropsWithoutRef<typeof BaseRadio.Root> {
    className?: string;
    size?: "sm" | "md" | "lg";
}

interface RadioWithLabelProps extends RadioRootProps {
    label?: React.ReactNode;
    description?: React.ReactNode;
    id?: string;
}

const RadioRoot = React.forwardRef<HTMLButtonElement, RadioRootProps>(({ className, size = "md", ...props }, ref) => {
    return (
        <BaseRadio.Root
            ref={ref}
            className={twMerge(
                "group flex cursor-pointer items-center gap-2",
                "focus:outline-hidden focus:ring-2 focus:ring-neutral-400/30 focus:ring-offset-2 rounded",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition-colors duration-150",
                className,
            )}
            data-size={size}
            {...props}
        />
    );
});
RadioRoot.displayName = "Radio.Root";

interface RadioIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator> {
    className?: string;
    size?: "sm" | "md" | "lg";
}

const RadioIndicator = React.forwardRef<HTMLSpanElement, RadioIndicatorProps>(
    ({ className, size = "md", ...props }, ref) => {
        const sizeStyles = {
            sm: "h-4 w-4",
            md: "h-5 w-5",
            lg: "h-6 w-6",
        };

        const dotSizeStyles = {
            sm: "h-2 w-2",
            md: "h-2.5 w-2.5",
            lg: "h-3 w-3",
        };

        return (
            <span
                ref={ref}
                className={twMerge(
                    "relative flex shrink-0 items-center justify-center rounded-full border-2",
                    "border-neutral-200/80 bg-gradient-to-b from-white to-neutral-50/30 transition-all duration-200 ease-out shadow-sm",
                    "group-hover:border-neutral-300 group-hover:shadow-md",
                    "group-focus:border-neutral-400",
                    "group-data-[checked]:border-neutral-800 group-data-[checked]:bg-gradient-to-b group-data-[checked]:from-neutral-800 group-data-[checked]:to-neutral-900 group-data-[checked]:shadow-lg",
                    "group-disabled:cursor-not-allowed group-disabled:opacity-50",
                    "dark:border-neutral-700/80 dark:from-neutral-900 dark:to-neutral-800/30",
                    "dark:group-hover:border-neutral-600",
                    "dark:group-data-[checked]:border-neutral-700 dark:group-data-[checked]:from-neutral-700 dark:group-data-[checked]:to-neutral-800",
                    sizeStyles[size],
                    className,
                )}
                {...props}
            >
                <BaseRadio.Indicator>
                    <span
                        className={twMerge(
                            "rounded-full bg-white transition-opacity duration-150",
                            dotSizeStyles[size],
                        )}
                    />
                </BaseRadio.Indicator>
            </span>
        );
    },
);
RadioIndicator.displayName = "Radio.Indicator";

// Component with built-in label support
export const RadioWithLabel = React.forwardRef<HTMLButtonElement, RadioWithLabelProps>(
    ({ label, description, id, className, size = "md", children, ...props }, ref) => {
        const generatedId = React.useId();
        const radioId = id || generatedId;

        const radioElement = (
            <RadioRoot ref={ref} id={radioId} className={className} size={size} {...props}>
                {children || <RadioIndicator size={size} />}
            </RadioRoot>
        );

        if (!label) {
            return radioElement;
        }

        return (
            <label htmlFor={radioId} className="cursor-pointer">
                <div className="flex items-start gap-3">
                    {radioElement}
                    <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {label}
                        </span>
                        {description && (
                            <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{description}</span>
                        )}
                    </div>
                </div>
            </label>
        );
    },
);

RadioWithLabel.displayName = "RadioWithLabel";

export const RadioGroup = {
    Root: RadioGroupRoot,
};

export const Radio = {
    Root: RadioRoot,
    Indicator: RadioIndicator,
};
