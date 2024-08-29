import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Message from "../../components/Message/Message";

import "./Home.scss";
import TransTable from "./TransTable";
import Widgets from "./Widgets";

export default function Home() {
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
