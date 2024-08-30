import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Message from "../../components/Message";

import TransTable from "./components/TransTable";
import Widgets from "./components/Widgets";

export default function Source() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  return ledgerId !== "000000000000" ? (
    <main className="main">
      <Widgets />
      <div className="wrapper">
        <TransTable source={"core"} />
        <TransTable source={"party"} />
      </div>
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}
