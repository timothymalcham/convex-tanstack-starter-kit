/**
 * ToggleGroup Component
 *
 * Groups multiple toggle buttons with state management. Built with Base UI ToggleGroup.
 *
 * @example
 * // Basic toggle group (single selection)
 * <ToggleGroup defaultValue="left">
 *   <Toggle value="left" aria-label="Align left">
 *     <AlignLeftIcon />
 *   </Toggle>
 *   <Toggle value="center" aria-label="Align center">
 *     <AlignCenterIcon />
 *   </Toggle>
 *   <Toggle value="right" aria-label="Align right">
 *     <AlignRightIcon />
 *   </Toggle>
 * </ToggleGroup>
 *
 * // Multiple selection
 * <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
 *   <Toggle value="bold" aria-label="Bold">
 *     <BoldIcon />
 *   </Toggle>
 *   <Toggle value="italic" aria-label="Italic">
 *     <ItalicIcon />
 *   </Toggle>
 *   <Toggle value="underline" aria-label="Underline">
 *     <UnderlineIcon />
 *   </Toggle>
 * </ToggleGroup>
 *
 * // Controlled
 * const [alignment, setAlignment] = useState("left");
 * <ToggleGroup value={alignment} onValueChange={setAlignment}>
 *   <Toggle value="left">Left</Toggle>
 *   <Toggle value="center">Center</Toggle>
 *   <Toggle value="right">Right</Toggle>
 * </ToggleGroup>
 *
 * // Custom styling
 * <ToggleGroup className="bg-white border rounded-lg p-1">
 *   <Toggle value="grid" className="data-[pressed]:bg-blue-100">
 *     Grid View
 *   </Toggle>
 * </ToggleGroup>
 *
 * @usage
 * - Text alignment controls
 * - View mode selection (grid/list)
 * - Text formatting (bold, italic, underline)
 * - Filter options
 * - Tool palettes
 * - Display preferences
 *
 * @best-practices
 * - Use single selection for mutually exclusive options
 * - Use multiple selection for independent toggles
 * - Provide clear visual grouping
 * - Ensure at least one option can be selected (or allow none)
 * - Group related functionality only
 * - Use consistent sizing across toggles
 * - Provide keyboard navigation support
 */

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
                className={twMerge(
                    "flex gap-1 rounded-lg border border-gray-300 bg-gray-100 p-1 dark:border-gray-600 dark:bg-gray-800",
                    className,
                )}
                {...props}
            />
        );
    },
);

ToggleGroup.displayName = "ToggleGroup";
