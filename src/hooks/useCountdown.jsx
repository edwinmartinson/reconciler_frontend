import { useEffect, useState } from "react";
import { getEndpoint } from "../utils/getEndpoint";

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState("00hrs 00min 00s");

  useEffect(() => {
    try {
      const eventSource = new EventSource(getEndpoint("countdown:stream"));

      eventSource.onmessage = (event) => {
        setTimeLeft(event.data);
      };

      eventSource.onerror = () => eventSource.close();
      return () => eventSource.close();
    } catch (error) {
      console.error(error?.message || error);
    }
  }, []);

  return [timeLeft];
}

export default useCountdown;
