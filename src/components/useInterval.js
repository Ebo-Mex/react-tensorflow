import { useRef, useEffect } from "react";

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // remember last callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    // Create interval and clear on unmount
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
