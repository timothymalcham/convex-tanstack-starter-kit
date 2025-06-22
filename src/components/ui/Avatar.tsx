import * as React from 'react'
import { Avatar as BaseAvatar } from '@base-ui-components/react/avatar'
import { twMerge } from 'tailwind-merge'

/**
 * Avatar Component
 * 
 * Display user profile pictures with automatic fallback to initials or icons.
 * 
 * @example
 * ```jsx
 * import { Avatar } from '@/components/ui/Avatar'
 * 
 * // Basic avatar with image and initials fallback
 * <Avatar.Root>
 *   <Avatar.Image src="/path/to/profile.jpg" alt="John Doe" />
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 * </Avatar.Root>
 * 
 * // Different sizes
 * <Avatar.Root size="sm">
 *   <Avatar.Image src="/profile.jpg" />
 *   <Avatar.Fallback>A</Avatar.Fallback>
 * </Avatar.Root>
 * 
 * // With custom fallback icon
 * <Avatar.Root size="lg">
 *   <Avatar.Image src="/profile.jpg" />
 *   <Avatar.Fallback>
 *     <UserIcon className="h-6 w-6" />
 *   </Avatar.Fallback>
 * </Avatar.Root>
 * 
 * // Avatar group
 * <div className="flex -space-x-2">
 *   <Avatar.Root className="ring-2 ring-white">
 *     <Avatar.Image src="/user1.jpg" />
 *     <Avatar.Fallback>U1</Avatar.Fallback>
 *   </Avatar.Root>
 *   <Avatar.Root className="ring-2 ring-white">
 *     <Avatar.Image src="/user2.jpg" />
 *     <Avatar.Fallback>U2</Avatar.Fallback>
 *   </Avatar.Root>
 * </div>
 * ```
 */

interface AvatarRootProps extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeStyles = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl'
    }

    return (
      <BaseAvatar.Root
        ref={ref}
        className={twMerge(
          'relative inline-flex shrink-0 overflow-hidden rounded-full',
          'bg-gray-100 dark:bg-gray-800',
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)
AvatarRoot.displayName = 'Avatar.Root'

interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Image> {
  className?: string
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAvatar.Image
        ref={ref}
        className={twMerge(
          'aspect-square h-full w-full object-cover',
          className
        )}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = 'Avatar.Image'

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback> {
  className?: string
}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAvatar.Fallback
        ref={ref}
        className={twMerge(
          'flex h-full w-full items-center justify-center',
          'font-medium text-gray-600 dark:text-gray-300',
          'bg-gray-100 dark:bg-gray-800',
          className
        )}
        delay={600}
        {...props}
      />
    )
  }
)
AvatarFallback.displayName = 'Avatar.Fallback'

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
}