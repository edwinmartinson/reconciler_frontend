import { useContext, useEffect, useState } from "react";
import { getEndpoint } from "../utils/endpoint.utils";
import { AppContext } from "../context/AppContext";

/**
 * Fetches transactions from the API.
 * @param {string} mode - The type of transactions to fetch.
 * @param {string} startDate - The start date of the transactions.
 * @param {string} endDate - The end date of the transactions.
 * @param {number} page - The page of transactions to fetch.
 * @param {string} from - The source of the transactions.
 * @returns {error, isLoading, data, getTrans} - An object containing
 *   error (a boolean indicating whether the fetch was successful),
 *   isLoading (a boolean indicating whether the fetch is in progress),
 *   data (an object containing the transactions, with keys `pages` (the total
 *     number of pages), `page` (the current page), and `trans` (an array of
 *     transactions), and a function `getTrans` to fetch the transactions.
 */
export function useTrans(mode, startDate, endDate, page = 1, from = "core") {
  const [error, setError] = useState(false);
  const [data, setData] = useState({ pages: 1, page: 1, trans: [] });
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  async function getTrans() {
    setIsLoading(true);

    try {
      const query = `?mode=${mode}&ledgerId=${ledgerId}&startDate=${startDate}&endDate=${endDate}&from=${from}&page=${page}`;
      const result = await fetch(getEndpoint("trans") + query, {
        cache: "no-store",
      });
      const resultData = await result.json();

      resultData.status === "success" && setData(resultData.data);
    } catch (error) {
      setIsLoading(false);
      console.error(error?.message || error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTrans();

    // eslint-disable-next-line
  }, [ledgerId, startDate, endDate, mode, page, from]);

  return { error, isLoading, data, getTrans };
}

/**
 * Fetches transaction statistics from the API using Server-Sent Events.
 * @param {string} mode - The type of transactions to fetch.
 * @param {string} startDate - The start date of the transactions.
 * @param {string} endDate - The end date of the transactions.
 * @returns {error, hasLoaded, stats} - An object containing
 *   error (a boolean indicating whether the fetch was successful),
 *   hasLoaded (a boolean indicating whether the fetch has finished),
 *   and stats (an object containing the following keys:
 *     totalCount (the total count of transactions),
 *     coreCount (the count of core transactions),
 *     partyCount (the count of party transactions),
 *     coreTotal (the total amount of core transactions),
 *     partyTotal (the total amount of party transactions),
 *     balance (the difference between core and party totals), and
 *     extraData (an object containing any extra data returned by the API).
 */
export function useTransStream(mode, startDate, endDate) {
  const [error, setError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [stats, setStats] = useState({
    totalCount: 0,
    coreCount: 0,
    partyCount: 0,
    coreTotal: 0.0,
    partyTotal: 0.0,
    balance: 0.0,
    extraData: {},
  });

  const { state, dispatch } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  useEffect(() => {
    setHasLoaded(false);

    try {
      const query = `?mode=${mode}&ledgerId=${ledgerId}&startDate=${startDate}&endDate=${endDate}`;
      const eventSource = new EventSource(getEndpoint("trans:stream") + query);

      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData?.changeIn.core || parsedData?.changeIn.party) {
          dispatch({
            type: "updateChangeTime",
            payload: parsedData?.timestamp,
          });
        }

        setHasLoaded(true);
        setStats(parsedData?.stats);
        dispatch({ type: "updateChangeInState", payload: false });
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, startDate, endDate, ledgerId]);

  return { error, hasLoaded, stats };
}
