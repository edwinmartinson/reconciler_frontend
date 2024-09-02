import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { Widgets } from "./components/Widgets";
import Message from "../../components/Message";

import SelectedTable from "./components/SelectedTable";
import Filters from "./components/Filters";
import SelectTable from "./components/SelectTable";
import { useTrans, useTransStream } from "../../hooks/useTrans";

function Issues() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  return ledgerId !== "000000000000" ? (
    <main className="main">
      <Widgets />
      <Filters />
      <Selection />
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

function Selection() {
  const { state, dispatch } = useContext(AppContext);
  const { trans, getTrans } = useTrans("issues", 200);
  const { changeTime } = useTransStream("issues");

  const isEmpty = (source) => {
    const coreLength = trans?.fromCore.length;
    const partyLength = trans?.fromParty.length;

    switch (source) {
      case "core":
        return coreLength === 0 || coreLength == undefined;

      case "party":
        return partyLength === 0 || partyLength == undefined;
    }
  };

  useEffect(() => {
    const selectedCoreTrans = state.issues.selectedCoreTrans;
    const selectedPartyTrans = state.issues.selectedPartyTrans;

    const filteredCoreTrans = trans?.fromCore.filter((trans) =>
      selectedCoreTrans.includes(trans.id)
    );
    const filteredPartyTrans = trans?.fromParty.filter((trans) =>
      selectedPartyTrans.includes(trans.id)
    );

    const coreTotal = filteredCoreTrans?.reduce((pre, cur) => {
      return pre + Number.parseFloat(cur.details.amount);
    }, 0);
    const partyTotal = filteredPartyTrans?.reduce((pre, cur) => {
      return pre + Number.parseFloat(cur.details.amount);
    }, 0);

    const handleTotal = (coreTotal, partyTotal) => {
      dispatch({
        type: "updateIssues",
        payload: { coreTotal, partyTotal },
      });
    };

    handleTotal(coreTotal, partyTotal);
  }, [
    dispatch,
    state.issues.selectedCoreTrans,
    state.issues.selectedPartyTrans,
    trans?.fromCore,
    trans?.fromParty,
  ]);

  useEffect(() => {
    getTrans();
    console.log(`Change, Detected. ${new Date().toLocaleTimeString()}`);

    // eslint-disable-next-line
  }, [changeTime]);

  return (
    <div className="selection">
      <div className="selection__col">
        <SelectTable
          source={"core"}
          isEmpty={isEmpty("core")}
          transArr={trans?.fromCore}
        />
        <SelectedTable source={"core"} transArr={trans?.fromCore} />
      </div>

      <div className="selection__col">
        <SelectTable
          source={"party"}
          isEmpty={isEmpty("party")}
          transArr={trans?.fromParty}
        />
        <SelectedTable source={"party"} transArr={trans?.fromParty} />
      </div>
    </div>
  );
}

export default Issues;
