import { createContext } from "react";

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

export default ThemeContext;
