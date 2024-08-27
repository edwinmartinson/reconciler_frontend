import { useContext } from "react";
import "./Loader.scss";
import { AppContext } from "../../context/AppContext";

function Loader() {
  const { state } = useContext(AppContext);
  const showAppLoader = state.showAppLoader;

  return showAppLoader ? (
    <div className="loader__background">
      <div className="loader"></div>
    </div>
  ) : (
    <></>
  );
}

export default Loader;
