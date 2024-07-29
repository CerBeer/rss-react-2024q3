import { useState } from "react";

export default function useLocalStor(valueName: string, defaultValue: string) {
  function initState() {
    let currentValue = localStorage.getItem(valueName);
    if (!currentValue) {
      localStorage.setItem(valueName, defaultValue);
      currentValue = defaultValue;
    }
    return currentValue;
  }

  const [value, setValue] = useState(initState());

  function setNewValue(newValue: string) {
    localStorage.setItem(valueName, newValue);
    setValue(newValue);
  }

  return [value, setNewValue] as const;
}
