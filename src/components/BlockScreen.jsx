import { useContext, useEffect } from "react";
import { Loader } from "./Loader";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

function BlockScreen() {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const currentPath = location.pathname;

  // Handles dialog actions when system is busy.
  useEffect(() => {
    if (
      state.isAutoReconActive === true ||
      state.isReconActive === true ||
      state.isCoreImportActive === true ||
      state.isPartyImportActive === true
    ) {
      if (currentPath !== "/") {
        dispatch({ type: "updateShowBlockScreen", payload: true });
      } else dispatch({ type: "updateShowBlockScreen", payload: false });
    } else dispatch({ type: "updateShowBlockScreen", payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.isAutoReconActive,
    state.isReconActive,
    state.isCoreImportActive,
    state.isPartyImportActive,
    currentPath,
  ]);

  return (
    <div className="dialog__background">
      <div className="dialog">
        {/* Head */}
        <div className="dialog__wrapper--b">
          <h6 className="ft-h6-medium">System is busy !</h6>
          <div className="dialog_pile alert">
            <p className="ft-p-medium">Alert</p>
          </div>
        </div>

        {/* Description */}
        <p>
          Please wait. The system is currently busy importing or reconciling
          transactions. Functionality will resume once the process is complete.
        </p>

        {/* FooterF */}
        <div className="dialog__wrapper--d">
          <Loader classes="small-l" />
          <p className="clr--gray">Work in progress</p>
        </div>
      </div>
    </div>
  );
}

export default BlockScreen;
