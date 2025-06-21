import * as React from 'react'
import { Input as BaseInput } from '@base-ui-components/react/input'
import { twMerge } from 'tailwind-merge'

/**
 * Input Component
 * 
 * A flexible input component that provides a styled alternative to Field.Control.
 * Built on top of Base UI's Input component with comprehensive styling and state management.
 * 
 * @example
 * ```jsx
 * import { Input } from '@/components/ui/Input'
 * 
 * // Basic input
 * <Input placeholder="Enter your name" />
 * 
 * // With different sizes
 * <Input size="sm" placeholder="Small input" />
 * <Input size="md" placeholder="Medium input" />
 * <Input size="lg" placeholder="Large input" />
 * 
 * // Different input types
 * <Input type="email" placeholder="Email address" />
 * <Input type="password" placeholder="Password" />
 * <Input type="number" placeholder="Age" />
 * <Input type="tel" placeholder="Phone number" />
 * <Input type="url" placeholder="Website URL" />
 * 
 * // With states
 * <Input disabled placeholder="Disabled input" />
 * <Input data-invalid placeholder="Invalid input" />
 * 
 * // Controlled input
 * const [value, setValue] = React.useState('')
 * 
 * <Input 
 *   value={value} 
 *   onValueChange={(newValue) => setValue(newValue)} 
 *   placeholder="Controlled input"
 * />
 * 
 * // Full width input
 * <Input fullWidth placeholder="Full width input" />
 * 
 * // With Field component for labels and validation
 * <Field.Root>
 *   <Field.Label>Email Address</Field.Label>
 *   <Input type="email" placeholder="john@example.com" />
 *   <Field.Description>We'll never share your email.</Field.Description>
 * </Field.Root>
 * 
 * // With error state
 * <Field.Root>
 *   <Field.Label>Password</Field.Label>
 *   <Input type="password" data-invalid placeholder="Password" />
 *   <Field.Error>Password must be at least 8 characters</Field.Error>
 * </Field.Root>
 * 
 * // With custom styling
 * <Input 
 *   className="border-green-500 focus:ring-green-500" 
 *   placeholder="Custom styled input"
 * />
 * 
 * // In a form
 * <form>
 *   <Input name="firstName" placeholder="First Name" required />
 *   <Input name="lastName" placeholder="Last Name" required />
 *   <Input name="email" type="email" placeholder="Email" required />
 * </form>
 * ```
 */

interface InputProps extends React.ComponentPropsWithoutRef<typeof BaseInput> {
  /**
   * Additional CSS classes to apply to the input
   */
  className?: string
  /**
   * The size of the input
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether the input should take the full width of its container
   * @default false
   */
  fullWidth?: boolean
  /**
   * The type of input
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'month' | 'time' | 'week'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = 'md', fullWidth = false, type = 'text', ...props }, ref) => {
    const baseStyles = [
      'rounded-md border border-gray-300 dark:border-gray-700',
      'bg-white dark:bg-gray-900',
      'text-gray-900 dark:text-gray-100',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'transition-colors duration-200',
      'focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-800',
      'data-[invalid]:border-red-500 data-[invalid]:focus:border-red-500 data-[invalid]:focus:ring-red-500',
      'data-[valid]:border-green-500 data-[valid]:focus:border-green-500 data-[valid]:focus:ring-green-500',
      'data-[dirty]:border-gray-400 dark:data-[dirty]:border-gray-600',
      'data-[filled]:border-gray-400 dark:data-[filled]:border-gray-600',
      'hover:border-gray-400 dark:hover:border-gray-600',
      'data-[invalid]:hover:border-red-400',
      'data-[valid]:hover:border-green-400'
    ]
    
    const sizeStyles = {
      sm: 'h-8 px-2 text-sm',
      md: 'h-10 px-3',
      lg: 'h-12 px-4 text-lg'
    }
    
    const widthStyles = fullWidth ? 'w-full' : ''
    
    return (
      <BaseInput
        ref={ref}
        type={type}
        className={twMerge(
          baseStyles,
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'