import { ConfigContext } from "../context/ConfigContext";
import { useContext } from "react";
import Button from "./Button";
import Icon from "./Icon";

export default function IntegrationModal() {
  const { dispatch } = useContext(ConfigContext);

  function onCloseModal() {
    dispatch({ type: "updateShowIntegrationModal" });
    dispatch({ type: "updateSelectedIntegration", payload: {} });
  }

  return (
    <section className="overlay left">
      <div className="integration-modal">
        <div className="wrapper">
          <span className="wrapper--c">
            <ModelDialogPile type={"api"} />
            <h6 className="ft-h6-regular">Config (SWIFT LSD DIR MT940)</h6>
          </span>
          <Icon type="close" action={onCloseModal} />
        </div>

        <div className="integration-modal__container">
          <div className="integration-modal__group">
            <p className="ft-p-medium clr--gray">Directory path</p>
            <p className="ft-p-regular">
              /public_dir/recon_sys_store/ThirdParty/MT940
            </p>
          </div>

          <div className="integration-modal__group">
            <p className="ft-p-medium center-text">Directory path</p>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Location</p>
              <p className="ft-p-regular">Remote</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Data format</p>
              <p className="ft-p-regular">MT940</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Protocol</p>
              <p className="ft-p-regular">SFTP</p>
            </div>
          </div>

          <div className="integration-modal__group">
            <p className="ft-p-medium center-text">FTP Server</p>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Host</p>
              <p className="ft-p-regular">192.168.8.102</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Port</p>
              <p className="ft-p-regular">2121</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Username</p>
              <p className="ft-p-regular">winomartinson</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Password</p>
              <p className="ft-p-regular">##############</p>
            </div>
          </div>

          <div className="integration-modal__group">
            <p className="ft-p-medium center-text">Field mapping</p>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Account ID</p>
              <p className="ft-p-regular">acctId</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Posting date</p>
              <p className="ft-p-regular">postingDate</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Reference ID</p>
              <p className="ft-p-regular">refId</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Currency code</p>
              <p className="ft-p-regular">isoCode</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Transaction amount</p>
              <p className="ft-p-regular">amount</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Transaction type</p>
              <p className="ft-p-regular">isCredit</p>
            </div>

            <div className="integration-modal__group__list">
              <p className="ft-p-regular clr--gray">Transaction details</p>
              <p className="ft-p-regular">details</p>
            </div>
          </div>

          <div className="account-modal__btn-container">
            <Button type={"filled"} actions={() => {}}>
              Edit integration
            </Button>

            <Button type={"filled"} classes={"danger"} actions={() => {}}>
              Delete integration
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModelDialogPile({ type }) {
  switch (type) {
    case "edit":
      return (
        <div className="dialog_pile warn">
          <p className="ft-p-medium">Edit</p>
        </div>
      );

    case "add":
      return (
        <div className="dialog_pile alert">
          <p className="ft-p-medium">Create</p>
        </div>
      );

    case "view":
      return (
        <div className="dialog_pile alert">
          <p className="ft-p-medium">View</p>
        </div>
      );

    case "dir":
      return (
        <div className="dialog_pile alert">
          <p className="ft-p-medium">DIR</p>
        </div>
      );

    case "api":
      return (
        <div className="dialog_pile alert">
          <p className="ft-p-medium">API</p>
        </div>
      );

    default:
      return <></>;
  }
}
