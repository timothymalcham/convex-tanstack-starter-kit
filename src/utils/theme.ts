import { getHintUtils } from "@epic-web/client-hints";
import { clientHint as colorSchemeHint, subscribeToSchemeChange } from "@epic-web/client-hints/color-scheme";
import { z } from "zod";

const ThemeSchema = z.enum(["light", "dark", "system"]);
export type Theme = z.infer<typeof ThemeSchema>;

// Client hints using built-in color scheme detection
export const hintsUtils = getHintUtils({
    theme: colorSchemeHint,
});

// Export the subscription function for theme changes
export { subscribeToSchemeChange };

export function getTheme(request?: Request): "light" | "dark" {
    if (!request) return "light";

    const hints = hintsUtils.getHints(request);
    return hints.theme;
}

export function getUserThemePreference(request?: Request): Theme {
    if (!request) return "system";

    // Check for user's explicit theme preference in cookie
    const cookieHeader = request.headers.get("Cookie");
    const themeCookie = cookieHeader
        ?.split(";")
        .find((c) => c.trim().startsWith("theme="))
        ?.split("=")[1];

    if (themeCookie && ThemeSchema.safeParse(themeCookie).success) {
        return themeCookie as Theme;
    }

    return "system";
}

export function setTheme(theme: Theme) {
    // Set the theme preference cookie
    document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Apply the theme immediately
    applyTheme(theme);

    // Reload the page to ensure server-side rendering picks up the new preference
    window.location.reload();
}

export function getSystemTheme(): "light" | "dark" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
    let actualTheme: "light" | "dark";

    if (theme === "system") {
        actualTheme = getSystemTheme();
    } else {
        actualTheme = theme;
    }

    document.documentElement.classList.toggle("dark", actualTheme === "dark");
}

export function getActualTheme(userPreference: Theme, detectedTheme?: "light" | "dark"): "light" | "dark" {
    if (userPreference === "system") {
        // Use detected theme from client hints if available, otherwise detect on client
        if (detectedTheme) {
            return detectedTheme;
        }
        if (typeof window !== "undefined") {
            return getSystemTheme();
        }
        return "light"; // fallback for SSR
    }
    return userPreference;
}
