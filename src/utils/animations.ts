/**
 * Animation Utilities
 *
 * Centralized animation configurations and utilities using Motion.
 * Provides consistent animation values, transitions, and presets across the application.
 */

import type { Transition } from "motion/react";

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
        default: [0.4, 0, 0.2, 1] as const,
        in: [0.4, 0, 1, 1] as const,
        out: [0, 0, 0.2, 1] as const,
        inOut: [0.4, 0, 0.2, 1] as const,
        spring: { type: "spring", damping: 20, stiffness: 300 } as const,
        smooth: { type: "spring", damping: 30, stiffness: 400 } as const,
        bouncy: { type: "spring", damping: 10, stiffness: 100 } as const,
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
        dimmed: 0.6,
        subtle: 0.8,
    },

    // Distance/Movement
    distance: {
        small: 8,
        medium: 16,
        large: 32,
        xlarge: 64,
    },

    // Spring configs
    spring: {
        gentle: { type: "spring", damping: 26, stiffness: 120 } as const,
        bouncy: { type: "spring", damping: 10, stiffness: 100 } as const,
        snappy: { type: "spring", damping: 30, stiffness: 400 } as const,
        wobbly: { type: "spring", damping: 8, stiffness: 180 } as const,
    },
} as const;

// === COMMON TRANSITIONS ===

export const transitions: Record<string, Transition> = {
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

    smooth: animationValues.ease.smooth,
    spring: animationValues.ease.spring,
    bouncy: animationValues.ease.bouncy,
} as const;

// === PAGE TRANSITIONS ===

export const pageTransitions = {
    // Fade in/out
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: transitions.normal,
    },

    // Scale in/out
    scale: {
        initial: { scale: 0.96, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.96, opacity: 0 },
        transition: transitions.smooth,
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

    // Blur effect
    blur: {
        initial: { scale: 1.1, opacity: 0, filter: "blur(10px)" },
        animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
        exit: { scale: 0.9, opacity: 0, filter: "blur(10px)" },
        transition: transitions.smooth,
    },
} as const;

// === MICRO-INTERACTIONS ===

export const microInteractions = {
    // Button interactions
    button: {
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
        transition: transitions.fast,
    },

    // Card interactions
    card: {
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        transition: transitions.normal,
    },

    // Input interactions
    input: {
        initial: { scale: 1 },
        focus: { scale: 1.01 },
        transition: transitions.fast,
    },
} as const;

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
            ease: "easeInOut" as const,
        },
    },

    // Spin animation
    spin: {
        animate: { rotate: 360 },
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear" as const,
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
            ease: "easeInOut" as const,
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
            ease: "easeInOut" as const,
        },
    },
} as const;

// === SCROLL ANIMATIONS ===

export const scrollAnimations = {
    // Fade in from bottom
    fadeInUp: {
        initial: { y: animationValues.distance.large, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: transitions.smooth,
    },

    // Fade in from left
    fadeInLeft: {
        initial: { x: -animationValues.distance.large, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: transitions.smooth,
    },

    // Fade in from right
    fadeInRight: {
        initial: { x: animationValues.distance.large, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: transitions.smooth,
    },

    // Scale in
    scaleIn: {
        initial: { scale: 0.8, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        transition: transitions.smooth,
    },

    // Stagger children
    staggerContainer: {
        initial: {},
        whileInView: {},
        transition: {
            staggerChildren: 0.1,
        },
    },

    staggerChild: {
        initial: { y: animationValues.distance.medium, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: transitions.smooth,
    },
} as const;

// === GESTURE ANIMATIONS ===

export const gestureAnimations = {
    // Swipe to dismiss
    swipeToDismiss: {
        whileDrag: { scale: 0.95 },
        transition: transitions.smooth,
    },

    // Pull to refresh
    pullToRefresh: {
        whileDrag: { cursor: "grabbing" },
        transition: transitions.smooth,
    },

    // Draggable card
    draggableCard: {
        whileDrag: {
            scale: 0.95,
            zIndex: 999,
            cursor: "grabbing",
        },
        transition: transitions.smooth,
    },
} as const;
