import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ToggleGroupProps extends React.ComponentPropsWithoutRef<typeof BaseToggleGroup> {
    className?: string;
}

export const ToggleGroup = React.forwardRef<React.ElementRef<typeof BaseToggleGroup>, ToggleGroupProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseToggleGroup
                ref={ref}
                className={twMerge("flex gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5", className)}
                {...props}
            />
        );
    },
);

ToggleGroup.displayName = "ToggleGroup";
