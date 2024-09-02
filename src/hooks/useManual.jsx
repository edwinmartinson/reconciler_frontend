import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getEndpoint } from "../utils/getEndpoint";

function useManual() {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [resolved, setResolved] = useState(false);

  const issues = state.issues;

  const manualObj = {
    ledgerId: state.ledgerId,
    coreRef: issues.coreRef,
    transIds: [...issues.selectedCoreTrans, ...issues.selectedPartyTrans],
  };

  async function sendTrans() {
    setResolved(null);
    setError(null);
    setMessage(null);

    dispatch({ type: "updateLoader", payload: true });

    try {
      const result = await fetch(getEndpoint("manual"), {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manualObj),
      });

      const resultData = await result.json();

      if (resultData.status === "success") {
        setResolved(true);
        setError(false);
        setMessage(resultData.message);
      }

      if (resultData.status === "fail" || resultData.status === "error") {
        throw new Error(resultData.message);
      }
    } catch (error) {
      setResolved(true);
      setError(true);
      setMessage(error?.message || error);

      console.error(error?.message || error);
    } finally {
      dispatch({ type: "updateLoader", payload: false });
    }
  }

  return { error, message, resolved, sendTrans };
}

export default useManual;
