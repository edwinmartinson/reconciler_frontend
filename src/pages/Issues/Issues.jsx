import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Message from "../../components/Message/Message";

import "./Issues.scss";
import { Widgets } from "./Widgets";
import TbSelection from "./TbSelection";

function Issues() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  return ledgerId !== "000000000000" ? (
    <main className="main">
      <Widgets />

      <div className="wrapper">
        <TbSelection />
        <TbSelection />
      </div>
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

export default Issues;
