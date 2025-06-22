import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import { twMerge } from "tailwind-merge";

/**
 * NumberField Component
 *
 * A numeric input field with increment/decrement buttons and advanced interaction features
 * like scrub areas for precise value control. Perfect for quantities, measurements, settings,
 * and any numeric data entry.
 *
 * @example
 * ```jsx
 * import { NumberField } from '@/components/ui/NumberField'
 * import { Field } from '@/components/ui/Field'
 *
 * // Basic number field
 * <NumberField.Root defaultValue={100}>
 *   <NumberField.Group>
 *     <NumberField.Decrement />
 *     <NumberField.Input />
 *     <NumberField.Increment />
 *   </NumberField.Group>
 * </NumberField.Root>
 *
 * // With Field component for forms
 * <Field.Root>
 *   <Field.Label>Quantity</Field.Label>
 *   <NumberField.Root defaultValue={1} min={1} max={99}>
 *     <NumberField.Group>
 *       <NumberField.Decrement />
 *       <NumberField.Input />
 *       <NumberField.Increment />
 *     </NumberField.Group>
 *   </NumberField.Root>
 *   <Field.Description>Enter quantity (1-99)</Field.Description>
 * </Field.Root>
 *
 * // With scrub area for precise control
 * <Field.Root>
 *   <Field.Label>
 *     <NumberField.Root defaultValue={50} min={0} max={100}>
 *       <NumberField.ScrubArea>
 *         Temperature:
 *         <NumberField.ScrubAreaCursor />
 *       </NumberField.ScrubArea>
 *       <NumberField.Group>
 *         <NumberField.Decrement />
 *         <NumberField.Input />
 *         <NumberField.Increment />
 *       </NumberField.Group>
 *     </NumberField.Root>
 *   </Field.Label>
 * </Field.Root>
 *
 * // Currency input with formatting
 * <NumberField.Root
 *   defaultValue={29.99}
 *   step={0.01}
 *   format={{
 *     style: 'currency',
 *     currency: 'USD'
 *   }}
 * >
 *   <div className="space-y-2">
 *     <label className="text-sm font-medium">Price</label>
 *     <NumberField.Group>
 *       <NumberField.Decrement />
 *       <NumberField.Input />
 *       <NumberField.Increment />
 *     </NumberField.Group>
 *   </div>
 * </NumberField.Root>
 *
 * // Percentage input
 * <NumberField.Root
 *   defaultValue={75}
 *   min={0}
 *   max={100}
 *   format={{
 *     style: 'percent',
 *     minimumFractionDigits: 0
 *   }}
 * >
 *   <div className="space-y-2">
 *     <label className="text-sm font-medium">Completion</label>
 *     <NumberField.Group>
 *       <NumberField.Decrement />
 *       <NumberField.Input />
 *       <NumberField.Increment />
 *     </NumberField.Group>
 *   </div>
 * </NumberField.Root>
 *
 * // Large step controls for ranges
 * <NumberField.Root
 *   defaultValue={1000}
 *   step={10}
 *   largeStep={100}
 *   min={0}
 *   max={10000}
 * >
 *   <div className="space-y-2">
 *     <label className="text-sm font-medium">Budget ($)</label>
 *     <NumberField.Group>
 *       <NumberField.Decrement />
 *       <NumberField.Input />
 *       <NumberField.Increment />
 *     </NumberField.Group>
 *     <p className="text-xs text-gray-500">
 *       Use Shift+click for $100 increments
 *     </p>
 *   </div>
 * </NumberField.Root>
 *
 * // Compact number field for tables/lists
 * <NumberField.Root defaultValue={5} min={1} max={20} size="sm">
 *   <NumberField.Group>
 *     <NumberField.Decrement />
 *     <NumberField.Input />
 *     <NumberField.Increment />
 *   </NumberField.Group>
 * </NumberField.Root>
 *
 * // Controlled number field
 * const [quantity, setQuantity] = React.useState(1)
 *
 * <div className="space-y-4">
 *   <NumberField.Root
 *     value={quantity}
 *     onValueChange={setQuantity}
 *     min={1}
 *     max={10}
 *   >
 *     <div className="space-y-2">
 *       <label className="text-sm font-medium">Items</label>
 *       <NumberField.Group>
 *         <NumberField.Decrement />
 *         <NumberField.Input />
 *         <NumberField.Increment />
 *       </NumberField.Group>
 *     </div>
 *   </NumberField.Root>
 *
 *   <div className="text-sm text-gray-600">
 *     Total: ${(quantity * 19.99).toFixed(2)}
 *   </div>
 * </div>
 *
 * // Disabled and readonly states
 * <div className="space-y-4">
 *   <NumberField.Root value={42} disabled>
 *     <div className="space-y-2">
 *       <label className="text-sm font-medium">Disabled Field</label>
 *       <NumberField.Group>
 *         <NumberField.Decrement />
 *         <NumberField.Input />
 *         <NumberField.Increment />
 *       </NumberField.Group>
 *     </div>
 *   </NumberField.Root>
 *
 *   <NumberField.Root value={100} readOnly>
 *     <div className="space-y-2">
 *       <label className="text-sm font-medium">Read Only Field</label>
 *       <NumberField.Group>
 *         <NumberField.Decrement />
 *         <NumberField.Input />
 *         <NumberField.Increment />
 *       </NumberField.Group>
 *     </div>
 *   </NumberField.Root>
 * </div>
 * ```
 */

