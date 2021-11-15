import { useState } from "react";

export const useToggle = (initial) => {
  const [isActive, setisActive] = useState(initial);

  const toggle = () => {
    setisActive(!isActive);
  };

  const activate = () => {
    setisActive(true);
  };

  const deActivate = () => {
    setisActive(false);
  };

  return {
    isActive,
    activate,
    deActivate,
    toggle,
  };
};