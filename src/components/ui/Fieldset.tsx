import * as React from 'react'
import { Fieldset as BaseFieldset } from '@base-ui-components/react/fieldset'
import { twMerge } from 'tailwind-merge'

/**
 * Fieldset Component
 * 
 * Groups related form controls together with an optional legend. Provides semantic
 * structure and accessibility benefits for complex forms.
 * 
 * @example
 * ```jsx
 * import { Fieldset } from '@/components/ui/Fieldset'
 * import { Field } from '@/components/ui/Field'
 * import { Checkbox } from '@/components/ui/Checkbox'
 * 
 * // Basic fieldset with legend
 * <Fieldset.Root>
 *   <Fieldset.Legend>Personal Information</Fieldset.Legend>
 *   <div className="space-y-4">
 *     <Field.Root>
 *       <Field.Label htmlFor="firstName">First Name</Field.Label>
 *       <Field.Control id="firstName" placeholder="Enter your first name" />
 *     </Field.Root>
 *     <Field.Root>
 *       <Field.Label htmlFor="lastName">Last Name</Field.Label>
 *       <Field.Control id="lastName" placeholder="Enter your last name" />
 *     </Field.Root>
 *   </div>
 * </Fieldset.Root>
 * 
 * // Fieldset with disabled state
 * <Fieldset.Root disabled>
 *   <Fieldset.Legend>Billing Address</Fieldset.Legend>
 *   <div className="space-y-4">
 *     <Field.Root>
 *       <Field.Label htmlFor="address">Address</Field.Label>
 *       <Field.Control id="address" placeholder="Enter your address" />
 *     </Field.Root>
 *     <Field.Root>
 *       <Field.Label htmlFor="city">City</Field.Label>
 *       <Field.Control id="city" placeholder="Enter your city" />
 *     </Field.Root>
 *   </div>
 * </Fieldset.Root>
 * 
 * // Fieldset with checkbox group
 * <Fieldset.Root>
 *   <Fieldset.Legend>Preferences</Fieldset.Legend>
 *   <div className="space-y-3 mt-3">
 *     <label className="flex items-center space-x-2">
 *       <Checkbox.Root>
 *         <Checkbox.Indicator />
 *       </Checkbox.Root>
 *       <span>Email notifications</span>
 *     </label>
 *     <label className="flex items-center space-x-2">
 *       <Checkbox.Root>
 *         <Checkbox.Indicator />
 *       </Checkbox.Root>
 *       <span>SMS notifications</span>
 *     </label>
 *     <label className="flex items-center space-x-2">
 *       <Checkbox.Root>
 *         <Checkbox.Indicator />
 *       </Checkbox.Root>
 *       <span>Push notifications</span>
 *     </label>
 *   </div>
 * </Fieldset.Root>
 * 
 * // Fieldset with custom styling
 * <Fieldset.Root className="border-2 border-dashed border-gray-300 dark:border-gray-600">
 *   <Fieldset.Legend className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-3 py-1 rounded">
 *     Advanced Settings
 *   </Fieldset.Legend>
 *   <div className="space-y-4">
 *     <Field.Root>
 *       <Field.Label htmlFor="apiKey">API Key</Field.Label>
 *       <Field.Control id="apiKey" type="password" placeholder="Enter your API key" />
 *       <Field.Description>
 *         This key will be used to authenticate API requests
 *       </Field.Description>
 *     </Field.Root>
 *   </div>
 * </Fieldset.Root>
 * 
 * // Nested fieldsets for complex forms
 * <form className="space-y-8">
 *   <Fieldset.Root>
 *     <Fieldset.Legend>Account Information</Fieldset.Legend>
 *     <div className="space-y-4">
 *       <Field.Root>
 *         <Field.Label htmlFor="email">Email</Field.Label>
 *         <Field.Control id="email" type="email" />
 *       </Field.Root>
 *       <Field.Root>
 *         <Field.Label htmlFor="password">Password</Field.Label>
 *         <Field.Control id="password" type="password" />
 *       </Field.Root>
 *     </div>
 *   </Fieldset.Root>
 * 
 *   <Fieldset.Root>
 *     <Fieldset.Legend>Profile Settings</Fieldset.Legend>
 *     <div className="space-y-4">
 *       <Field.Root>
 *         <Field.Label htmlFor="displayName">Display Name</Field.Label>
 *         <Field.Control id="displayName" />
 *       </Field.Root>
 *       <Field.Root>
 *         <Field.Label htmlFor="bio">Bio</Field.Label>
 *         <Field.Control id="bio" />
 *       </Field.Root>
 *     </div>
 *   </Fieldset.Root>
 * </form>
 * 
 * // Fieldset with radio group functionality
 * <Fieldset.Root>
 *   <Fieldset.Legend>Subscription Plan</Fieldset.Legend>
 *   <div className="space-y-3 mt-3">
 *     <label className="flex items-center space-x-2">
 *       <input type="radio" name="plan" value="free" className="text-blue-600" />
 *       <div>
 *         <div className="font-medium">Free Plan</div>
 *         <div className="text-sm text-gray-500">Basic features included</div>
 *       </div>
 *     </label>
 *     <label className="flex items-center space-x-2">
 *       <input type="radio" name="plan" value="pro" className="text-blue-600" />
 *       <div>
 *         <div className="font-medium">Pro Plan</div>
 *         <div className="text-sm text-gray-500">Advanced features and priority support</div>
 *       </div>
 *     </label>
 *   </div>
 * </Fieldset.Root>
 * ```
 * 
 * ## Best Practices
 * 
 * - Use fieldsets to group related form controls together
 * - Always provide a descriptive legend that explains the purpose of the grouped fields
 * - Consider accessibility - screen readers announce the legend when navigating to fields within the fieldset
 * - Nest fieldsets sparingly - too much nesting can confuse users and assistive technologies
 * - Use the disabled prop to disable all controls within a fieldset at once
 * - Combine with other form components like Field, Checkbox, and Radio for complete form solutions
 * 
 * ## Accessibility
 * 
 * - The fieldset element provides semantic grouping for form controls
 * - The legend element serves as an accessible name for the fieldset
 * - Screen readers announce the legend when users navigate to any control within the fieldset
 * - The disabled attribute on the fieldset automatically disables all contained form controls
 */

interface FieldsetRootProps extends React.ComponentPropsWithoutRef<typeof BaseFieldset.Root> {
  className?: string
}

const FieldsetRoot = React.forwardRef<HTMLFieldSetElement, FieldsetRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseFieldset.Root
        ref={ref}
        className={twMerge(
          'border border-gray-200 dark:border-gray-700 rounded-lg p-6',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
          'dark:focus-within:ring-offset-gray-900',
          className
        )}
        {...props}
      />
    )
  }
)
FieldsetRoot.displayName = 'Fieldset.Root'

interface FieldsetLegendProps extends React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend> {
  className?: string
}

const FieldsetLegend = React.forwardRef<HTMLDivElement, FieldsetLegendProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseFieldset.Legend
        ref={ref}
        className={twMerge(
          'text-base font-semibold text-gray-900 dark:text-gray-100',
          'mb-4 px-2 -mx-2 -mt-3 bg-white dark:bg-gray-900',
          'border-b border-gray-200 dark:border-gray-700 pb-2',
          className
        )}
        {...props}
      />
    )
  }
)
FieldsetLegend.displayName = 'Fieldset.Legend'

export const Fieldset = {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
}