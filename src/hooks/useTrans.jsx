import { useContext, useEffect, useState } from "react";
import { getEndpoint } from "./../utils/getEndpoint";
import { AppContext } from "../context/AppContext";

/**
 * React hook for getting transactions.
 * @param {"pending" | "issues" | "archive"} mode
 * @param {number} limit
 * @returns {object}
 */

export function useTrans(mode, limit = 100) {
  const [error, setError] = useState(false);
  const [trans, setTrans] = useState({ fromCore: [], fromParty: [] });

  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  async function getTrans() {
    try {
      const query = `?mode=${mode}&ledgerId=${ledgerId}&limit=${limit}`;
      const result = await fetch(getEndpoint("trans") + query, {
        cache: "no-store",
      });
      const resultData = await result.json();

      resultData.status === "success" && setTrans(resultData.data);
    } catch (error) {
      console.error(error?.message || error);
      setError(true);
    }
  }

  useEffect(() => {
    getTrans();
    // eslint-disable-next-line
  }, [ledgerId]);

  return { error, trans, getTrans };
}

/**
 * Listens for changes in transaction tables.
 * @param {"pending" | "issues" | "archive"} mode
 * @returns {object}
 */
export function useTransStream(mode) {
  const [error, setError] = useState(false);
  const [changeTime, setChangeTime] = useState(0);

  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  useEffect(() => {
    try {
      const query = `?mode=${mode}&ledgerId=${ledgerId}`;
      const eventSource = new EventSource(getEndpoint("trans:stream") + query);

      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData?.changeInCore || parsedData?.changeInParty) {
          setChangeTime(parsedData?.timestamp);
        }
      };

      eventSource.onerror = (err) => {
        setError(`SSE connection error: ${err}`);
        eventSource.close();
      };

      return () => eventSource.close();
    } catch (error) {
      console.error(error?.message || error);
      setError(true);
    }
  }, [mode, ledgerId]);

  return { error, changeTime };
}
