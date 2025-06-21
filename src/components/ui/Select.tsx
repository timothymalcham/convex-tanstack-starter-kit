import * as React from 'react'
import { Select as BaseSelect } from '@base-ui-components/react/select'
import { twMerge } from 'tailwind-merge'

/**
 * Select Component
 * 
 * A common form component for choosing a predefined value in a dropdown menu,
 * perfect for country selection, categories, settings, and any single-choice scenarios.
 * 
 * @example
 * ```jsx
 * import { Select, SelectContent } from '@/components/ui/Select'
 * import { Field } from '@/components/ui/Field'
 * 
 * // Basic select
 * <Select.Root defaultValue="medium">
 *   <Select.Trigger>
 *     <Select.Value placeholder="Select size..." />
 *     <Select.Icon />
 *   </Select.Trigger>
 *   <SelectContent>
 *     <Select.Item value="small">
 *       <Select.ItemText>Small</Select.ItemText>
 *       <Select.ItemIndicator />
 *     </Select.Item>
 *     <Select.Item value="medium">
 *       <Select.ItemText>Medium</Select.ItemText>
 *       <Select.ItemIndicator />
 *     </Select.Item>
 *     <Select.Item value="large">
 *       <Select.ItemText>Large</Select.ItemText>
 *       <Select.ItemIndicator />
 *     </Select.Item>
 *   </SelectContent>
 * </Select.Root>
 * 
 * // With Field component for forms
 * <Field.Root>
 *   <Field.Label required>Country</Field.Label>
 *   <Select.Root>
 *     <Select.Trigger>
 *       <Select.Value placeholder="Select your country..." />
 *       <Select.Icon />
 *     </Select.Trigger>
 *     <SelectContent>
 *       <Select.Item value="us">
 *         <Select.ItemText>🇺🇸 United States</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="ca">
 *         <Select.ItemText>🇨🇦 Canada</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="uk">
 *         <Select.ItemText>🇬🇧 United Kingdom</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="fr">
 *         <Select.ItemText>🇫🇷 France</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="de">
 *         <Select.ItemText>🇩🇪 Germany</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *     </SelectContent>
 *   </Select.Root>
 *   <Field.Description>
 *     This helps us provide localized content
 *   </Field.Description>
 * </Field.Root>
 * 
 * // Grouped options
 * <Select.Root>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Choose a font..." />
 *     <Select.Icon />
 *   </Select.Trigger>
 *   <SelectContent>
 *     <Select.Group>
 *       <Select.GroupLabel>Serif</Select.GroupLabel>
 *       <Select.Item value="times">
 *         <Select.ItemText>Times New Roman</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="georgia">
 *         <Select.ItemText>Georgia</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="garamond">
 *         <Select.ItemText>Garamond</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *     </Select.Group>
 *     
 *     <Select.Group>
 *       <Select.GroupLabel>Sans Serif</Select.GroupLabel>
 *       <Select.Item value="helvetica">
 *         <Select.ItemText>Helvetica</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="arial">
 *         <Select.ItemText>Arial</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="system">
 *         <Select.ItemText>System UI</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *     </Select.Group>
 *     
 *     <Select.Group>
 *       <Select.GroupLabel>Monospace</Select.GroupLabel>
 *       <Select.Item value="monaco">
 *         <Select.ItemText>Monaco</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="courier">
 *         <Select.ItemText>Courier New</Select.ItemText>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *     </Select.Group>
 *   </SelectContent>
 * </Select.Root>
 * 
 * // With custom item content
 * <Select.Root>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Select team member..." />
 *     <Select.Icon />
 *   </Select.Trigger>
 *   <SelectContent>
 *     {teamMembers.map((member) => (
 *       <Select.Item key={member.id} value={member.id}>
 *         <div className="flex items-center gap-3">
 *           <img 
 *             src={member.avatar} 
 *             alt={member.name}
 *             className="w-8 h-8 rounded-full"
 *           />
 *           <div>
 *             <Select.ItemText>{member.name}</Select.ItemText>
 *             <div className="text-xs text-gray-500">{member.role}</div>
 *           </div>
 *         </div>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *     ))}
 *   </SelectContent>
 * </Select.Root>
 * 
 * // Controlled select
 * const [status, setStatus] = React.useState('draft')
 * 
 * <div className="space-y-3">
 *   <Select.Root value={status} onValueChange={setStatus}>
 *     <Select.Trigger>
 *       <Select.Value />
 *       <Select.Icon />
 *     </Select.Trigger>
 *     <SelectContent>
 *       <Select.Item value="draft">
 *         <div className="flex items-center gap-2">
 *           <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
 *           <Select.ItemText>Draft</Select.ItemText>
 *         </div>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="review">
 *         <div className="flex items-center gap-2">
 *           <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
 *           <Select.ItemText>In Review</Select.ItemText>
 *         </div>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="published">
 *         <div className="flex items-center gap-2">
 *           <div className="w-2 h-2 bg-green-400 rounded-full"></div>
 *           <Select.ItemText>Published</Select.ItemText>
 *         </div>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *       <Select.Item value="archived">
 *         <div className="flex items-center gap-2">
 *           <div className="w-2 h-2 bg-red-400 rounded-full"></div>
 *           <Select.ItemText>Archived</Select.ItemText>
 *         </div>
 *         <Select.ItemIndicator />
 *       </Select.Item>
 *     </SelectContent>
 *   </Select.Root>
 *   
 *   <div className="text-sm text-gray-600">
 *     Current status: <span className="font-medium">{status}</span>
 *   </div>
 * </div>
 * 
 * // Settings select
 * <div className="space-y-4">
 *   <h3 className="font-semibold">Preferences</h3>
 *   
 *   <div className="grid grid-cols-2 gap-4">
 *     <div>
 *       <label className="block text-sm font-medium mb-2">Theme</label>
 *       <Select.Root defaultValue="system">
 *         <Select.Trigger>
 *           <Select.Value />
 *           <Select.Icon />
 *         </Select.Trigger>
 *         <SelectContent>
 *           <Select.Item value="light">
 *             <Select.ItemText>Light</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="dark">
 *             <Select.ItemText>Dark</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="system">
 *             <Select.ItemText>System</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *         </SelectContent>
 *       </Select.Root>
 *     </div>
 *     
 *     <div>
 *       <label className="block text-sm font-medium mb-2">Language</label>
 *       <Select.Root defaultValue="en">
 *         <Select.Trigger>
 *           <Select.Value />
 *           <Select.Icon />
 *         </Select.Trigger>
 *         <SelectContent>
 *           <Select.Item value="en">
 *             <Select.ItemText>English</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="es">
 *             <Select.ItemText>Español</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="fr">
 *             <Select.ItemText>Français</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="de">
 *             <Select.ItemText>Deutsch</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *         </SelectContent>
 *       </Select.Root>
 *     </div>
 *   </div>
 * </div>
 * 
 * // Disabled state
 * <Select.Root disabled>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Not available" />
 *     <Select.Icon />
 *   </Select.Trigger>
 *   <SelectContent>
 *     <Select.Item value="option1">
 *       <Select.ItemText>Option 1</Select.ItemText>
 *       <Select.ItemIndicator />
 *     </Select.Item>
 *   </SelectContent>
 * </Select.Root>
 * 
 * // Multiple selects in a form
 * <form className="space-y-6">
 *   <div className="grid grid-cols-3 gap-4">
 *     <Field.Root>
 *       <Field.Label>Priority</Field.Label>
 *       <Select.Root>
 *         <Select.Trigger>
 *           <Select.Value placeholder="Select..." />
 *           <Select.Icon />
 *         </Select.Trigger>
 *         <SelectContent>
 *           <Select.Item value="low">
 *             <Select.ItemText>Low</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="medium">
 *             <Select.ItemText>Medium</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="high">
 *             <Select.ItemText>High</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="urgent">
 *             <Select.ItemText>Urgent</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *         </SelectContent>
 *       </Select.Root>
 *     </Field.Root>
 *     
 *     <Field.Root>
 *       <Field.Label>Category</Field.Label>
 *       <Select.Root>
 *         <Select.Trigger>
 *           <Select.Value placeholder="Select..." />
 *           <Select.Icon />
 *         </Select.Trigger>
 *         <SelectContent>
 *           <Select.Item value="bug">
 *             <Select.ItemText>Bug</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="feature">
 *             <Select.ItemText>Feature</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="improvement">
 *             <Select.ItemText>Improvement</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *         </SelectContent>
 *       </Select.Root>
 *     </Field.Root>
 *     
 *     <Field.Root>
 *       <Field.Label>Assignee</Field.Label>
 *       <Select.Root>
 *         <Select.Trigger>
 *           <Select.Value placeholder="Select..." />
 *           <Select.Icon />
 *         </Select.Trigger>
 *         <SelectContent>
 *           <Select.Item value="unassigned">
 *             <Select.ItemText>Unassigned</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="john">
 *             <Select.ItemText>John Doe</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Item value="jane">
 *             <Select.ItemText>Jane Smith</Select.ItemText>
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *         </SelectContent>
 *       </Select.Root>
 *     </Field.Root>
 *   </div>
 * </form>
 * ```
 */

