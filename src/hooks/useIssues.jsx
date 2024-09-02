import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function useIssues(fromCore, fromParty) {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const selectedCoreTrans = state.issues.selectedCoreTrans;
    const selectedPartyTrans = state.issues.selectedPartyTrans;

    const filteredCoreTrans = fromCore.filter((trans) =>
      selectedCoreTrans.includes(trans.id)
    );
    const filteredPartyTrans = fromParty.filter((trans) =>
      selectedPartyTrans.includes(trans.id)
    );

    const coreTotal = filteredCoreTrans?.reduce((pre, cur) => {
      return pre + Number.parseFloat(cur.details.amount);
    }, 0);
    const partyTotal = filteredPartyTrans?.reduce((pre, cur) => {
      return pre + Number.parseFloat(cur.details.amount);
    }, 0);

    const coreRef = filteredCoreTrans.at(0)?.refId || "";

    const handleTotal = (coreTotal, partyTotal) => {
      dispatch({
        type: "updateIssues",
        payload: { coreTotal, partyTotal },
      });
    };

    const handleRef = (coreRef) => {
      dispatch({
        type: "updateIssues",
        payload: { coreRef },
      });
    };

    handleTotal(coreTotal, partyTotal);
    handleRef(coreRef);
  }, [
    dispatch,
    state.issues.selectedCoreTrans,
    state.issues.selectedPartyTrans,
    fromCore,
    fromParty,
  ]);
}

export default useIssues;
