import * as React from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog'
import { twMerge } from 'tailwind-merge'

/**
 * AlertDialog Component
 * 
 * A modal dialog that interrupts the user with important content and expects a response.
 * 
 * @example
 * ```jsx
 * import { AlertDialog, AlertDialogContent, AlertDialogFooter } from '@/components/ui/AlertDialog'
 * import { Button } from '@/components/ui/Button'
 * 
 * function DeleteConfirmation() {
 *   return (
 *     <AlertDialog.Root>
 *       <AlertDialog.Trigger asChild>
 *         <Button variant="danger">Delete Account</Button>
 *       </AlertDialog.Trigger>
 *       <AlertDialogContent>
 *         <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
 *         <AlertDialog.Description>
 *           This action cannot be undone. This will permanently delete your
 *           account and remove your data from our servers.
 *         </AlertDialog.Description>
 *         <AlertDialogFooter>
 *           <AlertDialog.Close asChild>
 *             <Button variant="ghost">Cancel</Button>
 *           </AlertDialog.Close>
 *           <AlertDialog.Close asChild>
 *             <Button variant="danger">Yes, delete account</Button>
 *           </AlertDialog.Close>
 *         </AlertDialogFooter>
 *       </AlertDialogContent>
 *     </AlertDialog.Root>
 *   )
 * }
 * ```
 */

interface AlertDialogRootProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Root> {}

const AlertDialogRoot = BaseAlertDialog.Root

interface AlertDialogTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger> {
  asChild?: boolean
}

const AlertDialogTrigger = BaseAlertDialog.Trigger

interface AlertDialogPortalProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Portal> {}

const AlertDialogPortal = BaseAlertDialog.Portal

interface AlertDialogBackdropProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop> {
  className?: string
}

const AlertDialogBackdrop = React.forwardRef<HTMLDivElement, AlertDialogBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAlertDialog.Backdrop
        ref={ref}
        className={twMerge(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
          'animate-in fade-in-0 duration-200',
          'data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:duration-200',
          className
        )}
        {...props}
      />
    )
  }
)
AlertDialogBackdrop.displayName = 'AlertDialog.Backdrop'

interface AlertDialogPopupProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup> {
  className?: string
}

const AlertDialogPopup = React.forwardRef<HTMLDivElement, AlertDialogPopupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAlertDialog.Popup
        ref={ref}
        className={twMerge(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
          'gap-4 border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950',
          'rounded-lg',
          'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
          'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[ending-style]:duration-200',
          className
        )}
        {...props}
      />
    )
  }
)
AlertDialogPopup.displayName = 'AlertDialog.Popup'

interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title> {
  className?: string
}

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAlertDialog.Title
        ref={ref}
        className={twMerge(
          'text-lg font-semibold text-gray-900 dark:text-gray-100',
          className
        )}
        {...props}
      />
    )
  }
)
AlertDialogTitle.displayName = 'AlertDialog.Title'

interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description> {
  className?: string
}

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAlertDialog.Description
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
AlertDialogDescription.displayName = 'AlertDialog.Description'

interface AlertDialogCloseProps extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close> {
  asChild?: boolean
}

const AlertDialogClose = BaseAlertDialog.Close

// Compound exports for better DX
export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Backdrop: AlertDialogBackdrop,
  Popup: AlertDialogPopup,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Close: AlertDialogClose,
}

// Additional helper components for common patterns
interface AlertDialogContentProps {
  children: React.ReactNode
  className?: string
}

export const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ children, className }, ref) => {
    return (
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogPopup ref={ref} className={className}>
          {children}
        </AlertDialogPopup>
      </AlertDialogPortal>
    )
  }
)
AlertDialogContent.displayName = 'AlertDialogContent'

interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2',
          className
        )}
        {...props}
      />
    )
  }
)
AlertDialogFooter.displayName = 'AlertDialogFooter'