interface SelectRootProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Root> {}

const SelectRoot = BaseSelect.Root
SelectRoot.displayName = 'Select.Root'

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> {
  className?: string
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Trigger
        ref={ref}
        className={twMerge(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2',
          'text-sm ring-offset-white transition-colors',
          'placeholder:text-gray-500',
          'hover:border-gray-400',
          'focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[placeholder]:text-gray-500',
          'dark:border-gray-700 dark:bg-gray-950 dark:ring-offset-gray-950',
          'dark:placeholder:text-gray-400',
          'dark:hover:border-gray-600',
          'dark:focus:border-blue-400',
          className
        )}
        {...props}
      />
    )
  }
)
SelectTrigger.displayName = 'Select.Trigger'

interface SelectValueProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Value> {
  className?: string
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Value
        ref={ref}
        className={twMerge('flex-1 text-left truncate', className)}
        {...props}
      />
    )
  }
)
SelectValue.displayName = 'Select.Value'

interface SelectIconProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Icon> {
  className?: string
}

const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Icon
        ref={ref}
        className={twMerge(
          'ml-2 h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200',
          'group-data-[open]:rotate-180',
          className
        )}
        {...props}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </BaseSelect.Icon>
    )
  }
)
SelectIcon.displayName = 'Select.Icon'

