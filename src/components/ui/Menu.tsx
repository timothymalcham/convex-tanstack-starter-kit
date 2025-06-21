import * as React from 'react'
import { Menu as BaseMenu } from '@base-ui-components/react/menu'
import { twMerge } from 'tailwind-merge'

/**
 * Menu Component
 * 
 * A menu displays a list of actions or options that a user can choose from. Unlike ContextMenu 
 * which appears on right-click, Menu is triggered by click/hover and can be used for dropdowns,
 * navigation menus, and action menus.
 * 
 * @example
 * ```jsx
 * import { Menu, MenuContent } from '@/components/ui/Menu'
 * import { Button } from '@/components/ui/Button'
 * 
 * // Basic dropdown menu
 * <Menu.Root>
 *   <Menu.Trigger asChild>
 *     <Button>Actions</Button>
 *   </Menu.Trigger>
 *   <MenuContent>
 *     <Menu.Item>Edit</Menu.Item>
 *     <Menu.Item>Copy</Menu.Item>
 *     <Menu.Item>Delete</Menu.Item>
 *   </MenuContent>
 * </Menu.Root>
 * 
 * // Navigation menu with separators and groups
 * <Menu.Root>
 *   <Menu.Trigger asChild>
 *     <Button variant="ghost">File</Button>
 *   </Menu.Trigger>
 *   <MenuContent>
 *     <Menu.Item>New File</Menu.Item>
 *     <Menu.Item>Open File</Menu.Item>
 *     <Menu.Item>Recent Files</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Group>
 *       <Menu.GroupLabel>Export</Menu.GroupLabel>
 *       <Menu.Item>Export as PDF</Menu.Item>
 *       <Menu.Item>Export as Image</Menu.Item>
 *     </Menu.Group>
 *     <Menu.Separator />
 *     <Menu.Item>Settings</Menu.Item>
 *     <Menu.Item className="text-red-600">Quit</Menu.Item>
 *   </MenuContent>
 * </Menu.Root>
 * 
 * // Menu with checkbox items (for toggles)
 * <Menu.Root>
 *   <Menu.Trigger asChild>
 *     <Button variant="ghost">View Options</Button>
 *   </Menu.Trigger>
 *   <MenuContent>
 *     <Menu.CheckboxItem checked>
 *       <Menu.ItemIndicator>✓</Menu.ItemIndicator>
 *       Show sidebar
 *     </Menu.CheckboxItem>
 *     <Menu.CheckboxItem>
 *       <Menu.ItemIndicator>✓</Menu.ItemIndicator>
 *       Show toolbar
 *     </Menu.CheckboxItem>
 *     <Menu.CheckboxItem checked>
 *       <Menu.ItemIndicator>✓</Menu.ItemIndicator>
 *       Show status bar
 *     </Menu.CheckboxItem>
 *     <Menu.Separator />
 *     <Menu.Item>Reset Layout</Menu.Item>
 *   </MenuContent>
 * </Menu.Root>
 * 
 * // Menu with radio group (for single selection)
 * <Menu.Root>
 *   <Menu.Trigger asChild>
 *     <Button variant="ghost">Theme</Button>
 *   </Menu.Trigger>
 *   <MenuContent>
 *     <Menu.RadioGroup value="light">
 *       <Menu.RadioItem value="light">
 *         <Menu.ItemIndicator>●</Menu.ItemIndicator>
 *         Light
 *       </Menu.RadioItem>
 *       <Menu.RadioItem value="dark">
 *         <Menu.ItemIndicator>●</Menu.ItemIndicator>
 *         Dark
 *       </Menu.RadioItem>
 *       <Menu.RadioItem value="system">
 *         <Menu.ItemIndicator>●</Menu.ItemIndicator>
 *         System
 *       </Menu.RadioItem>
 *     </Menu.RadioGroup>
 *   </MenuContent>
 * </Menu.Root>
 * 
 * // Hover menu (opens on hover)
 * <Menu.Root openOnHover>
 *   <Menu.Trigger asChild>
 *     <Button variant="ghost">Hover me</Button>
 *   </Menu.Trigger>
 *   <MenuContent>
 *     <Menu.Item>Quick Action 1</Menu.Item>
 *     <Menu.Item>Quick Action 2</Menu.Item>
 *     <Menu.Item>Quick Action 3</Menu.Item>
 *   </MenuContent>
 * </Menu.Root>
 * 
 * // User profile menu example
 * <Menu.Root>
 *   <Menu.Trigger asChild>
 *     <Button variant="ghost" className="h-8 w-8 rounded-full">
 *       <img
 *         src="/avatar.jpg"
 *         alt="Profile"
 *         className="h-8 w-8 rounded-full"
 *       />
 *     </Button>
 *   </Menu.Trigger>
 *   <MenuContent align="end">
 *     <div className="flex items-center justify-start gap-2 p-2">
 *       <div className="flex flex-col space-y-1 leading-none">
 *         <p className="font-medium">John Doe</p>
 *         <p className="w-[200px] truncate text-sm text-muted-foreground">
 *           john.doe@example.com
 *         </p>
 *       </div>
 *     </div>
 *     <Menu.Separator />
 *     <Menu.Item>Profile</Menu.Item>
 *     <Menu.Item>Billing</Menu.Item>
 *     <Menu.Item>Team</Menu.Item>
 *     <Menu.Item>Subscription</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item>Log out</Menu.Item>
 *   </MenuContent>
 * </Menu.Root>
 * 
 * // Menu with disabled items and keyboard shortcuts
 * <Menu.Root>
 *   <Menu.Trigger asChild>
 *     <Button>Edit</Button>
 *   </Menu.Trigger>
 *   <MenuContent>
 *     <Menu.Item>
 *       <span>Undo</span>
 *       <span className="ml-auto text-xs tracking-widest opacity-60">⌘Z</span>
 *     </Menu.Item>
 *     <Menu.Item disabled>
 *       <span>Redo</span>
 *       <span className="ml-auto text-xs tracking-widest opacity-60">⌘Y</span>
 *     </Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item>
 *       <span>Cut</span>
 *       <span className="ml-auto text-xs tracking-widest opacity-60">⌘X</span>
 *     </Menu.Item>
 *     <Menu.Item>
 *       <span>Copy</span>
 *       <span className="ml-auto text-xs tracking-widest opacity-60">⌘C</span>
 *     </Menu.Item>
 *     <Menu.Item>
 *       <span>Paste</span>
 *       <span className="ml-auto text-xs tracking-widest opacity-60">⌘V</span>
 *     </Menu.Item>
 *   </MenuContent>
 * </Menu.Root>
 * 
 * // Menu with icons
 * <Menu.Root>
 *   <Menu.Trigger asChild>
 *     <Button variant="ghost">More Actions</Button>
 *   </Menu.Trigger>
 *   <MenuContent>
 *     <Menu.Item>
 *       <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 *         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
 *       </svg>
 *       Add item
 *     </Menu.Item>
 *     <Menu.Item>
 *       <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 *         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
 *       </svg>
 *       Edit
 *     </Menu.Item>
 *     <Menu.Item className="text-red-600">
 *       <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 *         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
 *       </svg>
 *       Delete
 *     </Menu.Item>
 *   </MenuContent>
 * </Menu.Root>
 * ```
 * 
 * ## Best Practices
 * 
 * - Use Menu for dropdown actions, navigation, and settings
 * - Group related items with Menu.Group and Menu.GroupLabel
 * - Use Menu.Separator to visually separate different sections
 * - Keep menu items concise and action-oriented
 * - Use disabled state for unavailable actions rather than hiding them
 * - Consider using icons for common actions to improve scanability
 * - Use openOnHover sparingly - it can be difficult for users with motor impairments
 * - For destructive actions, use red text color to indicate danger
 * - Use keyboard shortcuts display (but don't implement the functionality in the menu)
 * 
 * ## When to Use
 * 
 * - **Dropdown menus**: For actions related to a specific button or element
 * - **Navigation menus**: For site navigation (though consider dedicated navigation components)
 * - **Context-specific actions**: When you need click-triggered contextual actions
 * - **Settings and preferences**: For toggleable options and selections
 * - **User profile menus**: For account-related actions
 * 
 * ## When NOT to Use
 * 
 * - For primary navigation (use dedicated navigation components instead)
 * - When you need right-click context (use ContextMenu instead)
 * - For complex forms (use dedicated form components)
 * - When the list of options is very long (consider a Select component instead)
 */

