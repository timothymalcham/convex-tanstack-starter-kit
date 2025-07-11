import { Button } from "~/components/ui/Button";
import { Menu, MenuContent } from "~/components/ui/Menu";
import { useTheme } from "~/contexts/ThemeContext";
import { Icon } from "~/icons/icons";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const getThemeIcon = () => {
        switch (theme) {
            case "light":
                return "sun";
            case "dark":
                return "moon";
            case "system":
                return "computer";
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
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-content-secondary hover:text-content-primary hover:bg-surface-hover"
                    title={`Current theme: ${getThemeLabel()}`}
                >
                    <Icon name={getThemeIcon()} size="md" />
                    <span className="hidden sm:inline">{getThemeLabel()}</span>
                </Button>
            </Menu.Trigger>
            <MenuContent>
                <Menu.Item onClick={() => setTheme("light")} className="flex items-center gap-2">
                    <Icon name="sun" size="md" />
                    <span>Light</span>
                    <span className="ml-auto">{theme === "light" && <Icon name="check" size="md" />}</span>
                </Menu.Item>
                <Menu.Item onClick={() => setTheme("dark")} className="flex items-center gap-2">
                    <Icon name="moon" size="md" />
                    <span>Dark</span>
                    <span className="ml-auto">{theme === "dark" && <Icon name="check" size="md" />}</span>
                </Menu.Item>
                <Menu.Item onClick={() => setTheme("system")} className="flex items-center gap-2">
                    <Icon name="computer" size="md" />
                    <span>System</span>
                    <span className="ml-auto">{theme === "system" && <Icon name="check" size="md" />}</span>
                </Menu.Item>
            </MenuContent>
        </Menu.Root>
    );
}

/**
 * Simple theme toggle button (cycles through themes)
 * Use this when you want a simple toggle button instead of a dropdown
 */
export function SimpleThemeToggle() {
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
                return "sun";
            case "dark":
                return "moon";
            case "system":
                return "computer";
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
            className="flex items-center gap-2 text-content-secondary hover:text-content-primary hover:bg-surface-hover"
            title={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
        >
            <Icon name={getThemeIcon()} size="md" />
            <span className="hidden sm:inline">{getThemeLabel()}</span>
        </Button>
    );
}