interface SelectPortalProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Portal> {}

const SelectPortal = BaseSelect.Portal
SelectPortal.displayName = 'Select.Portal'

interface SelectPositionerProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner> {
  className?: string
}

const SelectPositioner = React.forwardRef<HTMLDivElement, SelectPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Positioner
        ref={ref}
        className={twMerge('z-50', className)}
        {...props}
      />
    )
  }
)
SelectPositioner.displayName = 'Select.Positioner'

interface SelectPopupProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Popup> {
  className?: string
}

const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Popup
        ref={ref}
        className={twMerge(
          'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-white p-1 shadow-lg',
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
SelectPopup.displayName = 'Select.Popup'

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Item> {
  className?: string
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Item
        ref={ref}
        className={twMerge(
          'relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm py-1.5 pl-8 pr-2 text-sm',
          'outline-hidden transition-colors',
          'hover:bg-gray-100 hover:text-gray-900',
          'focus:bg-gray-100 focus:text-gray-900',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          'data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900',
          'dark:hover:bg-gray-800 dark:hover:text-gray-50',
          'dark:focus:bg-gray-800 dark:focus:text-gray-50',
          'dark:data-[highlighted]:bg-gray-800 dark:data-[highlighted]:text-gray-50',
          className
        )}
        {...props}
      />
    )
  }
)
SelectItem.displayName = 'Select.Item'

interface SelectItemTextProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.ItemText> {
  className?: string
}

const SelectItemText = React.forwardRef<HTMLSpanElement, SelectItemTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.ItemText
        ref={ref}
        className={twMerge('flex-1 truncate', className)}
        {...props}
      />
    )
  }
)
SelectItemText.displayName = 'Select.ItemText'

interface SelectItemIndicatorProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.ItemIndicator> {
  className?: string
}

const SelectItemIndicator = React.forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.ItemIndicator
        ref={ref}
        className={twMerge(
          'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
          className
        )}
        {...props}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 3.5L4.5 9.5L1.5 6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseSelect.ItemIndicator>
    )
  }
)
SelectItemIndicator.displayName = 'Select.ItemIndicator'

interface SelectGroupProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Group> {
  className?: string
}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Group
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
)
SelectGroup.displayName = 'Select.Group'

interface SelectGroupLabelProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel> {
  className?: string
}

const SelectGroupLabel = React.forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.GroupLabel
        ref={ref}
        className={twMerge(
          'py-1.5 pl-8 pr-2 text-xs font-semibold text-gray-500 dark:text-gray-400',
          className
        )}
        {...props}
      />
    )
  }
)
SelectGroupLabel.displayName = 'Select.GroupLabel'

// Compound component for better DX
interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className }, ref) => {
    return (
      <SelectPortal>
        <SelectPositioner>
          <SelectPopup ref={ref} className={className}>
            {children}
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    )
  }
)
SelectContent.displayName = 'SelectContent'

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: SelectPortal,
  Positioner: SelectPositioner,
  Popup: SelectPopup,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
}