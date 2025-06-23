import { Meter as BaseMeter } from "@base-ui-components/react/meter";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Meter Component
 *
 * A graphical display of a numeric value within a defined range, perfect for showing
 * progress, storage usage, scores, ratings, and other measured values.
 *
 * @example
 * ```jsx
 * import { Meter } from '@/components/ui/Meter'
 *
 * // Basic meter with value and label
 * <Meter.Root value={75} max={100}>
 *   <div className="flex justify-between items-center mb-2">
 *     <Meter.Label>Storage Used</Meter.Label>
 *     <Meter.Value />
 *   </div>
 *   <Meter.Track>
 *     <Meter.Indicator />
 *   </Meter.Track>
 * </Meter.Root>
 *
 * // Progress meter with different colors based on value
 * <Meter.Root value={85} max={100}>
 *   <div className="flex justify-between text-sm mb-1">
 *     <Meter.Label>Download Progress</Meter.Label>
 *     <Meter.Value />
 *   </div>
 *   <Meter.Track>
 *     <Meter.Indicator className="bg-gradient-to-r from-green-500 to-blue-500" />
 *   </Meter.Track>
 * </Meter.Root>
 *
 * // Meter with custom range and formatting
 * <Meter.Root
 *   value={2.5}
 *   min={0}
 *   max={5}
 *   getAriaValueText={(value) => `${value} out of 5 stars`}
 * >
 *   <div className="flex items-center gap-2 mb-2">
 *     <Meter.Label>Rating</Meter.Label>
 *     <Meter.Value />
 *     <span className="text-yellow-500">⭐</span>
 *   </div>
 *   <Meter.Track className="bg-gray-200">
 *     <Meter.Indicator className="bg-yellow-400" />
 *   </Meter.Track>
 * </Meter.Root>
 *
 * // Multiple meters for comparison
 * <div className="space-y-4">
 *   <div>
 *     <Meter.Root value={23} max={32}>
 *       <div className="flex justify-between text-sm mb-1">
 *         <Meter.Label>CPU Usage</Meter.Label>
 *         <Meter.Value />
 *       </div>
 *       <Meter.Track>
 *         <Meter.Indicator className="bg-blue-500" />
 *       </Meter.Track>
 *     </Meter.Root>
 *   </div>
 *
 *   <div>
 *     <Meter.Root value={7.2} max={16}>
 *       <div className="flex justify-between text-sm mb-1">
 *         <Meter.Label>Memory Usage (GB)</Meter.Label>
 *         <Meter.Value />
 *       </div>
 *       <Meter.Track>
 *         <Meter.Indicator className="bg-green-500" />
 *       </Meter.Track>
 *     </Meter.Root>
 *   </div>
 *
 *   <div>
 *     <Meter.Root value={89} max={100}>
 *       <div className="flex justify-between text-sm mb-1">
 *         <Meter.Label>Disk Usage (%)</Meter.Label>
 *         <Meter.Value />
 *       </div>
 *       <Meter.Track>
 *         <Meter.Indicator className="bg-red-500" />
 *       </Meter.Track>
 *     </Meter.Root>
 *   </div>
 * </div>
 *
 * // Meter with warning states
 * const storageValue = 90
 * const getStorageColor = (value) => {
 *   if (value >= 90) return 'bg-red-500'
 *   if (value >= 75) return 'bg-yellow-500'
 *   return 'bg-green-500'
 * }
 *
 * <Meter.Root value={storageValue} max={100}>
 *   <div className="flex justify-between items-center mb-2">
 *     <Meter.Label className="font-medium">Storage</Meter.Label>
 *     <div className="flex items-center gap-2">
 *       <Meter.Value />
 *       {storageValue >= 90 && <span className="text-red-500 text-sm">⚠️ Almost Full</span>}
 *     </div>
 *   </div>
 *   <Meter.Track>
 *     <Meter.Indicator className={getStorageColor(storageValue)} />
 *   </Meter.Track>
 * </Meter.Root>
 *
 * // Compact meter for dashboards
 * <div className="bg-white p-4 rounded-lg shadow">
 *   <Meter.Root value={68} max={100}>
 *     <div className="flex items-center justify-between">
 *       <div className="flex items-center gap-3">
 *         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
 *           💾
 *         </div>
 *         <div>
 *           <Meter.Label className="text-sm font-medium text-gray-700">
 *             Database
 *           </Meter.Label>
 *           <div className="w-24">
 *             <Meter.Track className="h-1">
 *               <Meter.Indicator className="bg-blue-500" />
 *             </Meter.Track>
 *           </div>
 *         </div>
 *       </div>
 *       <Meter.Value className="text-sm font-mono" />
 *     </div>
 *   </Meter.Root>
 * </div>
 *
 * // Meter with segments/steps
 * <Meter.Root value={7} min={0} max={10}>
 *   <div className="flex justify-between mb-2">
 *     <Meter.Label>Skill Level</Meter.Label>
 *     <Meter.Value />
 *   </div>
 *   <Meter.Track className="bg-gray-200 h-4 relative">
 *     <Meter.Indicator className="bg-purple-500" />
 *     {Array.from({ length: 9 }, (_, i) => (
 *       <div
 *         key={i}
 *         className="absolute top-0 bottom-0 w-px bg-white"
 *         style={{ left: \`${((i + 1) * 10)}%\` }}
 *       />
 *     ))}
 *   </Meter.Track>
 * </Meter.Root>
 * ```
 */

