import { useContext } from "react";
import Button from "./Button";
import { AppContext } from "../context/AppContext";
import formatAmount from "../utils/format.utils";

function IssuesModal() {
  const { state, dispatch } = useContext(AppContext);

  const showIssueModal = state.issues.showModal;
  const coreTotal = state.issues.coreTotal;
  const partyTotal = state.issues.partyTotal;
  const total = parseFloat((coreTotal + partyTotal).toFixed(2));
  const sendData = state.issues.action;

  const selectedCoreCount = state.issues.selectedCoreTrans.length;
  const selectedPartyCount = state.issues.selectedPartyTrans.length;

  const handleClose = () => {
    dispatch({
      type: "updateIssues",
      payload: { showModal: false },
    });
  };

  return showIssueModal ? (
    <div className="overlay">
      <div className="issues-modal">
        <div className="wrapper">
          <h6 className="ft-h6-regular">Summary</h6>
          <span className="icon clickable" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM16.2364 7.7636L16.1354 7.67646C15.8222 7.44408 15.3924 7.44121 15.0763 7.66786L14.9636 7.7636L12 10.7268L9.0364 7.7636L8.93545 7.67646C8.62226 7.44408 8.19241 7.44121 7.87634 7.66786L7.7636 7.7636L7.67646 7.86455C7.44408 8.17774 7.44121 8.60759 7.66786 8.92366L7.7636 9.0364L10.7268 12L7.7636 14.9636L7.67646 15.0646C7.44408 15.3778 7.44121 15.8076 7.66786 16.1237L7.7636 16.2364L7.86455 16.3235C8.17774 16.5559 8.60759 16.5588 8.92366 16.3321L9.0364 16.2364L12 13.2732L14.9636 16.2364L15.0646 16.3235C15.3778 16.5559 15.8076 16.5588 16.1237 16.3321L16.2364 16.2364L16.3235 16.1354C16.5559 15.8222 16.5588 15.3924 16.3321 15.0763L16.2364 14.9636L13.2732 12L16.2364 9.0364L16.3235 8.93545C16.5559 8.62226 16.5588 8.19241 16.3321 7.87634L16.2364 7.7636Z"
                fill="#212121"
              />
            </svg>
          </span>
        </div>

        {total !== 0.0 ? (
          <div className=" issues-modal__warning">
            <p>Warning: Non-zero balance detected.</p>
          </div>
        ) : (
          <></>
        )}

        <div className="issues-modal__stats">
          <p className="ft-p-regular ">From core banking</p>
          <span className="issues-modal__stats__counter">
            <p className="ft-p-medium">{selectedCoreCount || 0}</p>
          </span>
        </div>

        <div className="issues-modal__stats">
          <p className="ft-p-regular ">From third parties</p>
          <span className="issues-modal__stats__counter">
            <p className="ft-p-medium">{selectedPartyCount || 0}</p>
          </span>
        </div>

        <div className="issues-modal__summary">
          <div className="issues-modal__summary__group">
            <p className="ft-p-regular clr--gray">Total core amount.</p>
            <p className="ft-p-regular">{formatAmount(coreTotal || 0.0)}</p>
          </div>

          <hr />

          <div className="issues-modal__summary__group">
            <p className="ft-p-regular clr--gray">Total party amount.</p>
            <p className="ft-p-regular">{formatAmount(partyTotal || 0.0)}</p>
          </div>

          <hr />

          <div className="issues-modal__summary__group">
            <p className="ft-p-regular clr--gray">Difference (core & party)</p>
            <p className="ft-p-regular">{formatAmount(total || 0.0)}</p>
          </div>
        </div>

        <div className="issues-modal__btn-container">
          <Button type={"filled"} actions={[sendData, handleClose]}>
            reconcile
          </Button>

          <Button type={"outlined"} actions={[handleClose]}>
            cancel
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default IssuesModal;
