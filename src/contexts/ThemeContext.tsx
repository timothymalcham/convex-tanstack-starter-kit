import { createContext, useContext } from "react";
import type { Theme } from "~/utils/theme";
import { setTheme } from "~/utils/theme";

interface ThemeContextType {
    theme: Theme; // User's preference (light, dark, system)
    actualTheme: "light" | "dark"; // The actual resolved theme
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
    children, 
    theme, 
    actualTheme 
}: { 
    children: React.ReactNode; 
    theme: Theme;
    actualTheme: "light" | "dark";
}) {
    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

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
