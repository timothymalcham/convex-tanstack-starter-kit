import * as React from 'react'
import { Button as BaseButton } from '@base-ui-components/react/button'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
      ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500'
    }
    
    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
    }
    
    const widthStyles = fullWidth ? 'w-full' : ''
    
    return (
      <BaseButton
        ref={ref}
        className={twMerge(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'