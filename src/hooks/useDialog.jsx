import { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Opens a dialog.
 * @param {object} config - The configuration object for the dialog.
 * @param {string} alertType - The type of alert to display.
 * @param {function} action - The action to perform when the dialog is closed.
 * @returns {function} closeDialog - A function to close the dialog.
 */
function useDialog() {
  const { dispatch } = useContext(AppContext);

  const defaultAction = () => {
    console.log("This is working");
  };

  function openDialog(
    config = {},
    alertType = "default",
    action = defaultAction
  ) {
    return dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        alertType,
        leftBtn: {
          show: config?.leftBtn?.show,
          type: config?.leftBtn?.type || "filled",
          label: config?.leftBtn?.label || "Cancel",
        },
        rightBtn: {
          show: config?.rightBtn?.show,
          type: config?.rightBtn?.type || "outlined",
          label: config?.rightBtn?.label || "Confirm",
        },
        showClose: config?.showClose,
        title: config?.title,
        description: config?.description,
        action,
      },
    });
  }

  function closeDialog() {
    return dispatch({
      type: "updateDialog",
      payload: {
        show: false,
        alertType: "default",
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
        title: "This is the title.",
        description: "This is the description of the action dialog",
        action: function () {
          console.log("This is working");
        },
      },
    });
  }

  return { openDialog, closeDialog };
}

export default useDialog;
