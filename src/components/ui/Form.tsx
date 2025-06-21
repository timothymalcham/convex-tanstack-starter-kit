import * as React from 'react'
import { Form as BaseForm } from '@base-ui-components/react/form'
import { twMerge } from 'tailwind-merge'

/**
 * Form Component
 * 
 * A comprehensive form wrapper that provides validation, error handling, and state management.
 * Built on top of Base UI's Form component with enhanced styling and TypeScript support.
 * Integrates seamlessly with Field, Button, and other form components.
 * 
 * @example
 * ```jsx
 * import { Form } from '@/components/ui/Form'
 * import { Field } from '@/components/ui/Field'
 * import { Button } from '@/components/ui/Button'
 * import { z } from 'zod'
 * import { useState } from 'react'
 * 
 * // Basic form with validation
 * const schema = z.object({
 *   email: z.string().email('Please enter a valid email'),
 *   password: z.string().min(8, 'Password must be at least 8 characters')
 * })
 * 
 * function LoginForm() {
 *   const [errors, setErrors] = useState({})
 * 
 *   const handleSubmit = async (event) => {
 *     event.preventDefault()
 *     const formData = new FormData(event.currentTarget)
 *     const data = Object.fromEntries(formData)
 * 
 *     try {
 *       schema.parse(data)
 *       // Process valid data
 *       console.log('Valid data:', data)
 *       setErrors({})
 *     } catch (error) {
 *       if (error instanceof z.ZodError) {
 *         const fieldErrors = {}
 *         error.errors.forEach(err => {
 *           fieldErrors[err.path[0]] = err.message
 *         })
 *         setErrors(fieldErrors)
 *       }
 *     }
 *   }
 * 
 *   return (
 *     <Form.Root 
 *       errors={errors} 
 *       onClearErrors={() => setErrors({})}
 *       onSubmit={handleSubmit}
 *       className="max-w-md mx-auto"
 *     >
 *       <Field.Root name="email">
 *         <Field.Label required>Email</Field.Label>
 *         <Field.Control type="email" placeholder="Enter your email" />
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       <Field.Root name="password">
 *         <Field.Label required>Password</Field.Label>
 *         <Field.Control type="password" placeholder="Enter your password" />
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       <Button type="submit" fullWidth>
 *         Sign In
 *       </Button>
 *     </Form.Root>
 *   )
 * }
 * 
 * // Form with custom validation
 * function ContactForm() {
 *   const [errors, setErrors] = useState({})
 *   const [isSubmitting, setIsSubmitting] = useState(false)
 * 
 *   const validateForm = (data) => {
 *     const newErrors = {}
 *     
 *     if (!data.name?.trim()) {
 *       newErrors.name = 'Name is required'
 *     }
 *     
 *     if (!data.email?.trim()) {
 *       newErrors.email = 'Email is required'
 *     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
 *       newErrors.email = 'Please enter a valid email'
 *     }
 *     
 *     if (!data.message?.trim()) {
 *       newErrors.message = 'Message is required'
 *     } else if (data.message.length < 10) {
 *       newErrors.message = 'Message must be at least 10 characters'
 *     }
 *     
 *     return newErrors
 *   }
 * 
 *   const handleSubmit = async (event) => {
 *     event.preventDefault()
 *     setIsSubmitting(true)
 *     
 *     const formData = new FormData(event.currentTarget)
 *     const data = Object.fromEntries(formData)
 *     
 *     const validationErrors = validateForm(data)
 *     
 *     if (Object.keys(validationErrors).length > 0) {
 *       setErrors(validationErrors)
 *       setIsSubmitting(false)
 *       return
 *     }
 *     
 *     try {
 *       // Simulate API call
 *       await new Promise(resolve => setTimeout(resolve, 1000))
 *       console.log('Form submitted:', data)
 *       setErrors({})
 *       event.currentTarget.reset()
 *     } catch (error) {
 *       setErrors({ submit: 'Failed to submit form. Please try again.' })
 *     } finally {
 *       setIsSubmitting(false)
 *     }
 *   }
 * 
 *   return (
 *     <Form.Root 
 *       errors={errors}
 *       onClearErrors={() => setErrors({})}
 *       onSubmit={handleSubmit}
 *       className="space-y-6"
 *     >
 *       <Field.Root name="name">
 *         <Field.Label required>Full Name</Field.Label>
 *         <Field.Control placeholder="Enter your full name" />
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       <Field.Root name="email">
 *         <Field.Label required>Email Address</Field.Label>
 *         <Field.Control type="email" placeholder="Enter your email" />
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       <Field.Root name="message">
 *         <Field.Label required>Message</Field.Label>
 *         <Field.Control 
 *           as="textarea" 
 *           rows={4} 
 *           placeholder="Enter your message"
 *           className="resize-none"
 *         />
 *         <Field.Description>
 *           Please provide at least 10 characters
 *         </Field.Description>
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       {errors.submit && (
 *         <div className="text-red-600 dark:text-red-400 text-sm">
 *           {errors.submit}
 *         </div>
 *       )}
 * 
 *       <Button 
 *         type="submit" 
 *         disabled={isSubmitting}
 *         className="w-full"
 *       >
 *         {isSubmitting ? 'Sending...' : 'Send Message'}
 *       </Button>
 *     </Form.Root>
 *   )
 * }
 * 
 * // Form with conditional fields
 * function RegistrationForm() {
 *   const [errors, setErrors] = useState({})
 *   const [accountType, setAccountType] = useState('personal')
 * 
 *   const handleSubmit = async (event) => {
 *     event.preventDefault()
 *     const formData = new FormData(event.currentTarget)
 *     const data = Object.fromEntries(formData)
 *     
 *     // Custom validation based on account type
 *     const newErrors = {}
 *     
 *     if (!data.email) newErrors.email = 'Email is required'
 *     if (!data.password) newErrors.password = 'Password is required'
 *     
 *     if (accountType === 'business') {
 *       if (!data.companyName) {
 *         newErrors.companyName = 'Company name is required for business accounts'
 *       }
 *       if (!data.taxId) {
 *         newErrors.taxId = 'Tax ID is required for business accounts'
 *       }
 *     }
 *     
 *     if (Object.keys(newErrors).length > 0) {
 *       setErrors(newErrors)
 *       return
 *     }
 *     
 *     console.log('Registration data:', data)
 *     setErrors({})
 *   }
 * 
 *   return (
 *     <Form.Root 
 *       errors={errors}
 *       onClearErrors={() => setErrors({})}
 *       onSubmit={handleSubmit}
 *       className="max-w-lg"
 *     >
 *       <Field.Root name="accountType">
 *         <Field.Label>Account Type</Field.Label>
 *         <Field.Control 
 *           as="select" 
 *           value={accountType}
 *           onChange={(e) => setAccountType(e.target.value)}
 *         >
 *           <option value="personal">Personal</option>
 *           <option value="business">Business</option>
 *         </Field.Control>
 *       </Field.Root>
 * 
 *       <Field.Root name="email">
 *         <Field.Label required>Email</Field.Label>
 *         <Field.Control type="email" placeholder="Enter your email" />
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       <Field.Root name="password">
 *         <Field.Label required>Password</Field.Label>
 *         <Field.Control type="password" placeholder="Create a password" />
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       {accountType === 'business' && (
 *         <>
 *           <Field.Root name="companyName">
 *             <Field.Label required>Company Name</Field.Label>
 *             <Field.Control placeholder="Enter company name" />
 *             <Field.Error />
 *           </Field.Root>
 * 
 *           <Field.Root name="taxId">
 *             <Field.Label required>Tax ID</Field.Label>
 *             <Field.Control placeholder="Enter tax ID" />
 *             <Field.Error />
 *           </Field.Root>
 *         </>
 *       )}
 * 
 *       <Button type="submit" fullWidth>
 *         Create Account
 *       </Button>
 *     </Form.Root>
 *   )
 * }
 * 
 * // Form with async validation
 * function UsernameForm() {
 *   const [errors, setErrors] = useState({})
 *   const [isChecking, setIsChecking] = useState(false)
 * 
 *   const checkUsernameAvailability = async (username) => {
 *     // Simulate API call to check username
 *     return new Promise((resolve) => {
 *       setTimeout(() => {
 *         resolve(!['admin', 'user', 'test'].includes(username.toLowerCase()))
 *       }, 500)
 *     })
 *   }
 * 
 *   const handleUsernameBlur = async (event) => {
 *     const username = event.target.value.trim()
 *     if (!username) return
 * 
 *     setIsChecking(true)
 *     const isAvailable = await checkUsernameAvailability(username)
 *     
 *     if (!isAvailable) {
 *       setErrors({ username: 'This username is already taken' })
 *     } else {
 *       setErrors({ ...errors, username: undefined })
 *     }
 *     setIsChecking(false)
 *   }
 * 
 *   const handleSubmit = async (event) => {
 *     event.preventDefault()
 *     if (Object.values(errors).some(Boolean)) return
 *     
 *     const formData = new FormData(event.currentTarget)
 *     console.log('Username selected:', formData.get('username'))
 *   }
 * 
 *   return (
 *     <Form.Root 
 *       errors={errors}
 *       onClearErrors={() => setErrors({})}
 *       onSubmit={handleSubmit}
 *     >
 *       <Field.Root name="username">
 *         <Field.Label required>Choose Username</Field.Label>
 *         <Field.Control 
 *           placeholder="Enter username"
 *           onBlur={handleUsernameBlur}
 *         />
 *         {isChecking && (
 *           <Field.Description>Checking availability...</Field.Description>
 *         )}
 *         <Field.Error />
 *       </Field.Root>
 * 
 *       <Button 
 *         type="submit" 
 *         disabled={isChecking || Object.values(errors).some(Boolean)}
 *       >
 *         Continue
 *       </Button>
 *     </Form.Root>
 *   )
 * }
 * ```
 * 
 * ## Integration with TanStack Form
 * 
 * ```jsx
 * import { useForm } from '@tanstack/react-form'
 * import { Form } from '@/components/ui/Form'
 * import { Field } from '@/components/ui/Field'
 * 
 * function TanStackFormExample() {
 *   const form = useForm({
 *     defaultValues: {
 *       firstName: '',
 *       lastName: '',
 *       email: ''
 *     },
 *     onSubmit: async ({ value }) => {
 *       console.log('Form submitted:', value)
 *     }
 *   })
 * 
 *   return (
 *     <Form.Root
 *       onSubmit={(e) => {
 *         e.preventDefault()
 *         form.handleSubmit()
 *       }}
 *     >
 *       <form.Field
 *         name="firstName"
 *         validators={{
 *           onChange: ({ value }) => 
 *             !value ? 'First name is required' : undefined
 *         }}
 *       >
 *         {(field) => (
 *           <Field.Root name={field.name}>
 *             <Field.Label>First Name</Field.Label>
 *             <Field.Control
 *               value={field.state.value}
 *               onBlur={field.handleBlur}
 *               onChange={(e) => field.handleChange(e.target.value)}
 *             />
 *             {field.state.meta.errors && (
 *               <Field.Error>{field.state.meta.errors[0]}</Field.Error>
 *             )}
 *           </Field.Root>
 *         )}
 *       </form.Field>
 * 
 *       <Button type="submit">Submit</Button>
 *     </Form.Root>
 *   )
 * }
 * ```
 * 
 * ## Best Practices
 * 
 * - Always provide meaningful error messages that help users understand what to fix
 * - Use the `required` prop on Field.Label to indicate required fields visually
 * - Implement both client-side and server-side validation for security
 * - Clear errors when users start typing in a field to provide immediate feedback
 * - Use loading states during form submission to provide user feedback
 * - Group related fields using Fieldset components for better organization
 * - Implement proper accessibility attributes for screen readers
 * - Consider using debounced validation for async checks to avoid excessive API calls
 * 
 * ## Accessibility
 * 
 * - Form errors are automatically associated with their corresponding fields
 * - The form element provides semantic structure for assistive technologies
 * - All form controls should have accessible labels via Field.Label
 * - Error messages are announced by screen readers when they appear
 * - Focus management is handled automatically during form submission
 * - Use proper ARIA attributes for complex validation scenarios
 */

