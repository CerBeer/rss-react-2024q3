import { useState } from "react";

export default function useLocalStor(valueName: string) {
  function initState() {
    return localStorage.getItem(valueName) ?? "";
  }

  const [value, seValue] = useState(initState());

  function setNewValue(newValue: string) {
    localStorage.setItem(valueName, newValue);
    seValue(newValue);
  }

  return [value, setNewValue] as const;
}