interface MeterRootProps extends React.ComponentPropsWithoutRef<typeof BaseMeter.Root> {
    className?: string;
}

const MeterRoot = React.forwardRef<HTMLDivElement, MeterRootProps>(({ className, ...props }, ref) => {
    return <BaseMeter.Root ref={ref} className={twMerge("relative", className)} {...props} />;
});
MeterRoot.displayName = "Meter.Root";

interface MeterTrackProps extends React.ComponentPropsWithoutRef<typeof BaseMeter.Track> {
    className?: string;
    size?: "sm" | "md" | "lg";
}

const MeterTrack = React.forwardRef<HTMLDivElement, MeterTrackProps>(({ className, size = "md", ...props }, ref) => {
    const sizeStyles = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
    };

    return (
        <BaseMeter.Track
            ref={ref}
            className={twMerge(
                "relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
                sizeStyles[size],
                className,
            )}
            {...props}
        />
    );
});
MeterTrack.displayName = "Meter.Track";

interface MeterIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseMeter.Indicator> {
    className?: string;
}

const MeterIndicator = React.forwardRef<HTMLDivElement, MeterIndicatorProps>(({ className, ...props }, ref) => {
    return (
        <BaseMeter.Indicator
            ref={ref}
            className={twMerge(
                "h-full bg-blue-600 transition-all duration-300 ease-out rounded-full",
                "dark:bg-blue-500",
                className,
            )}
            {...props}
        />
    );
});
MeterIndicator.displayName = "Meter.Indicator";

interface MeterValueProps extends React.ComponentPropsWithoutRef<typeof BaseMeter.Value> {
    className?: string;
    showUnit?: boolean;
    unit?: string;
}

const MeterValue = React.forwardRef<HTMLSpanElement, MeterValueProps>(
    ({ className, showUnit = true, unit = "%", ...props }, ref) => {
        return (
            <BaseMeter.Value
                ref={ref}
                className={twMerge("text-sm font-medium text-gray-700 dark:text-gray-300", className)}
                {...props}
            >
                {(value, max) => {
                    const numValue = Number(value) || 0;
                    const numMax = Number(max) || 1;
                    const percentage = Math.round((numValue / numMax) * 100);
                    return showUnit ? `${percentage}${unit}` : percentage.toString();
                }}
            </BaseMeter.Value>
        );
    },
);
MeterValue.displayName = "Meter.Value";

interface MeterLabelProps extends React.ComponentPropsWithoutRef<typeof BaseMeter.Label> {
    className?: string;
}

const MeterLabel = React.forwardRef<HTMLSpanElement, MeterLabelProps>(({ className, ...props }, ref) => {
    return (
        <BaseMeter.Label
            ref={ref}
            className={twMerge("text-sm font-medium text-gray-900 dark:text-gray-100", className)}
            {...props}
        />
    );
});
MeterLabel.displayName = "Meter.Label";

export const Meter = {
    Root: MeterRoot,
    Track: MeterTrack,
    Indicator: MeterIndicator,
    Value: MeterValue,
    Label: MeterLabel,
};
