/**
 * LoadingAnimations Components
 * 
 * Animated loading indicators built with Motion for smooth, engaging loading states.
 * These replace or enhance the basic loading components with more sophisticated animations.
 * 
 * @example Basic animated spinner:
 * ```jsx
 * <AnimatedSpinner size="lg" />
 * ```
 * 
 * @example Bouncing dots:
 * ```jsx
 * <BouncingDots count={3} />
 * ```
 * 
 * @example Skeleton with wave animation:
 * ```jsx
 * <AnimatedSkeleton className="h-4 w-32" />
 * ```
 * 
 * @example Progress bar with smooth fill:
 * ```jsx
 * <AnimatedProgress value={75} />
 * ```
 */

import { motion } from "motion/react";
import * as React from "react";
import { loadingAnimations, transitions } from "~/utils/animations";

// === ANIMATED SPINNER ===

export interface AnimatedSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "accent" | "current";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function AnimatedSpinner({
  size = "md",
  color = "primary",
  speed = "normal",
  className,
}: AnimatedSpinnerProps) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const colorClasses = {
    primary: "text-interactive-primary",
    secondary: "text-interactive-secondary",
    accent: "text-interactive-accent",
    current: "text-current",
  };

  const speeds = {
    slow: 2,
    normal: 1,
    fast: 0.5,
  };

  return (
    <motion.svg
      className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{
        duration: speeds[speed],
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  );
}

// === BOUNCING DOTS ===

export interface BouncingDotsProps {
  count?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "current";
  spacing?: "tight" | "normal" | "wide";
  className?: string;
}

export function BouncingDots({
  count = 3,
  size = "md",
  color = "primary",
  spacing = "normal",
  className,
}: BouncingDotsProps) {
  const sizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  const colorClasses = {
    primary: "bg-interactive-primary",
    secondary: "bg-interactive-secondary",
    accent: "bg-interactive-accent",
    current: "bg-current",
  };

  const spacingClasses = {
    tight: "gap-1",
    normal: "gap-2",
    wide: "gap-3",
  };

  return (
    <div className={`flex items-center ${spacingClasses[spacing]} ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// === PULSING DOTS ===

export interface PulsingDotsProps {
  count?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "current";
  className?: string;
}

export function PulsingDots({
  count = 3,
  size = "md",
  color = "primary",
  className,
}: PulsingDotsProps) {
  const sizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  const colorClasses = {
    primary: "bg-interactive-primary",
    secondary: "bg-interactive-secondary",
    accent: "bg-interactive-accent",
    current: "bg-current",
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// === ANIMATED SKELETON ===

export interface AnimatedSkeletonProps {
  className?: string;
  shimmer?: boolean;
  pulse?: boolean;
}

export function AnimatedSkeleton({
  className,
  shimmer = true,
  pulse = false,
}: AnimatedSkeletonProps) {
  const baseClass = "bg-interactive-muted rounded overflow-hidden relative";

  if (pulse) {
    return (
      <motion.div
        className={`${baseClass} ${className}`}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  if (shimmer) {
    return (
      <div className={`${baseClass} ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return <div className={`${baseClass} ${className}`} />;
}

// === ANIMATED PROGRESS BAR ===

export interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  animated?: boolean;
  striped?: boolean;
}

export function AnimatedProgress({
  value,
  max = 100,
  className,
  barClassName,
  animated = true,
  striped = false,
}: AnimatedProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={`w-full bg-interactive-muted rounded-full h-2 overflow-hidden ${className}`}
    >
      <motion.div
        className={`h-full bg-interactive-primary rounded-full ${
          striped ? "bg-stripes" : ""
        } ${barClassName}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={animated ? transitions.smooth : { duration: 0 }}
      />
    </div>
  );
}

// === LOADING WAVE ===

export interface LoadingWaveProps {
  bars?: number;
  height?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "current";
  className?: string;
}

export function LoadingWave({
  bars = 5,
  height = "md",
  color = "primary",
  className,
}: LoadingWaveProps) {
  const heightClasses = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
  };

  const colorClasses = {
    primary: "bg-interactive-primary",
    secondary: "bg-interactive-secondary",
    accent: "bg-interactive-accent",
    current: "bg-current",
  };

  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {Array.from({ length: bars }).map((_, index) => (
        <motion.div
          key={index}
          className={`w-1 rounded-full ${heightClasses[height]} ${colorClasses[color]}`}
          animate={{
            scaleY: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// === BREATHING CIRCLE ===

export interface BreathingCircleProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "current";
  className?: string;
}

export function BreathingCircle({
  size = "md",
  color = "primary",
  className,
}: BreathingCircleProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const colorClasses = {
    primary: "bg-interactive-primary",
    secondary: "bg-interactive-secondary",
    accent: "bg-interactive-accent",
    current: "bg-current",
  };

  return (
    <motion.div
      className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// === LOADING SPINNER WITH TEXT ===

export interface LoadingSpinnerWithTextProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function LoadingSpinnerWithText({
  text = "Loading...",
  size = "md",
  direction = "horizontal",
  className,
}: LoadingSpinnerWithTextProps) {
  const directionClasses = {
    horizontal: "flex-row items-center gap-3",
    vertical: "flex-col items-center gap-2",
  };

  return (
    <div className={`flex ${directionClasses[direction]} ${className}`}>
      <AnimatedSpinner size={size} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-content-secondary"
      >
        {text}
      </motion.span>
    </div>
  );
}

// === CARD LOADING SKELETON ===

export function CardLoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={`p-6 border border-border-outline rounded-lg space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <AnimatedSkeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <AnimatedSkeleton className="h-4 w-32" />
          <AnimatedSkeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <AnimatedSkeleton className="h-4 w-full" />
        <AnimatedSkeleton className="h-4 w-full" />
        <AnimatedSkeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-2">
        <AnimatedSkeleton className="h-8 w-20 rounded-md" />
        <AnimatedSkeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
}