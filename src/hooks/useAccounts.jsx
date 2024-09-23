import { useEffect, useState } from "react";
import { getEndpoint } from "../utils/endpoint.utils";

export default function useAccounts() {
  const [accts, setAccts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAccts() {
      try {
        const result = await fetch(getEndpoint("accts"), { cache: "no-store" });
        const resultData = await result.json();

        resultData.status === "success" && setAccts(resultData.data);
      } catch (error) {
        console.error(error?.message || error);
        setError(true);
      }
    }

    fetchAccts();
  }, []);

  return { error, accts };
}
