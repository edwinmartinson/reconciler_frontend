import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getEndpoint } from "../utils/endpoint.utils";

function useManual() {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [resolved, setResolved] = useState(false);

  const issues = state.issues;
  const coreTransIds = issues.selectedCoreTrans.map((trans) => trans.id);
  const partyTransIds = issues.selectedPartyTrans.map((trans) => trans.id);

  const manualObj = {
    ledgerId: state.ledgerId,
    transIds: [...coreTransIds, ...partyTransIds],
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

  // function sendTrans() {
  //   console.log(manualObj);
  // }

  return { error, message, resolved, sendTrans };
}

export default useManual;
