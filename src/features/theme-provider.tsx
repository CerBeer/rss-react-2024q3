"use client";

import { createContext, useMemo, useState } from "react";

export const Theme = {
  Light: "Light",
  Dark: "Dark",
};

export type ThemeType = (typeof Theme)[keyof typeof Theme];

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: ((newValue: string) => void) | null;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Light,
  setTheme: null,
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(Theme.Light);
  const themeValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="root-theme" data-theme={theme} data-testid="root-theme">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
