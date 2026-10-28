import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function updateValue(nextValue) {
    setValue((currentValue) => {
      const resolvedValue = typeof nextValue === "function" ? nextValue(currentValue) : nextValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolvedValue));
      } catch {
        // Keep the in-memory state usable when browser storage is unavailable.
      }
      return resolvedValue;
    });
  }

  return [value, updateValue];
}