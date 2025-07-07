/**
 * Animation Utilities
 * 
 * Centralized animation configurations and utilities using Motion.
 * Provides consistent animation values, transitions, and presets across the application.
 */

import type { Transition, Variants } from "motion/react";

// === ANIMATION VALUES ===

export const animationValues = {
  // Durations
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },
  
  // Delays
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.4,
  },
  
  // Easing
  ease: {
    default: [0.4, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    inOut: [0.4, 0, 0.2, 1],
    spring: { type: "spring", damping: 20, stiffness: 300 },
    smooth: { type: "spring", damping: 30, stiffness: 400 },
    bouncy: { type: "spring", damping: 10, stiffness: 100 },
  },
  
  // Transforms
  scale: {
    enter: 1,
    exit: 0.95,
    hover: 1.02,
    active: 0.98,
  },
  
  // Opacity
  opacity: {
    visible: 1,
    hidden: 0,
    disabled: 0.5,
  },
  
  // Distances for slides
  distance: {
    small: 8,
    medium: 16,
    large: 32,
    xlarge: 64,
  },
} as const;

// === TRANSITION PRESETS ===

export const transitions = {
  fast: {
    duration: animationValues.duration.fast,
    ease: animationValues.ease.default,
  },
  
  normal: {
    duration: animationValues.duration.normal,
    ease: animationValues.ease.default,
  },
  
  slow: {
    duration: animationValues.duration.slow,
    ease: animationValues.ease.default,
  },
  
  spring: {
    ...animationValues.ease.spring,
  },
  
  smooth: {
    ...animationValues.ease.smooth,
  },
  
  bouncy: {
    ...animationValues.ease.bouncy,
  },
} as const satisfies Record<string, Transition>;

// === PAGE TRANSITION VARIANTS ===

export const pageTransitions = {
  // Fade transition
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.normal,
  },
  
  // Slide from right
  slideRight: {
    initial: { x: animationValues.distance.large, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -animationValues.distance.large, opacity: 0 },
    transition: transitions.smooth,
  },
  
  // Slide from left
  slideLeft: {
    initial: { x: -animationValues.distance.large, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: animationValues.distance.large, opacity: 0 },
    transition: transitions.smooth,
  },
  
  // Slide up
  slideUp: {
    initial: { y: animationValues.distance.large, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -animationValues.distance.large, opacity: 0 },
    transition: transitions.smooth,
  },
  
  // Scale and fade
  scale: {
    initial: { scale: animationValues.scale.exit, opacity: 0 },
    animate: { scale: animationValues.scale.enter, opacity: 1 },
    exit: { scale: animationValues.scale.exit, opacity: 0 },
    transition: transitions.smooth,
  },
} as const satisfies Record<string, Variants>;

// === MICRO-INTERACTION VARIANTS ===

export const microInteractions = {
  // Button interactions
  button: {
    initial: { scale: 1 },
    hover: { scale: animationValues.scale.hover },
    tap: { scale: animationValues.scale.active },
    transition: transitions.fast,
  },
  
  // Card hover effect
  card: {
    initial: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: { 
      y: -2, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
    },
    transition: transitions.normal,
  },
  
  // Input focus effect
  input: {
    initial: { scale: 1, borderColor: "rgb(209 213 219)" },
    focus: { scale: 1.02, borderColor: "rgb(59 130 246)" },
    transition: transitions.fast,
  },
  
  // Icon rotation
  icon: {
    initial: { rotate: 0 },
    hover: { rotate: 5 },
    tap: { rotate: -5 },
    transition: transitions.fast,
  },
  
  // Drawer/Modal backdrop
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.normal,
  },
  
  // Modal/Dialog content
  modal: {
    initial: { scale: 0.9, opacity: 0, y: animationValues.distance.medium },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: animationValues.distance.medium },
    transition: transitions.smooth,
  },
} as const satisfies Record<string, Variants>;

// === LOADING ANIMATIONS ===

export const loadingAnimations = {
  // Pulse effect
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  
  // Spin animation
  spin: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
  
  // Bounce animation
  bounce: {
    animate: {
      y: [-2, 2, -2],
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  
  // Dots loading
  dots: {
    animate: {
      y: [0, -8, 0],
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const satisfies Record<string, Variants>;

// === SCROLL ANIMATIONS ===

export const scrollAnimations = {
  // Fade in from bottom
  fadeInUp: {
    initial: { y: animationValues.distance.large, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: transitions.smooth,
  },
  
  // Fade in from left
  fadeInLeft: {
    initial: { x: -animationValues.distance.large, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: transitions.smooth,
  },
  
  // Fade in from right
  fadeInRight: {
    initial: { x: animationValues.distance.large, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: transitions.smooth,
  },
  
  // Scale in
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: transitions.smooth,
  },
  
  // Stagger children
  staggerContainer: {
    initial: {},
    whileInView: {},
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: {
      staggerChildren: 0.1,
    },
  },
  
  staggerChild: {
    initial: { y: animationValues.distance.medium, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: transitions.smooth,
  },
} as const satisfies Record<string, Variants>;

// === GESTURE ANIMATIONS ===

export const gestureAnimations = {
  // Swipe to dismiss
  swipeToDismiss: {
    drag: "x" as const,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.2,
    whileDrag: { scale: 0.95 },
    transition: transitions.smooth,
  },
  
  // Pull to refresh
  pullToRefresh: {
    drag: "y" as const,
    dragConstraints: { top: 0, bottom: 100 },
    dragElastic: 0.3,
    whileDrag: { scale: 0.98 },
    transition: transitions.smooth,
  },
  
  // Long press
  longPress: {
    whileTap: { scale: 0.95 },
    transition: transitions.fast,
  },
} as const satisfies Record<string, Variants>;

// === UTILITY FUNCTIONS ===

/**
 * Create staggered animation for list items
 */
export function createStaggerAnimation(delay = 0.1) {
  return {
    container: {
      initial: {},
      animate: {},
      transition: {
        staggerChildren: delay,
      },
    },
    item: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: transitions.smooth,
    },
  };
}

/**
 * Create custom transition with duration
 */
export function createTransition(duration: number, ease = animationValues.ease.default): Transition {
  return {
    duration,
    ease,
  };
}

/**
 * Create spring transition with custom values
 */
export function createSpringTransition(stiffness = 300, damping = 20): Transition {
  return {
    type: "spring",
    stiffness,
    damping,
  };
}