import { useEffect, useState } from "react";
import { getEndpoint } from "../utils/endpoint.utils";

export default function useInts(page = 1) {
  const [ints, setInts] = useState({ pages: 1, page: 1, ints: [] });
  const [isLoading, setIsLoading] = useState(false);

  async function fetchInts(flag = "many", ledgerId) {
    setIsLoading(true);

    try {
      const result = await fetch(
        getEndpoint("ints") +
          (flag === "many" ? `?page=${page}` : `/${ledgerId}`),
        { cache: "no-store" }
      );
      const resultData = await result.json();

      if (resultData.status === "success") setInts(resultData.data);
      else throw new Error(resultData.message);
    } catch (error) {
      console.error(error?.message || error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchInts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { isLoading, ints, fetchInts };
}
