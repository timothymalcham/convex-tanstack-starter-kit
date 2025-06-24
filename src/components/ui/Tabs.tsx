/**
 * Tabs Component
 *
 * A set of layered sections of content, only one visible at a time. Built with Base UI Tabs.
 *
 * @example
 * // Basic tabs
 * <Tabs.Root defaultValue="overview">
 *   <Tabs.List>
 *     <Tabs.Tab value="overview">Overview</Tabs.Tab>
 *     <Tabs.Tab value="projects">Projects</Tabs.Tab>
 *     <Tabs.Tab value="account">Account</Tabs.Tab>
 *     <Tabs.Indicator />
 *   </Tabs.List>
 *   <Tabs.Panel value="overview">
 *     Overview content here
 *   </Tabs.Panel>
 *   <Tabs.Panel value="projects">
 *     Projects content here
 *   </Tabs.Panel>
 *   <Tabs.Panel value="account">
 *     Account content here
 *   </Tabs.Panel>
 * </Tabs.Root>
 *
 * // Controlled tabs
 * const [activeTab, setActiveTab] = useState("overview");
 * <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
 *   {tabs content}
 * </Tabs.Root>
 *
 * // Custom styling
 * <Tabs.Root defaultValue="tab1" className="w-full">
 *   <Tabs.List className="bg-gray-100 p-1">
 *     <Tabs.Tab value="tab1" className="rounded px-4 py-2">Tab 1</Tabs.Tab>
 *   </Tabs.List>
 * </Tabs.Root>
 *
 * @usage
 * - Navigation between related content sections
 * - Settings panels
 * - Dashboard sections
 * - Product feature comparisons
 * - Form wizards (with validation)
 *
 * @best-practices
 * - Keep tab labels short and descriptive
 * - Use 3-7 tabs maximum for usability
 * - Consider vertical tabs for mobile/narrow layouts
 * - Ensure content is related across tabs
 * - Use indicators to show active state clearly
 * - Maintain state when switching between tabs
 * - Consider loading states for async content
 */

import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TabsRootProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Root> {
    className?: string;
}

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.List> {
    className?: string;
}

interface TabsTabProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
    className?: string;
}

interface TabsIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator> {
    className?: string;
}

interface TabsPanelProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> {
    className?: string;
}

export const TabsRoot = React.forwardRef<React.ElementRef<typeof BaseTabs.Root>, TabsRootProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseTabs.Root ref={ref} className={twMerge("rounded-md border border-gray-200", className)} {...props} />
        );
    },
);

export const TabsList = React.forwardRef<React.ElementRef<typeof BaseTabs.List>, TabsListProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseTabs.List
                ref={ref}
                className={twMerge("relative z-0 flex gap-1 px-1 shadow-[inset_0_-1px] shadow-gray-200", className)}
                {...props}
            />
        );
    },
);

export const TabsTab = React.forwardRef<React.ElementRef<typeof BaseTabs.Tab>, TabsTabProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseTabs.Tab
                ref={ref}
                className={twMerge(
                    "flex h-8 items-center justify-center border-0 px-2 text-sm font-medium text-gray-600 outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800 hover:text-gray-900 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-2 data-[selected]:text-gray-900",
                    className,
                )}
                {...props}
            />
        );
    },
);

export const TabsIndicator = React.forwardRef<React.ElementRef<typeof BaseTabs.Indicator>, TabsIndicatorProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseTabs.Indicator
                ref={ref}
                className={twMerge(
                    "absolute top-1/2 left-0 z-[-1] h-6 w-[var(--active-tab-width)] -translate-y-1/2 translate-x-[var(--active-tab-left)] rounded-sm bg-gray-100 transition-all duration-200 ease-in-out",
                    className,
                )}
                {...props}
            />
        );
    },
);

export const TabsPanel = React.forwardRef<React.ElementRef<typeof BaseTabs.Panel>, TabsPanelProps>(
    ({ className, ...props }, ref) => {
        return (
            <BaseTabs.Panel
                ref={ref}
                className={twMerge(
                    "relative -outline-offset-1 outline-blue-800 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2",
                    className,
                )}
                {...props}
            />
        );
    },
);

TabsRoot.displayName = "TabsRoot";
TabsList.displayName = "TabsList";
TabsTab.displayName = "TabsTab";
TabsIndicator.displayName = "TabsIndicator";
TabsPanel.displayName = "TabsPanel";

// Compound component pattern for easier usage
export const Tabs = {
    Root: TabsRoot,
    List: TabsList,
    Tab: TabsTab,
    Indicator: TabsIndicator,
    Panel: TabsPanel,
};
