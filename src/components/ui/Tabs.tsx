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
        return <BaseTabs.Root ref={ref} className={twMerge("w-full", className)} {...props} />;
    },
);

const TabsContext = React.createContext<{ isAnyTabHovered: boolean }>({ isAnyTabHovered: false });

export const TabsList = React.forwardRef<React.ElementRef<typeof BaseTabs.List>, TabsListProps>(
    ({ className, ...props }, ref) => {
        const [hoverState, setHoverState] = React.useState<{ width: number; left: number; opacity: number } | null>(
            null,
        );
        const [isAnyTabHovered, setIsAnyTabHovered] = React.useState(false);
        const listRef = React.useRef<HTMLDivElement>(null);
        const isMouseInside = React.useRef(false);

        React.useImperativeHandle(ref, () => listRef.current!);

        const updateHoverState = React.useCallback((event: MouseEvent | React.MouseEvent) => {
            if (!listRef.current || !isMouseInside.current) return;

            const target = document.elementFromPoint(event.clientX, event.clientY);
            const tab = target?.closest('[role="tab"]') as HTMLElement;

            if (tab && listRef.current.contains(tab)) {
                const listRect = listRef.current.getBoundingClientRect();
                const tabRect = tab.getBoundingClientRect();
                setHoverState({
                    width: tabRect.width,
                    left: tabRect.left - listRect.left,
                    opacity: 1,
                });
                setIsAnyTabHovered(true);
            }
        }, []);

        const handleMouseEnter = React.useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                isMouseInside.current = true;
                updateHoverState(event);
            },
            [updateHoverState],
        );

        const handleMouseMove = React.useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                updateHoverState(event);
            },
            [updateHoverState],
        );

        const handleMouseLeave = React.useCallback(() => {
            isMouseInside.current = false;
            setIsAnyTabHovered(false);
            setHoverState((prev) => (prev ? { ...prev, opacity: 0 } : null));
            // Clear the hover state after animation
            setTimeout(() => {
                if (!isMouseInside.current) {
                    setHoverState(null);
                }
            }, 200);
        }, []);

        return (
            <TabsContext.Provider value={{ isAnyTabHovered }}>
                <BaseTabs.List
                    ref={listRef}
                    className={twMerge(
                        "relative flex gap-1 p-1 bg-gradient-to-b from-neutral-100 to-neutral-200/30 dark:from-neutral-800 dark:to-neutral-700/30 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm backdrop-blur-sm",
                        className,
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    {...props}
                >
                    {/* Hover indicator */}
                    {hoverState && (
                        <div
                            className="absolute top-1/2 z-[1] h-9 -translate-y-1/2 rounded-md bg-gradient-to-b from-neutral-200/80 to-neutral-300/60 dark:from-neutral-600/80 dark:to-neutral-700/60 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none shadow-sm border border-neutral-300/50 dark:border-neutral-500/50"
                            style={{
                                width: hoverState.width,
                                left: hoverState.left,
                                opacity: hoverState.opacity,
                            }}
                        />
                    )}
                    {props.children}
                </BaseTabs.List>
            </TabsContext.Provider>
        );
    },
);

export const TabsTab = React.forwardRef<React.ElementRef<typeof BaseTabs.Tab>, TabsTabProps>(
    ({ className, ...props }, ref) => {
        const [isHovered, setIsHovered] = React.useState(false);

        return (
            <BaseTabs.Tab
                ref={ref}
                className={twMerge(
                    "flex h-9 items-center justify-center px-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 transition-all duration-300 rounded-md cursor-pointer outline-none select-none hover:text-neutral-900 dark:hover:text-neutral-200 focus-visible:outline-2 focus-visible:outline-neutral-500 focus-visible:outline-offset-2 relative z-[3] whitespace-nowrap",
                    // Only apply selected styles when not hovering
                    !isHovered && "data-[selected]:text-neutral-900 dark:data-[selected]:text-white",
                    className,
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            />
        );
    },
);

export const TabsIndicator = React.forwardRef<React.ElementRef<typeof BaseTabs.Indicator>, TabsIndicatorProps>(
    ({ className, ...props }, ref) => {
        const { isAnyTabHovered } = React.useContext(TabsContext);

        return (
            <BaseTabs.Indicator
                ref={ref}
                className={twMerge(
                    "absolute top-1/2 left-0 z-[2] h-9 w-[var(--active-tab-width)] -translate-y-1/2 translate-x-[var(--active-tab-left)] rounded-md bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-700 dark:to-neutral-600/50 shadow-lg border border-neutral-300/60 dark:border-neutral-600/60 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-sm",
                    isAnyTabHovered && "opacity-0",
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
                    "mt-4 focus-visible:outline-2 focus-visible:outline-neutral-500 focus-visible:outline-offset-2 focus-visible:rounded-md",
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