export interface FormErrors {
  [fieldName: string]: string | undefined
}

interface FormRootProps extends Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  className?: string
  errors?: FormErrors
  onClearErrors?: () => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  disabled?: boolean
}

const FormRoot = React.forwardRef<HTMLFormElement, FormRootProps>(
  ({ 
    className, 
    errors = {}, 
    onClearErrors, 
    onSubmit, 
    disabled = false, 
    children,
    ...props 
  }, ref) => {
    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
      if (onSubmit) {
        await onSubmit(event)
      }
    }, [onSubmit])

    const contextValue = React.useMemo(() => ({
      errors,
      onClearErrors,
      disabled
    }), [errors, onClearErrors, disabled])

    return (
      <FormContext.Provider value={contextValue}>
        <BaseForm
          ref={ref}
          className={twMerge(
            'space-y-4',
            disabled && 'opacity-50 pointer-events-none',
            className
          )}
          onSubmit={handleSubmit}
          noValidate
          {...props}
        >
          {children}
        </BaseForm>
      </FormContext.Provider>
    )
  }
)
FormRoot.displayName = 'Form.Root'

interface FormFieldProps extends React.ComponentPropsWithoutRef<'div'> {
  name: string
  className?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, className, children, ...props }, ref) => {
    const { errors, onClearErrors } = useFormContext()
    const error = errors?.[name]

    const handleInputChange = React.useCallback(() => {
      if (error && onClearErrors) {
        // Clear the specific field error when user starts typing
        const newErrors = { ...errors }
        delete newErrors[name]
        onClearErrors()
      }
    }, [error, errors, name, onClearErrors])

    return (
      <div
        ref={ref}
        className={twMerge('space-y-2', className)}
        {...props}
      >
        <FormFieldContext.Provider value={{ name, error, onInputChange: handleInputChange }}>
          {children}
        </FormFieldContext.Provider>
      </div>
    )
  }
)
FormField.displayName = 'Form.Field'

