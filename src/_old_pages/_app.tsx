import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../store";
import ErrorBoundary from "../components/errorBoundary/errorBoundary";

import { ThemeContext, Theme } from "../features/theme";
import { useState, useMemo } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(Theme.Light);
  const themeValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ErrorBoundary>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}
