import { useEffect, useState } from "react";

/**
 * useViewport
 *
 * A hook to get the current window width and keep it updated
 * whenever the window resizes.
 *
 * @returns {Array} An array containing the current window width.
 *
 * @example
 * const [width] = useViewport()
 * console.log(width)
 */
function useViewport() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [width];
}

export default useViewport;