interface MenuRootProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Root> {}

const MenuRoot = BaseMenu.Root
MenuRoot.displayName = 'Menu.Root'

interface MenuTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger> {
  asChild?: boolean
}

const MenuTrigger = BaseMenu.Trigger
MenuTrigger.displayName = 'Menu.Trigger'

interface MenuPortalProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Portal> {}

const MenuPortal = BaseMenu.Portal
MenuPortal.displayName = 'Menu.Portal'

interface MenuPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner> {
  className?: string
}

const MenuPositioner = React.forwardRef<HTMLDivElement, MenuPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Positioner
        ref={ref}
        className={twMerge('z-50', className)}
        {...props}
      />
    )
  }
)
MenuPositioner.displayName = 'Menu.Positioner'

interface MenuPopupProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Popup> {
  className?: string
}

const MenuPopup = React.forwardRef<HTMLDivElement, MenuPopupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Popup
        ref={ref}
        className={twMerge(
          'min-w-32 overflow-hidden rounded-md border bg-white p-1 shadow-lg',
          'dark:border-gray-800 dark:bg-gray-950',
          'data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95',
          'data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95',
          'data-[starting-style]:duration-100 data-[ending-style]:duration-75',
          className
        )}
        {...props}
      />
    )
  }
)
MenuPopup.displayName = 'Menu.Popup'

