import { useEffect, useState } from "react";
import { useTrans, useTransStream } from "../../../hooks/useTrans";
import Pagination from "../../../components/Pagination";
import TableToggle from "../../../components/TableToggle";

export default function TransTable({ source }) {
  const { trans, getTrans } = useTrans("source", 200);
  const { changeTime } = useTransStream("source");
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState(1);

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

  const colorClass = (amount) => {
    const theAmount = Number.parseFloat(amount);
    return theAmount > 0 ? "clr--green" : "clr--red";
  };

  const handleClick = (e) => {
    const target = e.target;
    if (target.classList.contains("table__wrapper")) {
      setIsOpen((state) => !state);
    }
  };

  useEffect(() => {
    getTrans();
    console.log(`Change, Detected. ${new Date().toLocaleTimeString()}`);

    // eslint-disable-next-line
  }, [changeTime]);

  const label =
    source === "core" ? "From core banking." : "From third parties.";
  return (
    <div className="table__container">
      <div className="table__wrapper" onClick={handleClick}>
        <p className="ft-p-regular">{label}</p>
        <div className="flex-row-8">
          <Pagination
            numPages={4}
            activePage={activePage}
            onPage={setActivePage}
          />
          <TableToggle isOpen={isOpen} onOpen={setIsOpen} />
        </div>
      </div>

      {isOpen ? (
        <table className="table">
          <thead>
            <tr>
              <th className="ft-p-medium clr--gray">Ref</th>
              <th className="ft-p-medium clr--gray">Details</th>
              <th className="ft-p-medium clr--gray">ISO</th>
              <th className="ft-p-medium clr--gray">Amount</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {source === "core"
              ? trans?.fromCore.map((trans, index) => (
                  <tr key={index}>
                    <td>{trans.refId}</td>
                    <td>{trans.details}</td>
                    <td>{trans.currencyCode}</td>
                    <td className={`${colorClass(trans.amount)}`}>
                      {trans.amount}
                    </td>
                  </tr>
                ))
              : trans?.fromParty.map((trans, index) => (
                  <tr key={index}>
                    <td>{trans.refId}</td>
                    <td>{trans.details}</td>
                    <td>{trans.currencyCode}</td>
                    <td className={`${colorClass(trans.amount)}`}>
                      {trans.amount}
                    </td>
                  </tr>
                ))}
          </tbody>
          <tfoot>
            {isEmpty(source) ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}
