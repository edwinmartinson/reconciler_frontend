import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export default function useModalEngine() {
  const { state, dispatch } = useContext(AppContext);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function eventLoop() {
      while (true) {
        if (state.modalStack.length > 0) continue;
        if (state.modelQueue.length === 0) continue;

        const action = [...state.modelQueue].shift();

        dispatch({ type: "updateModalStack", payload: action });
        dispatch({ type: "refreshModelQueue" });

        await sleep(1000);
      }
    }

    eventLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
