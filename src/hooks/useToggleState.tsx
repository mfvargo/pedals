import { useState } from "react";

export function useToggleState(initialVal: boolean) {
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
}