interface FormLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  className?: string
  required?: boolean
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const { name } = useFormFieldContext()

    return (
      <label
        ref={ref}
        htmlFor={name}
        className={twMerge(
          'block text-sm font-medium text-gray-700 dark:text-gray-200',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )
  }
)
FormLabel.displayName = 'Form.Label'

interface FormControlProps extends React.ComponentPropsWithoutRef<'input'> {
  className?: string
  as?: 'input' | 'textarea' | 'select'
}

const FormControl = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormControlProps
>(({ className, as = 'input', onChange, ...props }, ref) => {
  const { name, error, onInputChange } = useFormFieldContext()
  const { disabled } = useFormContext()

  const handleChange = React.useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    onInputChange?.()
    onChange?.(event)
  }, [onChange, onInputChange])

  const baseStyles = twMerge(
    'block w-full rounded-md border border-gray-300 dark:border-gray-700',
    'bg-white dark:bg-gray-900 px-3 py-2',
    'text-gray-900 dark:text-gray-100',
    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
    'focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    error && 'border-red-500 focus:ring-red-500',
    className
  )

  const commonProps = {
    id: name,
    name,
    disabled,
    onChange: handleChange,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${name}-error` : undefined,
    ...props
  }

  if (as === 'textarea') {
    return (
      <textarea
        ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
        className={baseStyles}
        {...commonProps}
      />
    )
  }

  if (as === 'select') {
    return (
      <select
        ref={ref as React.ForwardedRef<HTMLSelectElement>}
        className={baseStyles}
        {...commonProps}
      />
    )
  }

  return (
    <input
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      className={baseStyles}
      {...commonProps}
    />
  )
})
FormControl.displayName = 'Form.Control'

interface FormDescriptionProps extends React.ComponentPropsWithoutRef<'p'> {
  className?: string
}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={twMerge(
          'text-sm text-gray-500 dark:text-gray-400',
          className
        )}
        {...props}
      />
    )
  }
)
FormDescription.displayName = 'Form.Description'

interface FormErrorProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
}

const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { name, error } = useFormFieldContext()

    if (!error) return null

    return (
      <div
        ref={ref}
        id={`${name}-error`}
        className={twMerge(
          'text-sm text-red-600 dark:text-red-400 flex items-start gap-2',
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <svg
          className="h-4 w-4 mt-0.5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        <span>{children || error}</span>
      </div>
    )
  }
)
FormError.displayName = 'Form.Error'

// Context for form state
interface FormContextValue {
  errors: FormErrors
  onClearErrors?: () => void
  disabled: boolean
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined)

const useFormContext = () => {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error('Form components must be used within a Form.Root')
  }
  return context
}

// Context for form field state
interface FormFieldContextValue {
  name: string
  error?: string
  onInputChange?: () => void
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined)

const useFormFieldContext = () => {
  const context = React.useContext(FormFieldContext)
  if (!context) {
    throw new Error('Form field components must be used within a Form.Field')
  }
  return context
}

export const Form = {
  Root: FormRoot,
  Field: FormField,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Error: FormError,
}