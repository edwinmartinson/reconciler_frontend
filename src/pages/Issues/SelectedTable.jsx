function SelectedTable() {
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
            <th className="ft-p-medium clr--gray">Date</th>
            <th className="ft-p-medium clr--gray">Reference NO</th>
            <th className="ft-p-medium clr--gray">Details</th>
            <th className="ft-p-medium clr--gray">Amount</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr>
            <td>12/01/2024</td>
            <td>SLCSLR1800015297</td>
            <td>RTGS-TRANS FUNDS TRANSFER</td>
            <td>-4531791.20</td>
          </tr>
          <tr>
            <td>12/01/2024</td>
            <td>SLCSLR1800015297</td>
            <td>RTGS-TRANS FUNDS TRANSFER</td>
            <td>-4531791.20</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SelectedTable;
