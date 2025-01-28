import ActionDialog from "./ActionDialog";
import Header from "./Header";
import { Loading } from "./Loader";
import SmallScreen from "./SmallScreen";
import useViewport from "../hooks/useViewport";
import IssuesModal from "./IssuesModal";
import useActions from "../hooks/useActions";
import { useContext, useEffect } from "react";
import useKeyBinding from "../hooks/useKeyBinding";
import useDialog from "../hooks/useDialog";
import { useLocation } from "react-router-dom";
import BlockScreen from "./BlockScreen";
import AccountModal from "./AccountModal";
import { ConfigContext } from "../context/ConfigContext";
import IntegrationModal from "./IntegrationModal";
import { AppContext } from "../context/AppContext";
// import useModalEngine from "../hooks/useModalEngine";

function AppWrapper({ hideHeader, children }) {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const { state: configState } = useContext(ConfigContext);
  const { config, openDialog } = useDialog();
  const [width] = useViewport();
  const location = useLocation();

  const currentPath = location.pathname;
  const showDialog = appState.dialog.show;
  const showAppLoader = appState.showAppLoader;
  const showIssueModal = appState.issues.showModal;
  const showBlockScreen = appState.showBlockScreen;

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

  // Initiates actions.
  const onImport = () => {
    const extendConfig = {
      ...config,
      title: "Instantly import transactions?",
      description:
        "Confirm this action to instantly import transactions from core source and third parties.",
    };
    openDialog(extendConfig, "alert", importDoAction);
  };

  const onRecon = () => {
    const extendConfig = {
      ...config,
      title: "Instantly reconcile transactions?",
      description:
        "Confirm this action to instantly reconcile imported transactions.",
    };
    openDialog(extendConfig, "alert", reconDoAction);
  };

  const onAuto = () => {
    const extendConfig = {
      ...config,
      title: "Start auto reconciliation?",
      description:
        "Confirm this action to instantly import and reconcile transactions.",
    };
    openDialog(extendConfig, "alert", autoDoAction);
  };

  // Handles action responses.
  const onImportRes = () => {
    const extendConfig = {
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

    openDialog(
      extendConfig,
      importError === true ? "error" : "success",
      importDoAction
    );
  };

  function onReconRes() {
    const extendConfig = {
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
        reconError === true
          ? "Instant recon failed."
          : "Instant recon initiated",
      description: reconMessage,
    };

    openDialog(
      extendConfig,
      reconError === true ? "error" : "success",
      reconDoAction
    );
  }

  function onAutoRes() {
    const extendConfig = {
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

    openDialog(
      extendConfig,
      autoError === true ? "error" : "success",
      autoDoAction
    );
  }

  // Use effects to handle dialog actions.
  useEffect(() => {
    if (importHasResponded === true) onImportRes();
    if (reconHasResponded === true) onReconRes();
    if (autoHasResponded === true) onAutoRes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importHasResponded, reconHasResponded, autoHasResponded]);

  // Handles dialog actions when system is busy.
  useEffect(() => {
    if (
      appState.isAutoReconActive === true ||
      appState.isReconActive === true ||
      appState.isCoreImportActive === true ||
      appState.isPartyImportActive === true
    ) {
      if (currentPath !== "/") {
        appDispatch({ type: "updateShowBlockScreen", payload: true });
      } else appDispatch({ type: "updateShowBlockScreen", payload: false });
    } else appDispatch({ type: "updateShowBlockScreen", payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    appState.isAutoReconActive,
    appState.isReconActive,
    appState.isCoreImportActive,
    appState.isPartyImportActive,
    currentPath,
  ]);

  // Key bindings
  const disable = currentPath === "/" || currentPath === "/dashboard";
  useKeyBinding("ctrl", "keyi", disable ? () => {} : onImport);
  useKeyBinding("ctrl", "keyr", disable ? () => {} : onRecon);
  useKeyBinding("ctrl", "keya", disable ? () => {} : onAuto);

  // Modal engine
  // useModalEngine();

  return (
    <>
      {showDialog ? <ActionDialog /> : <></>}
      {showBlockScreen ? <BlockScreen /> : <></>}
      {showAppLoader ? <Loading /> : <></>}
      {configState.showIntegrationModal ? <IntegrationModal /> : <></>}
      {configState.showAccountModal ? <AccountModal /> : <></>}
      {showIssueModal ? <IssuesModal /> : <></>}
      {hideHeader || width <= 980 ? <></> : <Header />}
      {width <= 980 ? <SmallScreen /> : children}
    </>
  );
}

export default AppWrapper;
