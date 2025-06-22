import * as React from "react";
import { Progress as BaseProgress } from "@base-ui-components/react/progress";
import { twMerge } from "tailwind-merge";

/**
 * Progress Component
 *
 * Displays the status of a task that takes a long time, perfect for file uploads,
 * data processing, form completion, loading states, and any long-running operations.
 *
 * @example
 * ```jsx
 * import { Progress } from '@/components/ui/Progress'
 *
 * // Basic progress bar
 * <Progress.Root value={65} max={100}>
 *   <div className="flex justify-between items-center mb-2">
 *     <Progress.Label>File Upload</Progress.Label>
 *     <Progress.Value />
 *   </div>
 *   <Progress.Track>
 *     <Progress.Indicator />
 *   </Progress.Track>
 * </Progress.Root>
 *
 * // Form completion progress
 * const [currentStep, setCurrentStep] = React.useState(2)
 * const totalSteps = 5
 *
 * <div className="space-y-4">
 *   <Progress.Root value={currentStep} max={totalSteps}>
 *     <div className="flex justify-between text-sm mb-2">
 *       <Progress.Label>Form Completion</Progress.Label>
 *       <Progress.Value>
 *         {currentStep} of {totalSteps} steps
 *       </Progress.Value>
 *     </div>
 *     <Progress.Track>
 *       <Progress.Indicator />
 *     </Progress.Track>
 *   </Progress.Root>
 *
 *   <div className="flex gap-2">
 *     <button
 *       onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
 *       disabled={currentStep <= 1}
 *       className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
 *     >
 *       Previous
 *     </button>
 *     <button
 *       onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
 *       disabled={currentStep >= totalSteps}
 *       className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
 *     >
 *       Next
 *     </button>
 *   </div>
 * </div>
 *
 * // Download progress with speed
 * <Progress.Root value={78} max={100}>
 *   <div className="flex justify-between items-center mb-2">
 *     <Progress.Label>Downloading update.zip</Progress.Label>
 *     <div className="text-sm text-gray-600">
 *       <Progress.Value />
 *       <span className="ml-2">• 2.3 MB/s</span>
 *     </div>
 *   </div>
 *   <Progress.Track>
 *     <Progress.Indicator className="bg-green-500" />
 *   </Progress.Track>
 *   <div className="flex justify-between text-xs text-gray-500 mt-1">
 *     <span>45.2 MB of 58.1 MB</span>
 *     <span>12 seconds remaining</span>
 *   </div>
 * </Progress.Root>
 *
 * // Skill/proficiency levels
 * const skills = [
 *   { name: 'React', level: 90 },
 *   { name: 'TypeScript', level: 85 },
 *   { name: 'Node.js', level: 75 },
 *   { name: 'Python', level: 60 },
 *   { name: 'Go', level: 40 },
 * ]
 *
 * <div className="space-y-4">
 *   <h3 className="font-semibold">Technical Skills</h3>
 *   {skills.map((skill) => (
 *     <Progress.Root key={skill.name} value={skill.level} max={100}>
 *       <div className="flex justify-between text-sm mb-1">
 *         <Progress.Label>{skill.name}</Progress.Label>
 *         <Progress.Value />
 *       </div>
 *       <Progress.Track size="sm">
 *         <Progress.Indicator
 *           className={skill.level >= 80 ? 'bg-green-500' :
 *                     skill.level >= 60 ? 'bg-yellow-500' : 'bg-gray-400'}
 *         />
 *       </Progress.Track>
 *     </Progress.Root>
 *   ))}
 * </div>
 *
 * // Indeterminate progress
 * <Progress.Root value={null}>
 *   <div className="flex items-center gap-2 mb-2">
 *     <Progress.Label>Processing data...</Progress.Label>
 *     <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
 *   </div>
 *   <Progress.Track>
 *     <Progress.Indicator className="animate-pulse bg-blue-500" />
 *   </Progress.Track>
 * </Progress.Root>
 *
 * // Goal/target progress
 * <Progress.Root value={7500} min={0} max={10000}>
 *   <div className="flex justify-between items-center mb-2">
 *     <Progress.Label className="font-medium">Monthly Sales Goal</Progress.Label>
 *     <Progress.Value>
 *       ${(7500).toLocaleString()} / ${(10000).toLocaleString()}
 *     </Progress.Value>
 *   </div>
 *   <Progress.Track size="lg">
 *     <Progress.Indicator className="bg-gradient-to-r from-blue-500 to-purple-600" />
 *   </Progress.Track>
 *   <div className="text-xs text-gray-500 mt-1">
 *     75% complete • $2,500 remaining
 *   </div>
 * </Progress.Root>
 *
 * // Multi-step process with segments
 * const processSteps = [
 *   { name: 'Upload', status: 'complete' },
 *   { name: 'Process', status: 'current' },
 *   { name: 'Review', status: 'pending' },
 *   { name: 'Deploy', status: 'pending' },
 * ]
 *
 * <div className="space-y-3">
 *   <Progress.Root value={50} max={100}>
 *     <Progress.Label className="font-medium">Deployment Progress</Progress.Label>
 *     <Progress.Track className="relative mt-2">
 *       <Progress.Indicator />
 *       {processSteps.map((step, index) => (
 *         <div
 *           key={step.name}
 *           className="absolute top-0 bottom-0 flex items-center"
 *           style={{ left: `${(index / (processSteps.length - 1)) * 100}%` }}
 *         >
 *           <div className={`w-3 h-3 rounded-full border-2 ${
 *             step.status === 'complete' ? 'bg-green-500 border-green-500' :
 *             step.status === 'current' ? 'bg-blue-500 border-blue-500' :
 *             'bg-white border-gray-300'
 *           }`} />
 *         </div>
 *       ))}
 *     </Progress.Track>
 *   </Progress.Root>
 *
 *   <div className="flex justify-between text-sm">
 *     {processSteps.map((step) => (
 *       <span
 *         key={step.name}
 *         className={step.status === 'complete' ? 'text-green-600' :
 *                   step.status === 'current' ? 'text-blue-600' :
 *                   'text-gray-400'}
 *       >
 *         {step.name}
 *       </span>
 *     ))}
 *   </div>
 * </div>
 *
 * // Storage/quota usage
 * <div className="space-y-4">
 *   <Progress.Root value={8.7} max={15}>
 *     <div className="flex justify-between items-center mb-2">
 *       <Progress.Label>Storage Used</Progress.Label>
 *       <Progress.Value>
 *         8.7 GB of 15 GB
 *       </Progress.Value>
 *     </div>
 *     <Progress.Track>
 *       <Progress.Indicator className="bg-orange-500" />
 *     </Progress.Track>
 *   </Progress.Root>
 *
 *   <div className="grid grid-cols-3 gap-3 text-sm">
 *     <div className="flex items-center gap-2">
 *       <div className="w-3 h-3 bg-blue-500 rounded"></div>
 *       <span>Photos: 4.2 GB</span>
 *     </div>
 *     <div className="flex items-center gap-2">
 *       <div className="w-3 h-3 bg-green-500 rounded"></div>
 *       <span>Videos: 3.1 GB</span>
 *     </div>
 *     <div className="flex items-center gap-2">
 *       <div className="w-3 h-3 bg-yellow-500 rounded"></div>
 *       <span>Docs: 1.4 GB</span>
 *     </div>
 *   </div>
 * </div>
 *
 * // Circular progress (custom styling)
 * <div className="flex items-center gap-4">
 *   <div className="relative w-16 h-16">
 *     <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
 *       <circle
 *         cx="50" cy="50" r="40"
 *         stroke="currentColor"
 *         strokeWidth="8"
 *         fill="none"
 *         className="text-gray-200"
 *       />
 *       <circle
 *         cx="50" cy="50" r="40"
 *         stroke="currentColor"
 *         strokeWidth="8"
 *         fill="none"
 *         strokeDasharray={`${2 * Math.PI * 40}`}
 *         strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.73)}`}
 *         className="text-blue-500"
 *         strokeLinecap="round"
 *       />
 *     </svg>
 *     <div className="absolute inset-0 flex items-center justify-center">
 *       <span className="text-sm font-medium">73%</span>
 *     </div>
 *   </div>
 *
 *   <div>
 *     <div className="font-medium">Project Completion</div>
 *     <div className="text-sm text-gray-600">26 of 35 tasks done</div>
 *   </div>
 * </div>
 * ```
 */

