import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./Home.scss";
import TableMin from "./TableMin";
import Widgets from "./Widgets";

export default function Home() {
  const { state } = useContext(AppContext);
  const acctId = state.get("acctId");

  return acctId !== 0 ? (
    <main className="main">
      <Widgets />
      <div className="wrapper">
        <TableMin label={"From core banking"} />
        <TableMin label={"From third parties"} />
      </div>
    </main>
  ) : (
    <main className="main center">
      <DisplayMessage />
    </main>
  );
}

function DisplayMessage() {
  return (
    <div className="display_message">
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <rect width="160" height="160" rx="80" fill="white" />
        <rect
          x="0.5"
          y="0.5"
          width="159"
          height="159"
          rx="79.5"
          stroke="#C0C0C0"
        />
        <path
          d="M103.016 87.9947C107.985 87.9947 112.013 92.0227 112.013 96.992V99.294C112.013 102.872 110.735 106.332 108.408 109.05C102.13 116.385 92.579 120.005 79.9956 120.005C67.4097 120.005 57.864 116.384 51.5977 109.045C49.2782 106.329 48.0039 102.875 48.0039 99.3028V96.992C48.0039 92.0227 52.032 87.9947 57.001 87.9947H103.016ZM103.016 93.9958H57.001C55.3463 93.9958 54.005 95.3373 54.005 96.992V99.3028C54.005 101.446 54.7696 103.519 56.1612 105.148C61.1753 111.02 69.0403 114.004 79.9956 114.004C90.9507 114.004 98.8226 111.02 103.849 105.147C105.245 103.516 106.012 101.44 106.012 99.294V96.992C106.012 95.3373 104.671 93.9958 103.016 93.9958ZM79.9956 40.0049C91.0432 40.0049 99.9992 48.9608 99.9992 60.0085C99.9992 71.0562 91.0432 80.0121 79.9956 80.0121C68.9478 80.0121 59.9919 71.0562 59.9919 60.0085C59.9919 48.9608 68.9478 40.0049 79.9956 40.0049ZM79.9956 46.006C72.2622 46.006 65.9929 52.2751 65.9929 60.0085C65.9929 67.7418 72.2622 74.011 79.9956 74.011C87.729 74.011 93.9981 67.7418 93.9981 60.0085C93.9981 52.2751 87.729 46.006 79.9956 46.006Z"
          fill="#898989"
        />
      </svg>

      <div className="wrapper">
        <h1 className="ft-h1-regular">Select a specific account.</h1>
        <p className="clr--gray">
          Select an account to to display transactions performed, recon specific
          statistics, quick actions and many other features related to interbank
          reconciliation.
        </p>
      </div>
    </div>
  );
}
