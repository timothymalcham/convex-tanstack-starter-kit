/**
 * Design Tokens Type Definitions
 *
 * This file provides TypeScript types and utilities for working with design tokens.
 * It ensures type safety when using design tokens in components and provides
 * helpful autocomplete suggestions.
 */

// === COLOR TOKENS ===
export const colorTokens = {
    // Brand Colors
    brand: {
        50: "var(--color-brand-50)",
        100: "var(--color-brand-100)",
        200: "var(--color-brand-200)",
        300: "var(--color-brand-300)",
        400: "var(--color-brand-400)",
        500: "var(--color-brand-500)",
        600: "var(--color-brand-600)",
        700: "var(--color-brand-700)",
        800: "var(--color-brand-800)",
        900: "var(--color-brand-900)",
        950: "var(--color-brand-950)",
    },

    // Semantic Colors
    surface: {
        background: "var(--surface-background)",
        foreground: "var(--surface-foreground)",
        card: "var(--surface-card)",
        cardForeground: "var(--surface-card-foreground)",
        popover: "var(--surface-popover)",
        popoverForeground: "var(--surface-popover-foreground)",
    },

    content: {
        primary: "var(--content-primary)",
        secondary: "var(--content-secondary)",
        tertiary: "var(--content-tertiary)",
        accent: "var(--content-accent)",
        muted: "var(--content-muted)",
        mutedForeground: "var(--content-muted-foreground)",
    },

    border: {
        outline: "var(--border-outline)",
        input: "var(--border-input)",
        ring: "var(--border-ring)",
    },

    interactive: {
        primary: "var(--interactive-primary)",
        primaryForeground: "var(--interactive-primary-foreground)",
        secondary: "var(--interactive-secondary)",
        secondaryForeground: "var(--interactive-secondary-foreground)",
        accent: "var(--interactive-accent)",
        accentForeground: "var(--interactive-accent-foreground)",
        destructive: "var(--interactive-destructive)",
        destructiveForeground: "var(--interactive-destructive-foreground)",
        muted: "var(--interactive-muted)",
        mutedForeground: "var(--interactive-muted-foreground)",
    },

    state: {
        success: "var(--state-success)",
        successForeground: "var(--state-success-foreground)",
        warning: "var(--state-warning)",
        warningForeground: "var(--state-warning-foreground)",
        error: "var(--state-error)",
        errorForeground: "var(--state-error-foreground)",
        info: "var(--state-info)",
        infoForeground: "var(--state-info-foreground)",
    },

    component: {
        input: "var(--component-input)",
        inputPlaceholder: "var(--component-input-placeholder)",
        chart1: "var(--component-chart-1)",
        chart2: "var(--component-chart-2)",
        chart3: "var(--component-chart-3)",
        chart4: "var(--component-chart-4)",
        chart5: "var(--component-chart-5)",
    },
} as const;

// === SPACING TOKENS ===
export const spacingTokens = {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    18: "4.5rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    88: "22rem",
    96: "24rem",
    100: "25rem",
    112: "28rem",
    128: "32rem",
} as const;

// === SHADOW TOKENS ===
export const shadowTokens = {
    xs: "var(--shadow-xs)",
    sm: "var(--shadow-sm)",
    base: "var(--shadow-base)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    xl: "var(--shadow-xl)",
    "2xl": "var(--shadow-2xl)",
    inner: "var(--shadow-inner)",
    brand: "var(--shadow-brand)",
    success: "var(--shadow-success)",
    warning: "var(--shadow-warning)",
    error: "var(--shadow-error)",
} as const;

// === ANIMATION TOKENS ===
export const animationTokens = {
    duration: {
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        250: "250ms",
        300: "300ms",
        350: "350ms",
        450: "450ms",
        500: "500ms",
        550: "550ms",
        650: "650ms",
        700: "700ms",
        750: "750ms",
        850: "850ms",
        950: "950ms",
        1000: "1000ms",
    },
    timing: {
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
} as const;

// === TYPE DEFINITIONS ===
export type ColorToken = typeof colorTokens;
export type SpacingToken = keyof typeof spacingTokens;
export type ShadowToken = keyof typeof shadowTokens;
export type AnimationDuration = keyof typeof animationTokens.duration;
export type AnimationTiming = keyof typeof animationTokens.timing;

// === UTILITY FUNCTIONS ===

/**
 * Get a color token value by path
 * @param path - Dot notation path to the color token
 * @returns CSS custom property value
 */
export function getColor(path: string): string {
    const parts = path.split(".");
    let current: any = colorTokens;

    for (const part of parts) {
        if (current[part]) {
            current = current[part];
        } else {
            console.warn(`Color token not found: ${path}`);
            return "";
        }
    }

    return current;
}

/**
 * Get a spacing token value
 * @param size - Spacing size key
 * @returns CSS spacing value
 */
export function getSpacing(size: SpacingToken): string {
    return spacingTokens[size];
}

/**
 * Get a shadow token value
 * @param shadow - Shadow key
 * @returns CSS shadow value
 */
export function getShadow(shadow: ShadowToken): string {
    return shadowTokens[shadow];
}

/**
 * Create a CSS custom property reference
 * @param property - CSS custom property name (without --)
 * @returns CSS custom property reference
 */
export function cssVar(property: string): string {
    return `var(--${property})`;
}

/**
 * Theme-aware color utility
 * @param lightColor - Color to use in light mode
 * @param darkColor - Color to use in dark mode
 * @returns CSS that switches between colors based on theme
 */
export function themeColor(lightColor: string, darkColor: string): string {
    return `light-dark(${lightColor}, ${darkColor})`;
}

/**
 * Common color combinations for consistent theming
 */
export const colorCombinations = {
    primary: {
        background: colorTokens.interactive.primary,
        foreground: colorTokens.interactive.primaryForeground,
    },
    secondary: {
        background: colorTokens.interactive.secondary,
        foreground: colorTokens.interactive.secondaryForeground,
    },
    accent: {
        background: colorTokens.interactive.accent,
        foreground: colorTokens.interactive.accentForeground,
    },
    destructive: {
        background: colorTokens.interactive.destructive,
        foreground: colorTokens.interactive.destructiveForeground,
    },
    muted: {
        background: colorTokens.interactive.muted,
        foreground: colorTokens.interactive.mutedForeground,
    },
    success: {
        background: colorTokens.state.success,
        foreground: colorTokens.state.successForeground,
    },
    warning: {
        background: colorTokens.state.warning,
        foreground: colorTokens.state.warningForeground,
    },
    error: {
        background: colorTokens.state.error,
        foreground: colorTokens.state.errorForeground,
    },
    info: {
        background: colorTokens.state.info,
        foreground: colorTokens.state.infoForeground,
    },
} as const;

export type ColorCombination = keyof typeof colorCombinations;
