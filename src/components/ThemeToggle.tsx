import { Button } from "~/components/ui/Button";
import { useTheme } from "~/contexts/ThemeContext";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        switch (theme) {
            case "light":
                setTheme("dark");
                break;
            case "dark":
                setTheme("system");
                break;
            case "system":
                setTheme("light");
                break;
        }
    };

    const getThemeIcon = () => {
        switch (theme) {
            case "light":
                return "☀️";
            case "dark":
                return "🌙";
            case "system":
                return "💻";
        }
    };

    const getThemeLabel = () => {
        switch (theme) {
            case "light":
                return "Light";
            case "dark":
                return "Dark";
            case "system":
                return "System";
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2 text-white hover:bg-slate-800"
            title={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
        >
            <span className="text-base">{getThemeIcon()}</span>
            <span className="hidden sm:inline">{getThemeLabel()}</span>
        </Button>
    );
}
