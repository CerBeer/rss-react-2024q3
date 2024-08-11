import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import HeadPage from "../../app/head-page";
import LoaderProvider from "../../features/loader-provider";
import ThemeProvider from "../../features/theme-provider";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <HeadPage>{children}</HeadPage>
      </LoaderProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
