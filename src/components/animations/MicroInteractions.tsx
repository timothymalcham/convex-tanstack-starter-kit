/**
 * MicroInteractions Components
 *
 * Provides smooth micro-interactions for UI elements using Motion.
 * These components add subtle animations that enhance user experience.
 *
 * @example Basic button animation:
 * ```jsx
 * <AnimatedButton onClick={handleClick}>
 *   Click me
 * </AnimatedButton>
 * ```
 *
 * @example Card with hover effect:
 * ```jsx
 * <AnimatedCard>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </AnimatedCard>
 * ```
 *
 * @example Icon with rotation:
 * ```jsx
 * <AnimatedIcon>
 *   <ChevronIcon />
 * </AnimatedIcon>
 * ```
 */

import { motion } from "motion/react";
import * as React from "react";
import { microInteractions, transitions } from "~/utils/animations";

// === ANIMATED BUTTON ===

export interface AnimatedButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragEnd" | "onDragStart"> {
    children: React.ReactNode;
    variant?: "default" | "subtle" | "scale";
    whileHover?: boolean;
    whileTap?: boolean;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
    ({ children, variant = "default", whileHover = true, whileTap = true, className, ...props }, ref) => {
        const variants = {
            default: microInteractions.button,
            subtle: {
                initial: { scale: 1 },
                hover: { scale: 1.01 },
                tap: { scale: 0.99 },
                transition: transitions.fast,
            },
            scale: {
                initial: { scale: 1 },
                hover: { scale: 1.05 },
                tap: { scale: 0.95 },
                transition: transitions.normal,
            },
        };

        const animation = variants[variant];

        return (
            <motion.button
                ref={ref}
                initial={animation.initial}
                whileHover={whileHover ? animation.hover : undefined}
                whileTap={whileTap ? animation.tap : undefined}
                transition={animation.transition}
                className={className}
                {...props}
            >
                {children}
            </motion.button>
        );
    },
);

AnimatedButton.displayName = "AnimatedButton";

// === ANIMATED CARD ===

export interface AnimatedCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "default" | "lift" | "glow";
}

export function AnimatedCard({
    children,
    className,
    onClick,
    disabled = false,
    variant = "default",
}: AnimatedCardProps) {
    const variants = {
        default: microInteractions.card,
        lift: {
            initial: { y: 0, scale: 1 },
            hover: { y: -4, scale: 1.02 },
            transition: transitions.normal,
        },
        glow: {
            initial: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
            hover: { boxShadow: "0 0 20px 0 rgba(59, 130, 246, 0.3)" },
            transition: transitions.normal,
        },
    };

    const animation = variants[variant];

    return (
        <motion.div
            initial={animation.initial}
            whileHover={!disabled ? animation.hover : undefined}
            transition={animation.transition}
            className={className}
            onClick={onClick}
            style={{ cursor: onClick ? "pointer" : "default" }}
        >
            {children}
        </motion.div>
    );
}

// === ANIMATED INPUT ===

export interface AnimatedInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onDrag" | "onDragEnd" | "onDragStart"> {
    variant?: "default" | "focus" | "glow";
}

export const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
    ({ variant = "default", className, ...props }, ref) => {
        const variants = {
            default: microInteractions.input,
            focus: {
                initial: { scale: 1, borderWidth: "1px" },
                focus: { scale: 1.02, borderWidth: "2px" },
                transition: transitions.fast,
            },
            glow: {
                initial: { scale: 1, boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
                focus: { scale: 1.01, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" },
                transition: transitions.fast,
            },
        };

        const animation = variants[variant];

        return (
            <motion.input
                ref={ref}
                initial={animation.initial}
                whileFocus={animation.focus}
                transition={animation.transition}
                className={className}
                {...props}
            />
        );
    },
);

AnimatedInput.displayName = "AnimatedInput";

// === ANIMATED ICON ===

export interface AnimatedIconProps {
    children: React.ReactNode;
    className?: string;
    variant?: "rotate" | "bounce" | "pulse" | "spin";
    trigger?: "hover" | "tap" | "always";
}

export function AnimatedIcon({ children, className, variant = "rotate", trigger = "hover" }: AnimatedIconProps) {
    const variants = {
        rotate: {
            initial: { rotate: 0 },
            animate: { rotate: 15 },
            transition: transitions.fast,
        },
        bounce: {
            initial: { y: 0 },
            animate: { y: -2 },
            transition: { ...transitions.fast, type: "spring" as const },
        },
        pulse: {
            initial: { scale: 1 },
            animate: { scale: 1.1 },
            transition: transitions.fast,
        },
        spin: {
            initial: { rotate: 0 },
            animate: { rotate: 360 },
            transition: { duration: 1, repeat: Infinity, ease: "linear" as const },
        },
    };

    const animation = variants[variant];

    const motionProps = {
        initial: animation.initial,
        transition: animation.transition,
        ...(trigger === "hover" && { whileHover: animation.animate }),
        ...(trigger === "tap" && { whileTap: animation.animate }),
        ...(trigger === "always" && { animate: animation.animate }),
    };

    return (
        <motion.div className={className} {...motionProps}>
            {children}
        </motion.div>
    );
}

// === ANIMATED LIST ITEM ===

export interface AnimatedListItemProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    index?: number;
}

export function AnimatedListItem({ children, className, delay = 0.1, index = 0 }: AnimatedListItemProps) {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{
                ...transitions.smooth,
                delay: delay * index,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// === ANIMATED CONTAINER ===

export interface AnimatedContainerProps {
    children: React.ReactNode;
    className?: string;
    stagger?: boolean;
    staggerDelay?: number;
}

export function AnimatedContainer({
    children,
    className,
    stagger = false,
    staggerDelay = 0.1,
}: AnimatedContainerProps) {
    if (!stagger) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: {},
                animate: {},
                exit: {},
            }}
            transition={{
                staggerChildren: staggerDelay,
            }}
            className={className}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div
                    variants={{
                        initial: { y: 20, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        exit: { y: -20, opacity: 0 },
                    }}
                    transition={transitions.smooth}
                    key={index}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

// === ANIMATED PRESENCE WRAPPER ===

export interface AnimatedPresenceProps {
    children: React.ReactNode;
    className?: string;
    variant?: "fade" | "scale" | "slide";
}

export function AnimatedPresence({ children, className, variant = "fade" }: AnimatedPresenceProps) {
    const variants = {
        fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        scale: {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
        },
        slide: {
            initial: { y: 10, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -10, opacity: 0 },
        },
    };

    const animation = variants[variant];

    return (
        <motion.div
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={transitions.normal}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// === FLOATING ACTION BUTTON ===

export interface FloatingActionButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function FloatingActionButton({
    children,
    onClick,
    className = "fixed bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-lg",
    size = "md",
}: FloatingActionButtonProps) {
    const sizes = {
        sm: "h-12 w-12",
        md: "h-14 w-14",
        lg: "h-16 w-16",
    };

    return (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={transitions.spring}
            className={`${className} ${sizes[size]} flex items-center justify-center`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}
