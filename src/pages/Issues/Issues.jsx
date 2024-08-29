import "./Issues.scss";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Widgets } from "./Widgets";
import Message from "../../components/Message/Message";

import SelectedTable from "./SelectedTable";
import Filters from "./Filters";
import SelectTable from "./SelectTable";

function Issues() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  return ledgerId !== "000000000000" ? (
    <main className="main">
      <Widgets />
      <Filters />
      <div className="selection">
        <div className="selection__col">
          <SelectTable />
          <SelectedTable />
        </div>

        <div className="selection__col">
          <SelectTable />
          <SelectedTable />
        </div>
      </div>
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

export default Issues;
