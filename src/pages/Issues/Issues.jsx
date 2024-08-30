import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Widgets } from "./components/Widgets";
import Message from "../../components/Message";

import SelectedTable from "./components/SelectedTable";
import Filters from "./components/Filters";
import SelectTable from "./components/SelectTable";

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
