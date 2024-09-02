import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { Widgets } from "./components/Widgets";
import Message from "../../components/Message";

import SelectedTable from "./components/SelectedTable";
// import Filters from "./components/Filters";
import SelectTable from "./components/SelectTable";
import { useTrans, useTransStream } from "../../hooks/useTrans";
import useIssues from "../../hooks/useIssues";

function Issues() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  return ledgerId !== "000000000000" ? (
    <main className="main">
      <Widgets />
      {/* <Filters /> */}
      <Selection />
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

function Selection() {
  const { trans, getTrans } = useTrans("issues", 200);
  const { changeTime } = useTransStream("issues");

  useIssues(trans?.fromCore, trans?.fromParty);

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
