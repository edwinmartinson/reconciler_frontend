import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Message from "../components/Message";

import { ActionWidget, StatsWidget } from "../components/Widgets";
import { DataField, FieldContainer, TextField } from "../components/Fields";
import Table from "../components/Table";
import { useTrans } from "../hooks/useTrans";
import useReseter from "../hooks/useReseter";
import useManual from "../hooks/useManual";
import useIssues from "../hooks/useIssues";
import formatAmount from "../utils/format.utils";

function Manual() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;
  const startDate = state.startDate;
  const endDate = state.endDate;

  return ledgerId !== "000000000000" ? (
    <main className="main">
      <Widgets />

      <section className="tables">
        <FiltersTable
          tableLabel={"From core banking"}
          sourceType={"core"}
          transState={"issues"}
          startDate={startDate}
          endDate={endDate}
        />
        <FiltersTable
          tableLabel={"From third parties"}
          sourceType={"party"}
          transState={"issues"}
          startDate={startDate}
          endDate={endDate}
        />
      </section>
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

export default Manual;

function Widgets() {
  const { state, dispatch } = useContext(AppContext);
  const { error, message, resolved, sendTrans } = useManual();
  const rester = useReseter("issues");

  const coreTotal = state.issues.coreTotal;
  const partyTotal = state.issues.partyTotal;

  const handleClick = () => {
    if (state.issues.selectedCoreTrans.length === 0) {
      dispatch({
        type: "updateDialog",
        payload: {
          show: true,
          type: "error",
          hideAction: true,
          title: "Invalid core selection?",
          description: "Please select at least one core transaction.",
          action: sendTrans,
        },
      });

      return;
    }
    if (state.issues.selectedPartyTrans.length === 0) {
      dispatch({
        type: "updateDialog",
        payload: {
          show: true,
          type: "error",
          hideAction: true,
          title: "Invalid party selection?",
          description: "Please select at least one party transaction.",
          action: sendTrans,
        },
      });

      return;
    }

    dispatch({
      type: "updateIssues",
      payload: { showModal: true, action: sendTrans },
    });
  };

  const handleRes = (error, message) => {
    if (error) {
      dispatch({
        type: "updateDialog",
        payload: {
          show: true,
          type: "error",
          hideAction: true,
          title: "Manual recon failed.",
          description: message,
        },
      });
    }

    if (!error) {
      rester.call();

      dispatch({
        type: "updateDialog",
        payload: {
          show: true,
          type: "success",
          hideAction: true,
          title: "Manual recon successful.",
          description:
            "Selected transactions have been successfully reconciled.",
        },
      });
    }
  };

  useEffect(() => {
    if (resolved) handleRes(error, message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolved]);

  return (
    <section className="widgets rm-1">
      <StatsWidget
        showLoader={false}
        label="Total Amount (Core)"
        value={formatAmount(coreTotal)}
        desc="Showing total amount for selected core trans."
      />

      <StatsWidget
        showLoader={false}
        label="Total Amount (Party)"
        value={formatAmount(partyTotal)}
        desc="Showing total amount for selected party trans"
      />

      <StatsWidget
        showLoader={false}
        label="Difference (Core + Party)"
        value={formatAmount(coreTotal + partyTotal)}
        desc="Showing difference of selected core and pary trans."
      />

      <ActionWidget
        title="Manually reconcile"
        desc="Manually reconcile selected trans."
        handleClick={handleClick}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="30" fill="#121212" />
          <path
            d="M33.5202 18.2713L33.4257 18.1884C33.0639 17.9121 32.5452 17.9397 32.2148 18.2713L32.1322 18.3662C31.8568 18.7293 31.8843 19.2499 32.2148 19.5815L34.6412 22.0145H26L25.7131 22.0196C21.4277 22.1712 18 25.7057 18 30.0436C18 32.1242 18.7886 34.02 20.0821 35.4464L20.1712 35.5319C20.3323 35.6695 20.5411 35.7526 20.7692 35.7526C21.279 35.7526 21.6923 35.3378 21.6923 34.8262C21.6923 34.613 21.6205 34.4166 21.5 34.26L21.2546 33.9761C20.3748 32.9079 19.8462 31.5377 19.8462 30.0436C19.8462 26.6326 22.6013 23.8674 26 23.8674H34.4689L32.2148 26.1323L32.1322 26.2272C31.8568 26.5904 31.8843 27.1109 32.2148 27.4425C32.5752 27.8043 33.1597 27.8043 33.5202 27.4425L37.4365 23.512L37.5191 23.4172C37.7944 23.054 37.7669 22.5335 37.4365 22.2019L33.5202 18.2713ZM40.4369 24.549C40.2768 24.4151 40.0709 24.3345 39.8461 24.3345C39.3363 24.3345 38.9231 24.7493 38.9231 25.2609C38.9231 25.4907 39.0064 25.7009 39.1435 25.8612C40.1528 26.9613 40.7692 28.4303 40.7692 30.0436C40.7692 33.4546 38.014 36.2198 34.6154 36.2198H26.0714L28.4165 33.8677L28.5064 33.7628C28.7494 33.4335 28.7469 32.9792 28.4991 32.6523L28.4165 32.5574L28.312 32.4671C27.9839 32.2234 27.5312 32.2258 27.2055 32.4746L27.111 32.5574L23.1947 36.488L23.1047 36.5927C22.8618 36.9221 22.8643 37.3765 23.1121 37.7032L23.1947 37.7981L27.111 41.7286L27.2145 41.8183C27.5759 42.0875 28.0887 42.0576 28.4165 41.7286C28.7469 41.397 28.7744 40.8764 28.4991 40.5133L28.4165 40.4184L26.0788 38.0726H34.6154L34.9023 38.0675C39.1877 37.9159 42.6154 34.3815 42.6154 30.0436C42.6154 27.9594 41.8241 26.0606 40.5266 24.6334L40.4369 24.549Z"
            fill="white"
          />
        </svg>
      </ActionWidget>
    </section>
  );
}

function FiltersTable({
  tableLabel,
  sourceType,
  transState,
  startDate,
  endDate,
}) {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useTrans(
    transState,
    startDate,
    endDate,
    page,
    sourceType
  );
  useIssues(sourceType);

  const { state, dispatch } = useContext(AppContext);
  const selectedCoreTrans = state.issues.selectedCoreTrans;
  const selectedPartyTrans = state.issues.selectedPartyTrans;

  const handleCheckCore = (action, trans) => {
    const exists = selectedCoreTrans.some((ele) => ele.id === trans.id);
    if (exists && action === "add") return;

    switch (action) {
      case "add":
        dispatch({
          type: "updateIssues",
          payload: {
            selectedCoreTrans: [...selectedCoreTrans, trans],
          },
        });
        break;
      case "remove":
        {
          const newSelectedTrans = selectedCoreTrans.filter(
            (ele) => ele.id !== trans.id
          );

          dispatch({
            type: "updateIssues",
            payload: {
              selectedCoreTrans: [...newSelectedTrans],
            },
          });
        }
        break;

      default:
        throw new Error("Unknow action");
    }
  };

  const handleCheckParty = (action, trans) => {
    const exists = selectedPartyTrans.some((ele) => ele.id === trans.id);
    if (exists && action === "add") return;

    switch (action) {
      case "add":
        dispatch({
          type: "updateIssues",
          payload: {
            selectedPartyTrans: [...selectedPartyTrans, trans],
          },
        });
        break;
      case "remove":
        {
          const newSelectedTrans = selectedPartyTrans.filter(
            (ele) => ele.id !== trans.id
          );

          dispatch({
            type: "updateIssues",
            payload: {
              selectedPartyTrans: [...newSelectedTrans],
            },
          });
        }
        break;

      default:
        throw new Error("Unknow action");
    }
  };

  const sourcePack = (source) => {
    switch (source) {
      case "core":
        return {
          label: "From core banking.",
          selectedTrans: selectedCoreTrans,
          handleCheck: handleCheckCore,
        };

      case "party":
        return {
          selectedTrans: selectedPartyTrans,
          handleCheck: handleCheckParty,
        };
    }
  };

  const { selectedTrans, handleCheck } = sourcePack(sourceType);

  return (
    <div className="tables__wrapper">
      <div className="filters__wrapper">
        <div className="filters__contain .wrapper">
          <FieldContainer>
            <DataField
              classes="field__row field__bg-fff"
              label="Start date"
              handleValue={() => {
                console.log("start date");
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <DataField
              classes="field__row field__bg-fff"
              label="End date"
              handleValue={() => {
                console.log("end date");
              }}
            />
          </FieldContainer>
        </div>

        <div className="filters__contain .wrapper">
          <FieldContainer>
            <TextField
              classes="field__row field__bg-fff"
              label="By Ref"
              placeholder="eg: placeholder..."
              handleValue={() => {
                console.log("start date");
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <TextField
              classes="field__row field__bg-fff"
              label="By Desc"
              placeholder="eg: placeholder..."
              handleValue={() => {
                console.log("end date");
              }}
            />
          </FieldContainer>
        </div>
      </div>

      <Table
        label={tableLabel}
        titles={["Check", "Date", "Reference", "Details", "Amount"]}
        isRefreshing={isLoading}
        showCollapse={true}
        pagination={{ pageCount: data?.pages, page, setPage }}
        rowCount={Object.entries(data?.trans).length}
      >
        {data?.trans.map((trans, index) => (
          <TableRow
            key={index}
            trans={trans}
            registerCheck={handleCheck}
            selectedTrans={selectedTrans}
          />
        ))}
      </Table>
    </div>
  );
}

function TableRow({ trans, registerCheck, selectedTrans }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => setIsChecked((state) => !state);

  // When id changes.
  useEffect(() => {
    const exists = selectedTrans.some((ele) => ele.id === trans.id);

    if (exists) setIsChecked(true);
    else setIsChecked(false);
  }, [trans.id, selectedTrans]);

  // When checkbox state changes.
  useEffect(() => {
    isChecked
      ? registerCheck("add", { id: trans.id, amount: trans.details.amount })
      : registerCheck("remove", { id: trans.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <tr className={`${isChecked ? "checked" : ""}`}>
      <td>
        <CheckBox isChecked={isChecked} onCheck={handleCheck} />
      </td>
      <td>{trans.details.postDate}</td>
      <td>{trans.refId}</td>
      <td>{trans.details.details}</td>
      <td>{trans.details.amount}</td>
    </tr>
  );
}

function CheckBox({ isChecked, onCheck }) {
  return isChecked ? (
    <span
      className="checkbox clickable"
      onClick={() => onCheck((state) => !state)}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2.88889 0C1.2934 0 0 1.2934 0 2.88889V13.1111C0 14.7066 1.2934 16 2.88889 16H13.1111C14.7066 16 16 14.7066 16 13.1111V2.88889C16 1.2934 14.7066 0 13.1111 0H2.88889ZM12.6933 5.58279L6.69004 11.5792C6.4296 11.8393 6.00772 11.8391 5.74748 11.5788L3.30679 9.13804C3.04645 8.87769 3.04646 8.45556 3.30683 8.1952C3.56718 7.93493 3.98929 7.93493 4.24964 8.19529L6.21918 10.165L11.7511 4.63943C12.0116 4.37924 12.4337 4.37948 12.6939 4.63998C12.9541 4.90048 12.9539 5.32259 12.6933 5.58279Z"
          fill="#121212"
        />
      </svg>
    </span>
  ) : (
    <span
      className="checkbox clickable"
      onClick={() => onCheck((state) => !state)}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M0 2.88889C0 1.2934 1.2934 0 2.88889 0H13.1111C14.7066 0 16 1.2934 16 2.88889V13.1111C16 14.7066 14.7066 16 13.1111 16H2.88889C1.2934 16 0 14.7066 0 13.1111V2.88889ZM2.88889 1.77778C2.27524 1.77778 1.77778 2.27524 1.77778 2.88889V13.1111C1.77778 13.7248 2.27524 14.2222 2.88889 14.2222H13.1111C13.7248 14.2222 14.2222 13.7248 14.2222 13.1111V2.88889C14.2222 2.27524 13.7248 1.77778 13.1111 1.77778H2.88889Z"
          fill="#898989"
        />
      </svg>
    </span>
  );
}
