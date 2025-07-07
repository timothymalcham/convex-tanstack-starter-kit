/**
 * ThemeScript Component
 * 
 * Injects a script that runs before React hydration to prevent flash of incorrect theme.
 * This works in conjunction with @epic-web/client-hints to provide a seamless theme experience.
 * 
 * The script:
 * 1. Reads the user's theme preference from cookies
 * 2. Reads the system preference from client hints cookie
 * 3. Applies the correct theme immediately
 */

export function ThemeScript({ nonce }: { nonce?: string }) {
  // This script runs before React hydration to prevent FOIT
  const script = `
    (function() {
      // Get user's explicit theme preference
      function getUserPreference() {
        const match = document.cookie.match(/theme=([^;]+)/);
        return match ? match[1] : 'system';
      }
      
      // Get system theme from client hints cookie
      function getSystemTheme() {
        const match = document.cookie.match(/CH-prefers-color-scheme=([^;]+)/);
        if (match) {
          return match[1];
        }
        // Fallback to media query if client hint not available yet
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      // Determine actual theme to apply
      const userPref = getUserPreference();
      const actualTheme = userPref === 'system' ? getSystemTheme() : userPref;
      
      // Apply theme class immediately
      document.documentElement.classList.toggle('dark', actualTheme === 'dark');
      
      // Store for React to use during hydration
      window.__userThemePreference = userPref;
      window.__actualTheme = actualTheme;
    })();
  `;

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}