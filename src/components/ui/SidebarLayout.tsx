import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { Icon } from "~/icons/icons";

/**
 * SidebarLayout Component
 * 
 * Responsive layout with collapsible sidebar for navigation and main content area.
 * Automatically adapts to mobile with drawer-style sidebar.
 * 
 * @example Basic usage:
 * ```jsx
 * <SidebarLayout>
 *   <SidebarLayout.Sidebar>
 *     <nav>
 *       <a href="/dashboard">Dashboard</a>
 *       <a href="/settings">Settings</a>
 *     </nav>
 *   </SidebarLayout.Sidebar>
 *   <SidebarLayout.Main>
 *     <h1>Page Content</h1>
 *   </SidebarLayout.Main>
 * </SidebarLayout>
 * ```
 * 
 * @example With header and footer:
 * ```jsx
 * <SidebarLayout>
 *   <SidebarLayout.Header>
 *     <Logo />
 *     <UserMenu />
 *   </SidebarLayout.Header>
 *   <SidebarLayout.Sidebar>
 *     <Navigation />
 *   </SidebarLayout.Sidebar>
 *   <SidebarLayout.Main>
 *     <PageContent />
 *   </SidebarLayout.Main>
 *   <SidebarLayout.Footer>
 *     <Copyright />
 *   </SidebarLayout.Footer>
 * </SidebarLayout>
 * ```
 * 
 * @example Controlled sidebar:
 * ```jsx
 * const [sidebarOpen, setSidebarOpen] = useState(false);
 * 
 * <SidebarLayout 
 *   sidebarOpen={sidebarOpen}
 *   onSidebarToggle={setSidebarOpen}
 * >
 *   ...
 * </SidebarLayout>
 * ```
 */

interface SidebarLayoutContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarLayoutContext = React.createContext<SidebarLayoutContextValue | undefined>(undefined);

function useSidebarLayout() {
  const context = React.useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error('SidebarLayout components must be used within SidebarLayout');
  }
  return context;
}

export interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  onSidebarToggle?: (open: boolean) => void;
  defaultSidebarOpen?: boolean;
  sidebarPosition?: 'left' | 'right';
  className?: string;
}

export function SidebarLayout({
  children,
  sidebarOpen: controlledOpen,
  onSidebarToggle,
  defaultSidebarOpen = true,
  sidebarPosition = 'left',
  className,
}: SidebarLayoutProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultSidebarOpen);
  
  const sidebarOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  
  const setSidebarOpen = React.useCallback((open: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(open);
    }
    onSidebarToggle?.(open);
  }, [controlledOpen, onSidebarToggle]);

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen, setSidebarOpen]);

  const contextValue = React.useMemo(
    () => ({ sidebarOpen, setSidebarOpen, toggleSidebar }),
    [sidebarOpen, setSidebarOpen, toggleSidebar]
  );

  return (
    <SidebarLayoutContext.Provider value={contextValue}>
      <div 
        className={twMerge(
          "flex h-screen flex-col bg-surface",
          className
        )}
        data-sidebar-position={sidebarPosition}
      >
        {children}
      </div>
    </SidebarLayoutContext.Provider>
  );
}

interface SidebarLayoutHeaderProps {
  children: React.ReactNode;
  className?: string;
  showMenuButton?: boolean;
}

function SidebarLayoutHeader({ 
  children, 
  className,
  showMenuButton = true,
}: SidebarLayoutHeaderProps) {
  const { toggleSidebar } = useSidebarLayout();

  return (
    <header 
      className={twMerge(
        "flex h-16 items-center justify-between border-b border-border-outline bg-surface-card px-4 lg:px-6",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Icon name="bars" size="md" />
          </Button>
        )}
        {children}
      </div>
    </header>
  );
}

interface SidebarLayoutSidebarProps {
  children: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg';
}

function SidebarLayoutSidebar({ 
  children, 
  className,
  width = 'md',
}: SidebarLayoutSidebarProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebarLayout();

  const widthClasses = {
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={twMerge(
          "fixed inset-y-0 z-50 flex flex-col border-r border-border-outline bg-surface-card transition-transform duration-300 lg:relative lg:translate-x-0",
          widthClasses[width],
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          "[data-sidebar-position='right'] &:order-2",
          "[data-sidebar-position='right'] &:border-r-0",
          "[data-sidebar-position='right'] &:border-l",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {children}
        </div>
      </aside>
    </>
  );
}

interface SidebarLayoutMainProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

function SidebarLayoutMain({ 
  children, 
  className,
  padding = true,
}: SidebarLayoutMainProps) {
  return (
    <main 
      className={twMerge(
        "flex-1 overflow-y-auto",
        padding && "p-4 lg:p-6",
        className
      )}
    >
      {children}
    </main>
  );
}

interface SidebarLayoutFooterProps {
  children: React.ReactNode;
  className?: string;
}

function SidebarLayoutFooter({ children, className }: SidebarLayoutFooterProps) {
  return (
    <footer 
      className={twMerge(
        "border-t border-border-outline bg-surface-card px-4 py-4 lg:px-6",
        className
      )}
    >
      {children}
    </footer>
  );
}

interface SidebarLayoutBodyProps {
  children: React.ReactNode;
  className?: string;
}

function SidebarLayoutBody({ children, className }: SidebarLayoutBodyProps) {
  return (
    <div className={twMerge("flex flex-1 overflow-hidden", className)}>
      {children}
    </div>
  );
}

// Attach sub-components
SidebarLayout.Header = SidebarLayoutHeader;
SidebarLayout.Sidebar = SidebarLayoutSidebar;
SidebarLayout.Main = SidebarLayoutMain;
SidebarLayout.Footer = SidebarLayoutFooter;
SidebarLayout.Body = SidebarLayoutBody;

/**
 * useSidebar Hook
 * 
 * Hook to access sidebar state and controls from any component within SidebarLayout.
 * 
 * @example
 * ```jsx
 * function MyComponent() {
 *   const { sidebarOpen, toggleSidebar } = useSidebar();
 *   
 *   return (
 *     <button onClick={toggleSidebar}>
 *       {sidebarOpen ? 'Close' : 'Open'} Sidebar
 *     </button>
 *   );
 * }
 * ```
 */
export function useSidebar() {
  return useSidebarLayout();
}