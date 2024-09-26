import ActionDialog from "./ActionDialog";
import Header from "./Header";
import { Loading } from "./Loader";
import SmallScreen from "./SmallScreen";
import useViewport from "../hooks/useViewport";
import IssuesModal from "./IssuesModal";
import SysToast from "./SysToast";
import useActions from "../hooks/useActions";
import { useEffect } from "react";
import useKeyBinding from "../hooks/useKeyBinding";
import useDialog from "../hooks/useDialog";
import { useLocation } from "react-router-dom";
import BlockScreen from "./BlockScreen";

const config = {
  leftBtn: {
    show: true,
    type: "filled",
    label: "Cancel",
  },
  rightBtn: {
    show: true,
    type: "outlined",
    label: "Confirm",
  },
  showClose: true,
};

function AppWrapper({ hideHeader, children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { openDialog } = useDialog();
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

  const {
    error: autoError,
    hasResponded: autoHasResponded,
    message: autoMessage,
    doAction: autoDoAction,
  } = useActions("auto");

  const importConfig = {
    ...config,
    title: "Instantly import transactions?",
    description:
      "Confirm this action to instantly import transactions from core source and third parties.",
  };

  const reconConfig = {
    ...config,
    title: "Instantly reconcile transactions?",
    description:
      "Confirm this action to instantly reconcile imported transactions.",
  };

  const autoConfig = {
    ...config,
    title: "Start auto reconciliation?",
    description:
      "Confirm this action to instantly import and reconcile transactions.",
  };

  const importConfigRes = {
    ...config,
    rightBtn: {
      ...config.rightBtn,
      show: false,
    },
    leftBtn: {
      ...config.leftBtn,
      label: "close",
    },
    title:
      importError === true
        ? "Instant import failed."
        : "Instant import initiated",
    description: importMessage,
  };

  const reconConfigRes = {
    ...config,
    rightBtn: {
      ...config.rightBtn,
      show: false,
    },
    leftBtn: {
      ...config.leftBtn,
      label: "close",
    },
    title:
      reconError === true ? "Instant recon failed." : "Instant recon initiated",
    description: reconMessage,
  };

  const autoConfigRes = {
    ...config,
    rightBtn: {
      ...config.rightBtn,
      show: false,
    },
    leftBtn: {
      ...config.leftBtn,
      label: "close",
    },
    title:
      autoError === true
        ? "Auto reconciliation failed."
        : "Auto reconciliation initiated",
    description: autoMessage,
  };

  // Initiates actions.
  const onImport = () => {
    openDialog(importConfig, "alert", importDoAction);
  };

  const onRecon = () => {
    openDialog(reconConfig, "alert", reconDoAction);
  };

  const onAuto = () => {
    openDialog(autoConfig, "alert", autoDoAction);
  };

  // Handles action responses.
  const onImportRes = () => {
    openDialog(
      importConfigRes,
      importError === true ? "error" : "success",
      importDoAction
    );
  };

  function onReconRes() {
    openDialog(
      reconConfigRes,
      reconError === true ? "error" : "success",
      reconDoAction
    );
  }

  function onAutoRes() {
    openDialog(
      autoConfigRes,
      autoError === true ? "error" : "success",
      autoDoAction
    );
  }

  // Use effects to handle dialog actions.
  useEffect(() => {
    if (importHasResponded === true) onImportRes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importHasResponded]);

  useEffect(() => {
    if (reconHasResponded === true) onReconRes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reconHasResponded]);

  useEffect(() => {
    if (autoHasResponded === true) onAutoRes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoHasResponded]);

  // Key bindings
  const disable = currentPath === "/" || currentPath === "/dashboard";
  useKeyBinding("ctrl", "keyi", disable ? () => {} : onImport);
  useKeyBinding("ctrl", "keyr", disable ? () => {} : onRecon);
  useKeyBinding("ctrl", "keya", disable ? () => {} : onAuto);

  return (
    <>
      <BlockScreen />
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
