/**
 * PageTransition Component
 * 
 * Provides smooth page transitions using Motion. Automatically applies
 * entrance and exit animations for route changes.
 * 
 * @example Basic usage:
 * ```jsx
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 * 
 * @example Custom transition:
 * ```jsx
 * <PageTransition variant="slideRight">
 *   <YourPageContent />
 * </PageTransition>
 * ```
 * 
 * @example With custom timing:
 * ```jsx
 * <PageTransition variant="scale" duration={0.5}>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 */

import { motion } from "motion/react";
import * as React from "react";
import { pageTransitions, transitions } from "~/utils/animations";

export interface PageTransitionProps {
  children: React.ReactNode;
  variant?: keyof typeof pageTransitions;
  duration?: number;
  className?: string;
}

export function PageTransition({
  children,
  variant = "fade",
  duration,
  className,
}: PageTransitionProps) {
  const transition = pageTransitions[variant];
  
  // Override duration if provided
  const customTransition = duration 
    ? { ...transition.transition, duration }
    : transition.transition;

  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      exit={transition.exit}
      transition={customTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * RouteTransition Component
 * 
 * Higher-order component that wraps route content with page transitions.
 * Designed to work with TanStack Router or similar routing libraries.
 */
export function RouteTransition({
  children,
  ...props
}: PageTransitionProps) {
  return (
    <PageTransition {...props} className="min-h-full">
      {children}
    </PageTransition>
  );
}

/**
 * SlideTransition Component
 * 
 * Specialized transition for sliding between pages (like mobile navigation).
 */

export interface SlideTransitionProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

export function SlideTransition({
  children,
  direction = "right",
  className,
}: SlideTransitionProps) {
  const variants = {
    left: pageTransitions.slideLeft,
    right: pageTransitions.slideRight,
    up: pageTransitions.slideUp,
    down: {
      initial: { y: -32, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 32, opacity: 0 },
      transition: transitions.smooth,
    },
  };

  const transition = variants[direction];

  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      exit={transition.exit}
      transition={transition.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ModalTransition Component
 * 
 * Specialized transition for modal/dialog content.
 */

export interface ModalTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalTransition({ children, className }: ModalTransitionProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 16 }}
      transition={transitions.smooth}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * BackdropTransition Component
 * 
 * Animated backdrop for modals, drawers, and overlays.
 */

export interface BackdropTransitionProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BackdropTransition({ 
  children, 
  className = "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
  onClick 
}: BackdropTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitions.normal}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}