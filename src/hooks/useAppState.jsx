import { useContext, useEffect, useState } from "react";
import { getEndpoint } from "../utils/getEndpoint";
import { AppContext } from "../context/AppContext";

function useAppStateSteam() {
  const [error, setError] = useState(false);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    try {
      const eventSource = new EventSource(getEndpoint("state:stream"));

      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        dispatch({ type: "updateAppState", payload: parsedData });
      };

      eventSource.onerror = (err) => {
        setError(true);
        eventSource.close();
      };

      return () => eventSource.close();
    } catch (error) {
      console.error(error?.message || error);
      setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [error];
}

export default useAppStateSteam;
