"use client";

import { createContext, useRef, MutableRefObject } from "react";

export interface LoaderContextType {
  spinnerRef: MutableRefObject<HTMLDivElement | null> | null;
}

export const LoaderContext = createContext<LoaderContextType>({
  spinnerRef: null,
});

export default function LoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderValue = { spinnerRef: loaderRef };
  return (
    <LoaderContext.Provider value={loaderValue}>
      {children}
    </LoaderContext.Provider>
  );
}
