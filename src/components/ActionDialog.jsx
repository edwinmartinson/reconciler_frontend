import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import Button from "./Button";
import useDialog from "../hooks/useDialog";

function ActionDialog() {
  const { state } = useContext(AppContext);
  const { closeDialog } = useDialog();

  const dialog = state.dialog;
  const leftBtn = dialog.leftBtn;
  const rightBtn = dialog.rightBtn;

  return dialog.show ? (
    <div className="dialog__background">
      <div className="dialog">
        {/* Wrapper */}
        <div className="dialog__wrapper--a">
          {/* Head */}
          <div className="dialog__wrapper--b">
            <span className="dialog__wrapper--c">
              <ActionDialogPile type={dialog.alertType} />
              <h6 className="ft-h6-regular">{dialog.title}</h6>
            </span>

            {dialog.showClose ? <CloseBtn action={closeDialog} /> : <></>}
          </div>
          {/* Description */}
          <p className="clr--gray">{dialog.description}</p>
        </div>

        <div className="dialog__buttons">
          {leftBtn.show ? (
            <Button type={leftBtn.type} actions={[closeDialog]}>
              {leftBtn.label}
            </Button>
          ) : (
            <></>
          )}

          {rightBtn.show ? (
            <Button type={rightBtn.type} actions={[dialog.action, closeDialog]}>
              {rightBtn.label}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function CloseBtn({ action }) {
  return (
    <span className="icon" onClick={action}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM13.5303 6.46967L13.4462 6.39705C13.1852 6.2034 12.827 6.20101 12.5636 6.38988L12.4697 6.46967L10 8.939L7.53033 6.46967L7.44621 6.39705C7.18522 6.2034 6.82701 6.20101 6.56362 6.38988L6.46967 6.46967L6.39705 6.55379C6.2034 6.81478 6.20101 7.17299 6.38988 7.43638L6.46967 7.53033L8.939 10L6.46967 12.4697L6.39705 12.5538C6.2034 12.8148 6.20101 13.173 6.38988 13.4364L6.46967 13.5303L6.55379 13.6029C6.81478 13.7966 7.17299 13.799 7.43638 13.6101L7.53033 13.5303L10 11.061L12.4697 13.5303L12.5538 13.6029C12.8148 13.7966 13.173 13.799 13.4364 13.6101L13.5303 13.5303L13.6029 13.4462C13.7966 13.1852 13.799 12.827 13.6101 12.5636L13.5303 12.4697L11.061 10L13.5303 7.53033L13.6029 7.44621C13.7966 7.18522 13.799 6.82701 13.6101 6.56362L13.5303 6.46967Z"
          fill="#212121"
        />
      </svg>
    </span>
  );
}

function ActionDialogPile({ type }) {
  switch (type) {
    case "error":
      return (
        <div className="dialog_pile error">
          <p className="ft-p-medium">Error</p>
        </div>
      );

    case "success":
      return (
        <div className="dialog_pile success">
          <p className="ft-p-medium">Success</p>
        </div>
      );

    case "alert":
      return (
        <div className="dialog_pile alert">
          <p className="ft-p-medium">Alert</p>
        </div>
      );

    default:
      return <></>;
  }
}

export default ActionDialog;
