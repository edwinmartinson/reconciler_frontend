export default function TableMin({ label }) {
  return (
    <div className="table__container">
      <div className="table__wrapper">
        <p className="ft-p-medium">{label}</p>
        <p className="ft-p-medium clr--gray">Showing recent 200</p>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="ft-p-medium clr--gray">Account</th>
            <th className="ft-p-medium clr--gray">Details</th>
            <th className="ft-p-medium clr--gray">Currency code</th>
            <th className="ft-p-medium clr--gray">Amount</th>
          </tr>
        </thead>
        <tbody className="table-body"></tbody>
      </table>
    </div>
  );
}
