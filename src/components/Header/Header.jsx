import "./Header.scss";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import useAccounts from "../../hooks/useAccounts";
import useAppStateSteam from "../../hooks/useAppStateStream";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { accts } = useAccounts();
  // eslint-disable-next-line no-unused-vars
  const [error] = useAppStateSteam();

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Title>
            <SelectField accts={accts} />
          </Title>

          <div className="navlinks">
            <NavLink label={"Home"} path={"/home"} />
            <NavLink label={"Issues"} path={"/issues"} />
            <NavLink label={"Config"} path={"/config"} />
            <NavLink label={"Logs"} path={"/logs"} />
          </div>
        </nav>
      </header>
      <header className="header--clone"></header>
    </>
  );
}

function Title({ children }) {
  return (
    <div className="title">
      <h1 className="ft-h3-medium">
        <span className="clr--accent">USG</span> Reconciler
      </h1>

      {children}
    </div>
  );
}

function NavLink({ label, path }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const status = currentPath === path ? "active" : "inactive";

  return (
    <Link to={path}>
      <div className={`navlinks__link ${status}`}>
        <p className="ft-p-regular">{label}</p>
      </div>
    </Link>
  );
}

function SelectField({ accts }) {
  const { state, dispatch } = useContext(AppContext);
  const acctId = state.ledgerId;

  const handleChange = (e) => {
    dispatch({
      type: "updateLedgerId",
      payload: e.target.value,
    });
  };

  return (
    <select
      className="field select--no-label"
      value={acctId}
      onChange={handleChange}
    >
      <option value="000000000000">000000000000 - select an account</option>
      {accts?.map((acct, index) => (
        <option key={index} value={acct.ledgerId}>
          {`${acct.ledgerId} - ${acct.alias} - ${acct.currencyCode}`}
        </option>
      ))}
    </select>
  );
}
