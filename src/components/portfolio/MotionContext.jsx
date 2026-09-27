import { createContext, useContext, useEffect, useState } from "react";

const MotionCtx = createContext({ reduced: false, toggle: () => {} });

export function MotionProvider({ children }) {
  const [reduced, setReduced] = useState(() => {
    const saved = localStorage.getItem("reduced-motion");
    if (saved !== null) return saved === "1";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
    localStorage.setItem("reduced-motion", reduced ? "1" : "0");
  }, [reduced]);

  return (
    <MotionCtx.Provider value={{ reduced, toggle: () => setReduced((r) => !r) }}>
      {children}
    </MotionCtx.Provider>
  );
}

export const useReducedMotion = () => useContext(MotionCtx);

export default MotionProvider;