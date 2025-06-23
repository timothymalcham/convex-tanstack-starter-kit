import { Field as BaseField } from "@base-ui-components/react/field";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface FieldRootProps extends React.ComponentPropsWithoutRef<typeof BaseField.Root> {
    className?: string;
}

const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(({ className, ...props }, ref) => {
    return <BaseField.Root ref={ref} className={twMerge("mb-4", className)} {...props} />;
});
FieldRoot.displayName = "Field.Root";

interface FieldLabelProps extends React.ComponentPropsWithoutRef<typeof BaseField.Label> {
    className?: string;
    required?: boolean;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
    ({ className, required, children, ...props }, ref) => {
        return (
            <BaseField.Label
                ref={ref}
                className={twMerge("block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1", className)}
                {...props}
            >
                {children}
                {required && <span className="text-red-500 ml-1">*</span>}
            </BaseField.Label>
        );
    },
);
FieldLabel.displayName = "Field.Label";

interface FieldControlProps extends React.ComponentPropsWithoutRef<typeof BaseField.Control> {
    className?: string;
}

const FieldControl = React.forwardRef<HTMLInputElement, FieldControlProps>(({ className, ...props }, ref) => {
    return (
        <BaseField.Control
            ref={ref}
            className={twMerge(
                "block w-full rounded-md border border-gray-300 dark:border-gray-700",
                "bg-white dark:bg-gray-900 px-3 py-2",
                "text-gray-900 dark:text-gray-100",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                "focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500",
                className,
            )}
            {...props}
        />
    );
});
FieldControl.displayName = "Field.Control";

interface FieldDescriptionProps extends React.ComponentPropsWithoutRef<typeof BaseField.Description> {
    className?: string;
}

const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseField.Description
                ref={ref}
                className={twMerge("mt-1 text-sm text-gray-500 dark:text-gray-400", className)}
                {...props}
            />
        );
    },
);
FieldDescription.displayName = "Field.Description";

interface FieldErrorProps extends React.ComponentPropsWithoutRef<typeof BaseField.Error> {
    className?: string;
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(({ className, ...props }, ref) => {
    return (
        <BaseField.Error
            ref={ref}
            className={twMerge("mt-1 text-sm text-red-600 dark:text-red-400", className)}
            {...props}
        />
    );
});
FieldError.displayName = "Field.Error";

export const Field = {
    Root: FieldRoot,
    Label: FieldLabel,
    Control: FieldControl,
    Description: FieldDescription,
    Error: FieldError,
    Validity: BaseField.Validity,
};
