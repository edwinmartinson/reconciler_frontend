import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import TableToggle from "../../../components/TableToggle";

export default function SelectTable({ source }) {
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
              <th className="ft-p-medium clr--gray">
                <CheckBox />
              </th>
              <th className="ft-p-medium clr--gray">Date</th>
              <th className="ft-p-medium clr--gray">Ref</th>
              <th className="ft-p-medium clr--gray">Details</th>
              <th className="ft-p-medium clr--gray">Amount</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {Array.from({ length: 200 }, (_, i) => {
              return (
                <tr key={i}>
                  <td>
                    <CheckBox />
                  </td>
                  <td>12/01/2024</td>
                  <td>REF0074908602994</td>
                  <td>RTGS-TRANS TRANSFER IFO GST</td>
                  <td>$550,000.00</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

function CheckBox({ id }) {
  const [isChecked, setIsChecked] = useState(false);
  return isChecked ? (
    <span className="checkbox" onClick={() => setIsChecked((state) => !state)}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2.88889 0C1.2934 0 0 1.2934 0 2.88889V13.1111C0 14.7066 1.2934 16 2.88889 16H13.1111C14.7066 16 16 14.7066 16 13.1111V2.88889C16 1.2934 14.7066 0 13.1111 0H2.88889ZM12.6933 5.58279L6.69004 11.5792C6.4296 11.8393 6.00772 11.8391 5.74748 11.5788L3.30679 9.13804C3.04645 8.87769 3.04646 8.45556 3.30683 8.1952C3.56718 7.93493 3.98929 7.93493 4.24964 8.19529L6.21918 10.165L11.7511 4.63943C12.0116 4.37924 12.4337 4.37948 12.6939 4.63998C12.9541 4.90048 12.9539 5.32259 12.6933 5.58279Z"
          fill="#121212"
        />
      </svg>
    </span>
  ) : (
    <span className="checkbox" onClick={() => setIsChecked((state) => !state)}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M0 2.88889C0 1.2934 1.2934 0 2.88889 0H13.1111C14.7066 0 16 1.2934 16 2.88889V13.1111C16 14.7066 14.7066 16 13.1111 16H2.88889C1.2934 16 0 14.7066 0 13.1111V2.88889ZM2.88889 1.77778C2.27524 1.77778 1.77778 2.27524 1.77778 2.88889V13.1111C1.77778 13.7248 2.27524 14.2222 2.88889 14.2222H13.1111C13.7248 14.2222 14.2222 13.7248 14.2222 13.1111V2.88889C14.2222 2.27524 13.7248 1.77778 13.1111 1.77778H2.88889Z"
          fill="#898989"
        />
      </svg>
    </span>
  );
}
