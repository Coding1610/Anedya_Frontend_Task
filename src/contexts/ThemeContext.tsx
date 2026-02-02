import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// theme 
type Theme = 'light' | 'dark';

// type of theme context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'dashboard_theme';

// create custome hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if(!context){
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// wrap our app with theme provider
interface ThemeProviderProps {
  children: React.ReactNode;
}

// create provider
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  
  const [theme, setThemeState] = useState<Theme>(() => {
    // get from local storage
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if(stored === 'light' || stored === 'dark'){
      return stored;
    }
    // same as system theme
    if(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // stored in local storage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // toggle theme
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // set specific theme
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
  
};