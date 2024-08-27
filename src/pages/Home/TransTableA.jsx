import { useEffect, useState } from "react";
import { useTrans, useTransStream } from "../../hooks/useTrans";
import Pagination from "../../components/Pagination/Pagination";

export default function TransTableA({ source }) {
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
        <p className="ft-h6-regular">{label}</p>
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

function TableToggle({ isOpen, onOpen }) {
  const handleClick = () => {
    onOpen((state) => !state);
  };

  return isOpen ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      onClick={handleClick}
    >
      <path
        d="M8 16C12.4182 16 16 12.4182 16 8C16 3.58172 12.4182 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4182 3.58172 16 8 16ZM4.37574 9.62424C4.14142 9.38992 4.14142 9.01008 4.37574 8.77576L7.57576 5.57574C7.81008 5.34142 8.18992 5.34142 8.42424 5.57574L11.6242 8.77576C11.8586 9.01008 11.8586 9.38992 11.6242 9.62424C11.3899 9.85856 11.0101 9.85856 10.7758 9.62424L8 6.84856L5.22426 9.62424C4.98995 9.85856 4.61005 9.85856 4.37574 9.62424Z"
        fill="#121212"
      />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      onClick={handleClick}
    >
      <path
        d="M8 0C12.4182 0 16 3.58172 16 8C16 12.4182 12.4182 16 8 16C3.58172 16 0 12.4182 0 8C0 3.58172 3.58172 0 8 0ZM4.37574 6.37574C4.14142 6.61008 4.14142 6.98992 4.37574 7.22424L7.57576 10.4242C7.81008 10.6586 8.18992 10.6586 8.42424 10.4242L11.6242 7.22424C11.8586 6.98992 11.8586 6.61008 11.6242 6.37574C11.3899 6.14142 11.0101 6.14142 10.7758 6.37574L8 9.15144L5.22426 6.37574C4.98995 6.14142 4.61005 6.14142 4.37574 6.37574Z"
        fill="#121212"
      />
    </svg>
  );
}
