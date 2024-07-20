import { useState } from "react";

export default function useLocalStor(valueName: string) {
  function initState() {
    return localStorage.getItem(valueName) ?? "";
  }

  const [value, setValue] = useState(initState());

  function setNewValue(newValue: string) {
    localStorage.setItem(valueName, newValue);
    setValue(newValue);
  }

  return [value, setNewValue] as const;
}
