import { useContext } from "react";
import { Loader } from "./Loader";
import { AppContext } from "../context/AppContext";

function SysToast() {
  const { state } = useContext(AppContext);
  const showSysToast = state.showSysToast;

  return showSysToast ? (
    <div className="sys-toast">
      <Toast message="Importing trans from core." timeTaken="2 mins" />
      <Toast message="Reconciling trans from party." timeTaken="2 mins" />
    </div>
  ) : (
    <></>
  );
}

function Toast({ message, timeTaken }) {
  return (
    <div className="sys-toast__toast">
      <span className="sys-toast__toast__status">
        <Loader />
        <p className="ft-p-regular clr--gray">in progress</p>
      </span>
      <Dot />
      <p className="ft-p-regular">{message}</p>
      <Dot />
      <p className="ft-p-regular clr--gray">{timeTaken}</p>
    </div>
  );
}

function Dot() {
  return (
    <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
      <path
        d="M0 2C0 0.89543 0.89543 0 2 0C3.10455 0 4 0.89543 4 2C4 3.10455 3.10455 4 2 4C0.89543 4 0 3.10455 0 2Z"
        fill="#121212"
      />
    </svg>
  );
}

export default SysToast;
