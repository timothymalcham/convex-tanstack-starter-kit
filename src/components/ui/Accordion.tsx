import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface AccordionRootProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Root> {
    className?: string;
}

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(({ className, ...props }, ref) => {
    return (
        <BaseAccordion.Root
            ref={ref}
            className={twMerge("divide-y divide-neutral-200/60 dark:divide-neutral-800/60", className)}
            {...props}
        />
    );
});
AccordionRoot.displayName = "Accordion.Root";

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Item> {
    className?: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(({ className, ...props }, ref) => {
    return <BaseAccordion.Item ref={ref} className={twMerge("overflow-hidden", className)} {...props} />;
});
AccordionItem.displayName = "Accordion.Item";

interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Header> {
    className?: string;
}

const AccordionHeader = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(({ className, ...props }, ref) => {
    return <BaseAccordion.Header ref={ref} className={twMerge("flex", className)} {...props} />;
});
AccordionHeader.displayName = "Accordion.Header";

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger> {
    className?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <BaseAccordion.Trigger
                ref={ref}
                className={twMerge(
                    "flex flex-1 items-center justify-between py-4 text-left font-medium transition-all",
                    "hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:backdrop-blur-sm",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500/30 focus-visible:ring-inset",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "[&[data-open]>svg]:rotate-180",
                    className,
                )}
                {...props}
            >
                {children}
                <svg
                    className="h-5 w-5 shrink-0 transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </BaseAccordion.Trigger>
        );
    },
);
AccordionTrigger.displayName = "Accordion.Trigger";

interface AccordionPanelProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel> {
    className?: string;
}

const AccordionPanel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(({ className, ...props }, ref) => {
    return (
        <BaseAccordion.Panel
            ref={ref}
            className={twMerge(
                "overflow-hidden transition-all",
                "data-[open]:animate-accordion-down data-[closed]:animate-accordion-up",
                className,
            )}
            {...props}
        >
            <div className="pb-4 pt-0">{props.children}</div>
        </BaseAccordion.Panel>
    );
});
AccordionPanel.displayName = "Accordion.Panel";

export const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Header: AccordionHeader,
    Trigger: AccordionTrigger,
    Panel: AccordionPanel,
};
