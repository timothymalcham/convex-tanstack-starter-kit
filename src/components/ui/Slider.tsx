import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof BaseSlider.Root> {
    className?: string;
    trackClassName?: string;
    indicatorClassName?: string;
    thumbClassName?: string;
    controlClassName?: string;
}

export const Slider = React.forwardRef<React.ElementRef<typeof BaseSlider.Root>, SliderProps>(
    ({ className, trackClassName, indicatorClassName, thumbClassName, controlClassName, children, ...props }, ref) => {
        return (
            <BaseSlider.Root className={className} {...props}>
                {children || (
                    <BaseSlider.Control
                        className={twMerge("flex w-56 touch-none items-center py-3 select-none", controlClassName)}
                    >
                        <BaseSlider.Track
                            className={twMerge(
                                "h-1 w-full rounded bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 select-none",
                                trackClassName,
                            )}
                        >
                            <BaseSlider.Indicator
                                className={twMerge("rounded bg-gray-700 select-none", indicatorClassName)}
                            />
                            <BaseSlider.Thumb
                                className={twMerge(
                                    "size-4 rounded-full bg-white outline outline-1 outline-gray-300 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800",
                                    thumbClassName,
                                )}
                            />
                        </BaseSlider.Track>
                    </BaseSlider.Control>
                )}
            </BaseSlider.Root>
        );
    },
);

Slider.displayName = "Slider";

// Export sub-components for advanced usage
export const SliderRoot = BaseSlider.Root;
export const SliderControl = BaseSlider.Control;
export const SliderTrack = BaseSlider.Track;
export const SliderIndicator = BaseSlider.Indicator;
export const SliderThumb = BaseSlider.Thumb;
