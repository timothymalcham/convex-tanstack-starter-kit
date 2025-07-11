/**
 * Card Component
 *
 * A flexible container for displaying content with consistent styling and spacing.
 *
 * @example
 * // Basic card
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>
 *     <p>Card content goes here</p>
 *   </Card.Content>
 * </Card>
 *
 * // With footer
 * <Card>
 *   <Card.Content>Content</Card.Content>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 *
 * @usage
 * - Content containers
 * - Statistics display
 * - Product cards
 * - User profiles
 * - Dashboard widgets
 * - Form sections
 *
 * @best-practices
 * - Use consistent spacing with provided components
 * - Keep card content focused and scannable
 * - Use titles and descriptions for clarity
 * - Group related actions in footer
 * - Consider hover states for interactive cards
 */

import * as React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={twMerge(
            "rounded-lg border border-border-outline bg-surface-card text-text-primary shadow-sm",
            className,
        )}
        {...props}
    />
));

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={twMerge("flex flex-col space-y-1.5 p-6", className)} {...props} />
    ),
);

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={twMerge("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
    ),
);

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={twMerge("text-sm text-text-muted", className)} {...props} />
    ),
);

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={twMerge("p-6 pt-0", className)} {...props} />,
);

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={twMerge("flex items-center p-6 pt-0", className)} {...props} />
    ),
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };