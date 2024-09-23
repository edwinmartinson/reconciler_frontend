import ActionDialog from "./ActionDialog";
import Header from "./Header";
import { Loading } from "./Loader";
import SmallScreen from "./SmallScreen";
import useViewport from "../hooks/useViewport";
import IssuesModal from "./IssuesModal";
import SysToast from "./SysToast";
import useActions from "../hooks/useActions";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import useKeyBinding from "../hooks/useKeyBinding";

function AppWrapper({ hideHeader, children }) {
  const { dispatch } = useContext(AppContext);
  const [width] = useViewport();
  const {
    error: importError,
    hasResponded: importHasResponded,
    message: importMessage,
    doAction: importDoAction,
  } = useActions("import");
  const {
    error: reconError,
    hasResponded: reconHasResponded,
    message: reconMessage,
    doAction: reconDoAction,
  } = useActions("recon");

  const onImport = () => {
    return dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: "default",
        hideAction: false,
        title: "Instantly import transactions?",
        description:
          "Confirm this action to instantly import transactions from core source and third parties.",
        action: importDoAction,
      },
    });
  };

  const onImportRes = () => {
    return dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: importError === true ? "error" : "success",
        hideAction: true,
        title:
          importError === true
            ? "Instant import failed."
            : "Instant import initiated",
        description: importMessage,
        action: importDoAction,
      },
    });
  };

  const onRecon = () => {
    dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: "default",
        hideAction: false,
        title: "Instantly reconcile transactions?",
        description:
          "Confirm this action to instantly reconcile imported transactions.",
        action: reconDoAction,
      },
    });
  };

  function onReconRes() {
    return dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: reconError === true ? "error" : "success",
        hideAction: true,
        title:
          reconError === true
            ? "Instant recon failed."
            : "Instant recon initiated",
        description: reconMessage,
        action: reconDoAction,
      },
    });
  }

  useEffect(() => {
    if (importHasResponded === true) onImportRes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importHasResponded]);

  useEffect(() => {
    if (reconHasResponded === true) onReconRes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reconHasResponded]);

  useKeyBinding("ctrl", "keyi", onImport);
  useKeyBinding("ctrl", "keyr", onRecon);

  return (
    <>
      <Loading />
      <ActionDialog />
      <IssuesModal />
      <SysToast />
      {hideHeader || width <= 980 ? <></> : <Header />}
      {width <= 980 ? <SmallScreen /> : children}
    </>
  );
}

export default AppWrapper;