interface ProgressRootProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root> {
    className?: string;
}

const ProgressRoot = React.forwardRef<HTMLDivElement, ProgressRootProps>(({ className, ...props }, ref) => {
    return <BaseProgress.Root ref={ref} className={twMerge("relative", className)} {...props} />;
});
ProgressRoot.displayName = "Progress.Root";

interface ProgressTrackProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Track> {
    className?: string;
    size?: "xs" | "sm" | "md" | "lg";
}

const ProgressTrack = React.forwardRef<HTMLDivElement, ProgressTrackProps>(
    ({ className, size = "md", ...props }, ref) => {
        const sizeStyles = {
            xs: "h-1",
            sm: "h-2",
            md: "h-3",
            lg: "h-4",
        };

        return (
            <BaseProgress.Track
                ref={ref}
                className={twMerge(
                    "relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
                    sizeStyles[size],
                    className,
                )}
                {...props}
            />
        );
    },
);
ProgressTrack.displayName = "Progress.Track";

interface ProgressIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator> {
    className?: string;
}

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(({ className, ...props }, ref) => {
    return (
        <BaseProgress.Indicator
            ref={ref}
            className={twMerge(
                "h-full bg-blue-600 transition-all duration-500 ease-out rounded-full",
                "dark:bg-blue-500",
                "data-[indeterminate]:animate-pulse",
                className,
            )}
            {...props}
        />
    );
});
ProgressIndicator.displayName = "Progress.Indicator";

interface ProgressValueProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Value> {
    className?: string;
    showPercentage?: boolean;
}

const ProgressValue = React.forwardRef<HTMLSpanElement, ProgressValueProps>(
    ({ className, showPercentage = true, children, ...props }, ref) => {
        return (
            <BaseProgress.Value
                ref={ref}
                className={twMerge("text-sm font-medium text-gray-700 dark:text-gray-300", className)}
                {...props}
            >
                {children ||
                    ((value, max) => {
                        if (value == null) return "—";
                        const percentage = Math.round((parseInt(value, 10) / (max ?? 1)) * 100);
                        return showPercentage ? `${percentage}%` : `${value}/${max}`;
                    })}
            </BaseProgress.Value>
        );
    },
);
ProgressValue.displayName = "Progress.Value";

interface ProgressLabelProps extends React.ComponentPropsWithoutRef<typeof BaseProgress.Label> {
    className?: string;
}

const ProgressLabel = React.forwardRef<HTMLSpanElement, ProgressLabelProps>(({ className, ...props }, ref) => {
    return (
        <BaseProgress.Label
            ref={ref}
            className={twMerge("text-sm font-medium text-gray-900 dark:text-gray-100", className)}
            {...props}
        />
    );
});
ProgressLabel.displayName = "Progress.Label";

export const Progress = {
    Root: ProgressRoot,
    Track: ProgressTrack,
    Indicator: ProgressIndicator,
    Value: ProgressValue,
    Label: ProgressLabel,
};
