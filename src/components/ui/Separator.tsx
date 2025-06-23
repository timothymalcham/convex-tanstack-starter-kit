import { Separator as BaseSeparator } from "@base-ui-components/react/separator";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof BaseSeparator> {
    orientation?: "horizontal" | "vertical";
    className?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    ({ orientation = "horizontal", className, ...props }, ref) => {
        const defaultStyles = orientation === "horizontal" ? "h-px w-full bg-gray-300" : "w-px h-full bg-gray-300";

        return (
            <BaseSeparator
                ref={ref}
                orientation={orientation}
                className={twMerge(defaultStyles, className)}
                {...props}
            />
        );
    },
);

Separator.displayName = "Separator";
