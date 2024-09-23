import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function Loading({ classes }) {
  const { state } = useContext(AppContext);
  const showAppLoader = state.showAppLoader;

  return showAppLoader ? (
    <div className="loader__background">
      <Loader classes={classes} />
    </div>
  ) : (
    <></>
  );
}

export function SubLoading({ classes }) {
  return (
    <div className={`loader__component ${classes}`}>
      <Loader classes={"medium"} />
    </div>
  );
}

export function Loader({ classes = "" }) {
  return <div className={`loader ` + classes}></div>;
}
