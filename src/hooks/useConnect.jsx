import { useContext, useEffect, useRef } from "react";
import { getEndpoint } from "../utils/getEndpoint";
import { AppContext } from "../context/AppContext";

function useConnect() {
  const { state, dispatch } = useContext(AppContext);
  const hasCheckedIn = useRef(false);

  const handleConnected = () => {
    dispatch({ type: "updateIsConnected", payload: true });
  };

  const handleDisconnected = () => {
    dispatch({ type: "updateIsConnected", payload: false });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!hasCheckedIn && state.isOnline) {
        handleDisconnected();
      }

      if (hasCheckedIn) {
        hasCheckedIn.current = false;
      }
    }, 5000);

    try {
      const eventSource = new EventSource(getEndpoint("connect:stream"));

      eventSource.onmessage = () => {
        handleConnected();
        hasCheckedIn.current = true;
      };

      eventSource.onerror = () => {
        handleDisconnected();
        eventSource.close();
      };

      return () => {
        eventSource.close();
        clearInterval(intervalId);
      };
    } catch (error) {
      console.error(error?.message || error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useConnect;
