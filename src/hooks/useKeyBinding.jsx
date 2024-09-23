import { useEffect } from "react";

/**
 * Bind a key combination to an action.
 *
 * @param {string} specialKey - (optional) A special key that must be pressed
 *   in conjunction with the specified key. Valid special keys are "ctrl",
 *   "alt", and "shift".
 * @param {string} key - The key code of the key to bind to the action.
 *   The key code should be in the format returned by the KeyboardEvent.code
 *   property.
 * @param {function():void} action - The action to perform when the key
 *   combination is pressed.
 *
 * @returns {void}
 */
function useKeyBinding(specialKey, key, action) {
  useEffect(
    function () {
      function callback(e) {
        switch (specialKey) {
          case "ctrl":
            if (e.ctrlKey && e.code.toLowerCase() === key.toLowerCase()) {
              e.preventDefault();
              action();
            }
            break;

          case "alt":
            if (e.altKey && e.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
            break;

          case "shift":
            if (e.shiftKey && e.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
            break;

          default:
            if (e.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
            break;
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key, specialKey]
  );
}

export default useKeyBinding;