interface NumberFieldRootProps extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Root> {
    className?: string;
    size?: "sm" | "md" | "lg";
}

const NumberFieldRoot = React.forwardRef<HTMLDivElement, NumberFieldRootProps>(
    ({ className, size = "md", ...props }, ref) => {
        return (
            <BaseNumberField.Root ref={ref} className={twMerge("relative", className)} data-size={size} {...props} />
        );
    },
);
NumberFieldRoot.displayName = "NumberField.Root";

interface NumberFieldScrubAreaProps extends React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubArea> {
    className?: string;
}

const NumberFieldScrubArea = React.forwardRef<HTMLSpanElement, NumberFieldScrubAreaProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseNumberField.ScrubArea
                ref={ref}
                className={twMerge(
                    "cursor-ew-resize select-none text-sm font-medium text-gray-700 dark:text-gray-300",
                    "hover:text-blue-600 dark:hover:text-blue-400",
                    "data-[scrubbing]:text-blue-600 dark:data-[scrubbing]:text-blue-400",
                    className,
                )}
                {...props}
            />
        );
    },
);
NumberFieldScrubArea.displayName = "NumberField.ScrubArea";

interface NumberFieldScrubAreaCursorProps
    extends React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor> {
    className?: string;
}

const NumberFieldScrubAreaCursor = React.forwardRef<HTMLDivElement, NumberFieldScrubAreaCursorProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseNumberField.ScrubAreaCursor
                ref={ref}
                className={twMerge(
                    "pointer-events-none fixed z-50 flex h-6 w-6 items-center justify-center",
                    "rounded-full bg-blue-600 text-white shadow-lg",
                    "data-[starting-style]:scale-0 data-[ending-style]:scale-0",
                    className,
                )}
                {...props}
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </BaseNumberField.ScrubAreaCursor>
        );
    },
);
NumberFieldScrubAreaCursor.displayName = "NumberField.ScrubAreaCursor";

interface NumberFieldGroupProps extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Group> {
    className?: string;
}

const NumberFieldGroup = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(({ className, ...props }, ref) => {
    return (
        <BaseNumberField.Group
            ref={ref}
            className={twMerge(
                "relative flex items-center",
                "rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950",
                "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20",
                "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
                className,
            )}
            {...props}
        />
    );
});
NumberFieldGroup.displayName = "NumberField.Group";

interface NumberFieldInputProps extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Input> {
    className?: string;
}

const NumberFieldInput = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(({ className, ...props }, ref) => {
    return (
        <BaseNumberField.Input
            ref={ref}
            className={twMerge(
                "flex-1 border-0 bg-transparent px-3 py-2 text-center text-sm",
                "text-gray-900 placeholder:text-gray-400",
                "dark:text-gray-100 dark:placeholder:text-gray-500",
                "focus:outline-hidden",
                "data-[disabled]:cursor-not-allowed",
                'data-[size="sm"]:h-8 data-[size="sm"]:px-2 data-[size="sm"]:text-xs',
                'data-[size="md"]:h-10',
                'data-[size="lg"]:h-12 data-[size="lg"]:px-4',
                className,
            )}
            {...props}
        />
    );
});
NumberFieldInput.displayName = "NumberField.Input";

interface NumberFieldButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    className?: string;
}

const NumberFieldDecrement = React.forwardRef<HTMLButtonElement, NumberFieldButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseNumberField.Decrement
                ref={ref}
                className={twMerge(
                    "flex items-center justify-center border-r border-gray-300 dark:border-gray-700",
                    "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700",
                    "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
                    "transition-colors duration-150",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    'data-[size="sm"]:w-7 data-[size="sm"]:h-8',
                    'data-[size="md"]:w-9 data-[size="md"]:h-10',
                    'data-[size="lg"]:w-11 data-[size="lg"]:h-12',
                    "rounded-l-md",
                    className,
                )}
                {...props}
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </BaseNumberField.Decrement>
        );
    },
);
NumberFieldDecrement.displayName = "NumberField.Decrement";

const NumberFieldIncrement = React.forwardRef<HTMLButtonElement, NumberFieldButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseNumberField.Increment
                ref={ref}
                className={twMerge(
                    "flex items-center justify-center border-l border-gray-300 dark:border-gray-700",
                    "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700",
                    "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
                    "transition-colors duration-150",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    'data-[size="sm"]:w-7 data-[size="sm"]:h-8',
                    'data-[size="md"]:w-9 data-[size="md"]:h-10',
                    'data-[size="lg"]:w-11 data-[size="lg"]:h-12',
                    "rounded-r-md",
                    className,
                )}
                {...props}
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </BaseNumberField.Increment>
        );
    },
);
NumberFieldIncrement.displayName = "NumberField.Increment";

export const NumberField = {
    Root: NumberFieldRoot,
    ScrubArea: NumberFieldScrubArea,
    ScrubAreaCursor: NumberFieldScrubAreaCursor,
    Group: NumberFieldGroup,
    Input: NumberFieldInput,
    Decrement: NumberFieldDecrement,
    Increment: NumberFieldIncrement,
};