interface MenuArrowProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Arrow> {
  className?: string
}

const MenuArrow = React.forwardRef<HTMLDivElement, MenuArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Arrow
        ref={ref}
        className={twMerge(
          'fill-white stroke-gray-200 dark:fill-gray-950 dark:stroke-gray-800',
          className
        )}
        {...props}
      />
    )
  }
)
MenuArrow.displayName = 'Menu.Arrow'

interface MenuItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Item> {
  className?: string
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Item
        ref={ref}
        className={twMerge(
          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden',
          'transition-colors duration-100',
          'focus:bg-gray-100 focus:text-gray-900',
          'dark:focus:bg-gray-800 dark:focus:text-gray-50',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)
MenuItem.displayName = 'Menu.Item'

interface MenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Separator> {
  className?: string
}

const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Separator
        ref={ref}
        className={twMerge(
          '-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800',
          className
        )}
        {...props}
      />
    )
  }
)
MenuSeparator.displayName = 'Menu.Separator'

interface MenuGroupProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.Group> {
  className?: string
}

const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Group
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
)
MenuGroup.displayName = 'Menu.Group'

interface MenuGroupLabelProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel> {
  className?: string
}

const MenuGroupLabel = React.forwardRef<HTMLDivElement, MenuGroupLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.GroupLabel
        ref={ref}
        className={twMerge(
          'px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400',
          className
        )}
        {...props}
      />
    )
  }
)
MenuGroupLabel.displayName = 'Menu.GroupLabel'

interface MenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem> {
  className?: string
}

const MenuCheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseMenu.CheckboxItem
        ref={ref}
        className={twMerge(
          'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden',
          'transition-colors duration-100',
          'focus:bg-gray-100 focus:text-gray-900',
          'dark:focus:bg-gray-800 dark:focus:text-gray-50',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {children}
        </span>
      </BaseMenu.CheckboxItem>
    )
  }
)
MenuCheckboxItem.displayName = 'Menu.CheckboxItem'

interface MenuRadioGroupProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.RadioGroup> {
  className?: string
}

const MenuRadioGroup = React.forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.RadioGroup
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
)
MenuRadioGroup.displayName = 'Menu.RadioGroup'

interface MenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem> {
  className?: string
}

const MenuRadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseMenu.RadioItem
        ref={ref}
        className={twMerge(
          'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden',
          'transition-colors duration-100',
          'focus:bg-gray-100 focus:text-gray-900',
          'dark:focus:bg-gray-800 dark:focus:text-gray-50',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {children}
        </span>
      </BaseMenu.RadioItem>
    )
  }
)
MenuRadioItem.displayName = 'Menu.RadioItem'

interface MenuItemIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseMenu.ItemIndicator> {
  className?: string
}

const MenuItemIndicator = React.forwardRef<HTMLSpanElement, MenuItemIndicatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.ItemIndicator
        ref={ref}
        className={twMerge('text-current', className)}
        {...props}
      />
    )
  }
)
MenuItemIndicator.displayName = 'Menu.ItemIndicator'

// Compound components for better DX
interface MenuContentProps {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'center' | 'end'
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, align, ...props }, ref) => {
    return (
      <MenuPortal>
        <MenuPositioner side="bottom" align={align}>
          <MenuPopup ref={ref} className={className} {...props}>
            {children}
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    )
  }
)
MenuContent.displayName = 'MenuContent'

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Arrow: MenuArrow,
  Item: MenuItem,
  Separator: MenuSeparator,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  ItemIndicator: MenuItemIndicator,
}