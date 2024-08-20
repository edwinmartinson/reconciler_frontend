// import { Link, useLocation } from "react-router-dom";

import "./Header.scss";
import { SelectField } from "../Fields/Fields";

export default function Header() {
  // const location = useLocation();
  // const currentPath = location.pathname;

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Title>
            <SelectField />
          </Title>
          <NavLinks />
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

function NavLinks() {
  return (
    <div className="navlinks">
      <NavLinksBtn status={"active"} label={"Home"} />
      <NavLinksBtn status={"inactive"} label={"Processed"} />
      <NavLinksBtn status={"inactive"} label={"Config"} />
      <NavLinksBtn status={"inactive"} label={"Logs"} />
    </div>
  );
}

function NavLinksBtn({ status, label }) {
  return (
    <div className={`navlinks__link ${status}`}>
      <p className="ft-p-regular">{label}</p>
    </div>
  );
}
