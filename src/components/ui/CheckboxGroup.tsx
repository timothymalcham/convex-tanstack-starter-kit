import * as React from 'react'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui-components/react/checkbox-group'
import { twMerge } from 'tailwind-merge'
import { Checkbox } from './Checkbox'

/**
 * CheckboxGroup Component
 * 
 * Manages shared state for multiple checkboxes, enabling collective selection.
 * 
 * @example
 * ```jsx
 * import { CheckboxGroup } from '@/components/ui/CheckboxGroup'
 * import { Field } from '@/components/ui/Field'
 * 
 * // Basic checkbox group
 * const [selectedValues, setSelectedValues] = React.useState(['option1'])
 * 
 * <CheckboxGroup.Root value={selectedValues} onValueChange={setSelectedValues}>
 *   <div className="space-y-2">
 *     <CheckboxGroup.Item value="option1">
 *       <CheckboxGroup.Indicator />
 *       Option 1
 *     </CheckboxGroup.Item>
 *     <CheckboxGroup.Item value="option2">
 *       <CheckboxGroup.Indicator />
 *       Option 2
 *     </CheckboxGroup.Item>
 *     <CheckboxGroup.Item value="option3">
 *       <CheckboxGroup.Indicator />
 *       Option 3
 *     </CheckboxGroup.Item>
 *   </div>
 * </CheckboxGroup.Root>
 * 
 * // With Field component for form integration
 * <Field.Root>
 *   <Field.Label>Select your interests</Field.Label>
 *   <CheckboxGroup.Root defaultValue={['tech', 'design']}>
 *     <div className="grid grid-cols-2 gap-4 mt-2">
 *       <CheckboxGroup.Item value="tech">
 *         <CheckboxGroup.Indicator />
 *         Technology
 *       </CheckboxGroup.Item>
 *       <CheckboxGroup.Item value="design">
 *         <CheckboxGroup.Indicator />
 *         Design
 *       </CheckboxGroup.Item>
 *       <CheckboxGroup.Item value="business">
 *         <CheckboxGroup.Indicator />
 *         Business
 *       </CheckboxGroup.Item>
 *       <CheckboxGroup.Item value="marketing">
 *         <CheckboxGroup.Indicator />
 *         Marketing
 *       </CheckboxGroup.Item>
 *     </div>
 *   </CheckboxGroup.Root>
 *   <Field.Description>
 *     Choose topics you're interested in learning about
 *   </Field.Description>
 * </Field.Root>
 * 
 * // Parent checkbox with "Select All" functionality
 * const allOptions = ['apple', 'banana', 'orange', 'grape']
 * const [fruits, setFruits] = React.useState([])
 * 
 * <CheckboxGroup.Root 
 *   value={fruits} 
 *   onValueChange={setFruits}
 *   allValues={allOptions}
 * >
 *   <div className="space-y-3">
 *     <CheckboxGroup.Parent>
 *       <CheckboxGroup.Indicator />
 *       Select All Fruits
 *     </CheckboxGroup.Parent>
 *     <div className="ml-6 space-y-2">
 *       {allOptions.map((fruit) => (
 *         <CheckboxGroup.Item key={fruit} value={fruit}>
 *           <CheckboxGroup.Indicator />
 *           {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
 *         </CheckboxGroup.Item>
 *       ))}
 *     </div>
 *   </div>
 * </CheckboxGroup.Root>
 * 
 * // Disabled group
 * <CheckboxGroup.Root disabled>
 *   <CheckboxGroup.Item value="disabled1">
 *     <CheckboxGroup.Indicator />
 *     This is disabled
 *   </CheckboxGroup.Item>
 * </CheckboxGroup.Root>
 * ```
 */

interface CheckboxGroupRootProps extends React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup.Root> {
  className?: string
}

const CheckboxGroupRoot = React.forwardRef<HTMLDivElement, CheckboxGroupRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCheckboxGroup.Root
        ref={ref}
        className={twMerge('group', className)}
        {...props}
      />
    )
  }
)
CheckboxGroupRoot.displayName = 'CheckboxGroup.Root'

interface CheckboxGroupItemProps extends React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup.Item> {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const CheckboxGroupItem = React.forwardRef<HTMLLabelElement, CheckboxGroupItemProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    return (
      <BaseCheckboxGroup.Item
        ref={ref}
        className={twMerge(
          'flex items-center gap-2 cursor-pointer',
          'group-disabled:cursor-not-allowed group-disabled:opacity-50',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded p-1 -m-1',
          'transition-colors duration-150',
          className
        )}
        render={(props) => (
          <label {...props}>
            <Checkbox.Root size={size} {...props.checkboxProps}>
              <Checkbox.Indicator />
            </Checkbox.Root>
            {children && (
              <span className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {children}
              </span>
            )}
          </label>
        )}
        {...props}
      />
    )
  }
)
CheckboxGroupItem.displayName = 'CheckboxGroup.Item'

interface CheckboxGroupParentProps extends React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup.Parent> {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const CheckboxGroupParent = React.forwardRef<HTMLLabelElement, CheckboxGroupParentProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    return (
      <BaseCheckboxGroup.Parent
        ref={ref}
        className={twMerge(
          'flex items-center gap-2 cursor-pointer font-medium',
          'group-disabled:cursor-not-allowed group-disabled:opacity-50',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded p-1 -m-1',
          'transition-colors duration-150',
          className
        )}
        render={(props) => (
          <label {...props}>
            <Checkbox.Root size={size} {...props.checkboxProps}>
              <Checkbox.Indicator />
            </Checkbox.Root>
            {children && (
              <span className="select-none text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {children}
              </span>
            )}
          </label>
        )}
        {...props}
      />
    )
  }
)
CheckboxGroupParent.displayName = 'CheckboxGroup.Parent'

// Re-export the Indicator from our Checkbox component for consistency
const CheckboxGroupIndicator = Checkbox.Indicator
CheckboxGroupIndicator.displayName = 'CheckboxGroup.Indicator'

export const CheckboxGroup = {
  Root: CheckboxGroupRoot,
  Item: CheckboxGroupItem,
  Parent: CheckboxGroupParent,
  Indicator: CheckboxGroupIndicator,
}