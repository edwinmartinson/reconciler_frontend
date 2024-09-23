import { useContext, useState } from "react";
import { DataField, FieldContainer, SelectField } from "../components/Fields";
import Table from "../components/Table";
import { StatsWidget } from "../components/Widgets";
import { AppContext } from "../context/AppContext";
import Message from "../components/Message";
import { useTrans, useTransStream } from "../hooks/useTrans";
import formatAmount from "../utils/format.utils";

function Trans({ transState }) {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;

  return ledgerId !== "000000000000" ? (
    <main className="main">
      <Filters />
      <Widgets transState={transState} />
      <Tables transState={transState} />
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

export default Trans;

function Filters() {
  const { state, dispatch } = useContext(AppContext);

  const transType = state.transType;
  const startDate = state.startDate;
  const endDate = state.endDate;

  return (
    <section className="home-filters" role="form">
      {/* <FieldContainer>
        <SelectField
          classes="field__row field__bg-fff"
          label="State"
          handleValue={(value) => {
            dispatch({ type: "updateTransState", payload: value });
            dispatch({ type: "updateChangeInState", payload: true });
          }}
          defaultValue={transState}
        >
          <option value="source">Pending</option>
          <option value="issues">Outstanding</option>
          <option value="archive">Reconciled</option>
        </SelectField>
      </FieldContainer> */}

      <FieldContainer>
        <DataField
          classes="field__row field__bg-fff"
          label="Start date"
          handleValue={(value) =>
            dispatch({ type: "updateStartDate", payload: value })
          }
          defaultValue={startDate}
        />
      </FieldContainer>

      <FieldContainer>
        <DataField
          classes="field__row field__bg-fff"
          label="End date"
          handleValue={(value) =>
            dispatch({ type: "updateEndDate", payload: value })
          }
          defaultValue={endDate}
        />
      </FieldContainer>

      <FieldContainer>
        <SelectField
          classes="field__row field__bg-fff"
          label="Type"
          handleValue={(value) =>
            dispatch({ type: "updateTransType", payload: value })
          }
          defaultValue={transType}
        >
          <option value="az">All (Withdrawals & Deposits)</option>
          <option value="db">Debit (Withdrawals)</option>
          <option value="cd">Credit (Deposits)</option>
        </SelectField>
      </FieldContainer>
    </section>
  );
}

function Widgets({ transState }) {
  const { state } = useContext(AppContext);
  const startDate = state.startDate;
  const endDate = state.endDate;

  const { hasLoaded, stats } = useTransStream(transState, startDate, endDate);

  return (
    <section className="widgets widgets--home">
      {/* <CountdownWidget /> */}

      <StatsWidget
        hasLoaded={hasLoaded}
        label={"Total Amount (Core)"}
        value={formatAmount(stats?.coreTotal || 0.0)}
        desc={"Showing total core transaction amount."}
      />

      <StatsWidget
        hasLoaded={hasLoaded}
        label={"Total Amount (Party)"}
        value={formatAmount(stats?.partyTotal || 0.0)}
        desc={"Show total party transaction amount."}
      />

      <StatsWidget
        hasLoaded={hasLoaded}
        label={"Outstanding Balance"}
        value={formatAmount(stats?.balance || 0.0)}
        desc={"Showing outstanding balance."}
      />
    </section>
  );
}

function Tables({ transState }) {
  const { state } = useContext(AppContext);
  const startDate = state.startDate;
  const endDate = state.endDate;

  return (
    <section className="tables">
      <CoreTable
        transState={transState}
        startDate={startDate}
        endDate={endDate}
      />
      <PartyTable
        transState={transState}
        startDate={startDate}
        endDate={endDate}
      />
    </section>
  );
}

function CoreTable({ transState, startDate, endDate }) {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useTrans(
    transState,
    startDate,
    endDate,
    page,
    "core"
  );

  return (
    <Table
      label="From core banking"
      titles={["Date", "Reference", "Details", "Amount"]}
      isRefreshing={isLoading}
      showCollapse={true}
      pagination={{
        pageCount: data?.pages,
        page,
        setPage,
      }}
      rowCount={Object.entries(data?.trans).length}
    >
      {data?.trans.map((record, index) => (
        <tr key={index}>
          <td>{record.date}</td>
          <td>{record.refId}</td>
          <td>
            {transState === "source" ? record.details : record.details.details}
          </td>
          <td>
            {transState === "source" ? record.amount : record.details.amount}
          </td>
        </tr>
      ))}
    </Table>
  );
}

function PartyTable({ transState, startDate, endDate }) {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useTrans(
    transState,
    startDate,
    endDate,
    page,
    "party"
  );

  return (
    <Table
      label="From third parties"
      titles={["Date", "Reference", "Details", "Amount"]}
      isRefreshing={isLoading}
      showCollapse={true}
      pagination={{
        pageCount: data?.pages,
        page,
        setPage,
      }}
      rowCount={Object.entries(data?.trans).length}
    >
      {data?.trans.map((record, index) => (
        <tr key={index}>
          <td>{record.date}</td>
          <td>{record.refId}</td>
          <td>
            {" "}
            {transState === "source" ? record.details : record.details.details}
          </td>
          <td>
            {transState === "source" ? record.amount : record.details.amount}
          </td>
        </tr>
      ))}
    </Table>
  );
}
