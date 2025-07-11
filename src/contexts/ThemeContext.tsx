import { createContext, useContext, useEffect } from "react";
import type { Theme } from "~/utils/theme";
import { setTheme, subscribeToSchemeChange } from "~/utils/theme";

interface ThemeContextType {
    theme: Theme; // User's preference (light, dark, system)
    actualTheme: "light" | "dark"; // The actual resolved theme
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
    children,
    theme,
    actualTheme,
}: {
    children: React.ReactNode;
    theme: Theme;
    actualTheme: "light" | "dark";
}) {
    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    // Subscribe to system theme changes when user preference is "system"
    useEffect(() => {
        if (theme === "system") {
            return subscribeToSchemeChange(() => {
                // The page will reload when system theme changes
                // This ensures consistency between server and client
            });
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, actualTheme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
