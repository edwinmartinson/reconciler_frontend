import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

function SelectedTable({ source, transArr }) {
  const { state } = useContext(AppContext);
  const selectedCoreTrans = state.issues.selectedCoreTrans;
  const selectedPartyTrans = state.issues.selectedPartyTrans;

  const sourcePack = (source) => {
    switch (source) {
      case "core":
        return {
          selectedTrans: selectedCoreTrans,
        };

      case "party":
        return {
          selectedTrans: selectedPartyTrans,
        };
    }
  };

  const { selectedTrans: selectedTransNo } = sourcePack(source);
  const selectedTrans = transArr.filter((trans) =>
    selectedTransNo.includes(trans.id)
  );

  return (
    <div className="table__container center-head">
      <svg width="40" height="4" viewBox="0 0 40 4" fill="none">
        <path
          d="M0 2C0 0.8954 0.89544 0 2 0H38C39.1046 0 40 0.8954 40 2C40 3.1046 39.1046 4 38 4H2C0.89544 4 0 3.1046 0 2Z"
          fill="#121212"
        />
      </svg>
      <table className="table">
        <thead>
          <tr>
            <th className="ft-txt-medium clr--gray">Date</th>
            <th className="ft-txt-medium clr--gray">Reference NO</th>
            <th className="ft-txt-medium clr--gray">Details</th>
            <th className="ft-txt-medium clr--gray">Amount</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {selectedTrans.map((trans, index) => (
            <tr key={index}>
              <td>{trans.details.postDate}</td>
              <td>{trans.refId}</td>
              <td>{trans.details.details}</td>
              <td>{trans.details.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {selectedTrans.length === 0 ? (
            <tr>
              <td colSpan={4}>
                <div>
                  <p className="ft-p-regular clr--gray">No transactions</p>
                </div>
              </td>
            </tr>
          ) : (
            <></>
          )}
        </tfoot>
      </table>
    </div>
  );
}

export default SelectedTable;
