import { useState } from "react";

export default function useLocalStor(valueName: string, defaultValue: string) {
  function initState() {
    const currentValue = localStorage.getItem(valueName);
    if (!currentValue) localStorage.setItem(valueName, defaultValue);
    return localStorage.getItem(valueName) ?? "";
  }

  const [value, setValue] = useState(initState());

  function setNewValue(newValue: string) {
    localStorage.setItem(valueName, newValue);
    setValue(newValue);
  }

  return [value, setNewValue] as const;
}
