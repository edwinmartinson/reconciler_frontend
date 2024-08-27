import { useContext, useState } from "react";
import { getEndpoint } from "./../utils/getEndpoint";
import { AppContext } from "../context/AppContext";

/**
 *
 * @param {"import" | "recon"} action
 * @returns {error, hasResponded, message, doAction}
 */
function useActions(action) {
  const { dispatch } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [hasResponded, setHasResponded] = useState(null);

  async function doAction() {
    setHasResponded(null);
    setError(null);
    setMessage(null);

    dispatch({ type: "updateLoader", payload: true });

    try {
      const result = await fetch(getEndpoint("actions"), {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const resultData = await result.json();

      if (resultData.status === "success") {
        setError(false);
        setMessage(resultData.message);
        setHasResponded(true);
      }

      if (resultData.status === "fail") {
        setError(true);
        setMessage(resultData.message);
        setHasResponded(true);
      }
    } catch (error) {
      console.error(error?.message || error);
    } finally {
      dispatch({ type: "updateLoader", payload: false });
    }
  }

  return { error, hasResponded, message, doAction };
}

export default useActions;
