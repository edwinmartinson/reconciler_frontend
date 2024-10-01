import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import useAccounts from "../hooks/useAccounts";
import useConnect from "../hooks/useConnect";
import useAppStateSteam from "../hooks/useAppState";
import { SelectField } from "./Fields";
import { ConfigContext } from "../context/ConfigContext";

export default function Header() {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: configState } = useContext(ConfigContext);
  const { accts, fetchAccts } = useAccounts(true);
  const acctId = appState.ledgerId;

  useConnect();
  useAppStateSteam();

  const handleChange = (value) => {
    appDispatch({
      type: "updateLedgerId",
      payload: value,
    });
  };

  useEffect(() => {
    fetchAccts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configState.changeTime]);

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Title>
            <SelectField
              classes="field__row width-300 field__bg-fff"
              handleValue={handleChange}
              defaultValue={acctId}
            >
              <option value="000000000000">
                000000000000 - select an account
              </option>
              {accts?.map((acct, index) => (
                <option key={index} value={acct.ledgerId}>
                  {`${acct.ledgerId} - ${acct.alias} - ${acct.currencyCode}`}
                </option>
              ))}
            </SelectField>
          </Title>

          <div className="wrapper">
            <ConnectionStatus />

            <div className="navlinks">
              <NavLink label={"Dashboard"} path={"/dashboard"} />
              <NavLink label={"Pending"} path={"/pending"} />
              <NavLink label={"Outstanding"} path={"/outstanding"} />
              <NavLink label={"Reconciled"} path={"/reconciled"} />
              <NavLink label={"Config"} path={"/config"} />
              {/* <NavLink label={"Report"} path={"/report"} /> */}
            </div>
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

function OldSelectField({ accts }) {
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

function ConnectionStatus() {
  const { state } = useContext(AppContext);
  const [isConnected, setIsConnected] = useState(true);

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    setIsConnected(state.isConnected);
  }, [state.isConnected]);

  return isConnected ? (
    <IndicatorPile status={isConnected ? "connected" : "disconnected"} />
  ) : (
    <div className="connection-status">
      <span onClick={handleReload}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#121212" />
          <path
            d="M12 7C14.7614 7 17 9.23857 17 12C17 14.7614 14.7614 17 12 17C9.23857 17 7 14.7614 7 12C7 11.7491 7.01848 11.5025 7.05415 11.2615C7.09897 10.9588 6.87739 10.6667 6.57139 10.6667C6.32415 10.6667 6.10733 10.8375 6.06981 11.0819C6.02384 11.3812 6 11.6878 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C10.4633 6 9.06151 6.57771 8 7.52779V6.83333C8 6.55719 7.77614 6.33333 7.5 6.33333C7.22386 6.33333 7 6.55719 7 6.83333V8.83333C7 9.10947 7.22386 9.33333 7.5 9.33333H9.5C9.77614 9.33333 10 9.10947 10 8.83333C10 8.55719 9.77614 8.33333 9.5 8.33333H8.60062C9.49271 7.50589 10.6873 7 12 7Z"
            fill="white"
          />
        </svg>
      </span>
      <IndicatorPile status={isConnected ? "connected" : "disconnected"} />
    </div>
  );
}

function IndicatorPile({ status }) {
  switch (status) {
    case "disconnected":
      return (
        <div className="connection-status__pile offline">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0C6.2091 0 8 1.79086 8 4C8 6.2091 6.2091 8 4 8C1.79086 8 0 6.2091 0 4Z"
              fill="#898989"
            />
          </svg>
          <p>Disconnected</p>
        </div>
      );

    case "connected":
      return (
        <div className="connection-status__pile online">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0C6.2091 0 8 1.79086 8 4C8 6.2091 6.2091 8 4 8C1.79086 8 0 6.2091 0 4Z"
              fill="#1ED760"
            />
          </svg>
          <p>Connected</p>
        </div>
      );

    default:
      throw new Error("Invalid status");
  }
}
