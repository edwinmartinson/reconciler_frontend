import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./Fields.scss";

export function SelectField() {
  const { state, dispatch } = useContext(AppContext);
  const acctId = state.get("acctId");

  const handleChange = (e) => {
    dispatch({
      type: "updateAcctId",
      payload: Number.parseInt(e.target.value),
    });
  };

  return (
    <select
      className="field select--no-label"
      value={acctId}
      onChange={handleChange}
    >
      <option value="0">select account</option>
      <option value="1">DummyAccount</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
  );
}
