import { useEffect, useState } from "react";
import { useTrans, useTransStream } from "../../hooks/useTrans";
import Pagination from "../../components/Pagination/Pagination";
import TableToggle from "../../components/TableToggle/TableToggle";

export default function TransTable({ source }) {
  const { trans, getTrans } = useTrans("pending", 200);
  const { changeTime } = useTransStream("pending");
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState(1);

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
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}
