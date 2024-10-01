import { TextField } from "./Fields";
import Button from "./Button";
import Icon from "./Icon";
import { useContext } from "react";
import { ConfigContext } from "../context/ConfigContext";
import useAccounts from "../hooks/useAccounts";

export default function AccountModal() {
  const { state, dispatch } = useContext(ConfigContext);
  const { editAccount, addAccount } = useAccounts(false);
  const accountAction = state.accountAction;

  function closeAcctModal() {
    dispatch({ type: "updateShowAccountModal", payload: false });
    dispatch({ type: "updateAddAccount", payload: {} });
    dispatch({ type: "updateEditAccount", payload: {} });
  }

  function getData() {
    switch (accountAction) {
      case "edit":
        return {
          title: "Edit Account",
          info: "Update the account information by modifying the account details below.",
          ledgerId: state.editAccount.ledgerId,
          alias: state.editAccount.alias,
          primaryBtn: {
            label: "save changes",
            onClick: editAccount,
          },
          secondaryBtn: {
            label: "cancel",
            onClick: () => closeAcctModal(),
          },
          handleLedger: function (value) {
            dispatch({
              type: "updateEditAccountField",
              payload: { ledgerId: value },
            });
          },
          handleAlias: function (value) {
            dispatch({
              type: "updateEditAccountField",
              payload: { alias: value.toUpperCase() },
            });
          },
        };

      case "add":
        return {
          title: "Register Account",
          info: "Provide the details below for the account you want to register.",
          ledgerId: state.addAccount.ledgerId,
          alias: state.addAccount.alias,
          primaryBtn: {
            label: "register account",
            onClick: addAccount,
          },
          secondaryBtn: {
            label: "cancel",
            onClick: () => closeAcctModal(),
          },
          handleLedger: function (value) {
            dispatch({
              type: "updateAddAccountField",
              payload: { ledgerId: value },
            });
          },
          handleAlias: function (value) {
            dispatch({
              type: "updateAddAccountField",
              payload: { alias: value.toUpperCase() },
            });
          },
        };

      default:
        throw new Error("Invalid action");
    }
  }

  const cardData = getData(accountAction);

  return (
    <section className="overlay">
      <div className="account-modal__card">
        <div className="wrapper">
          <span className="wrapper--c">
            <ModelDialogPile type={accountAction} />
            <h6 className="ft-h6-regular">{cardData.title}</h6>
          </span>
          <Icon type="close" action={closeAcctModal} />
        </div>

        <p className="ft-p-regular clr--gray">{cardData.info}</p>

        <TextField
          classes="col width-full"
          label="Ledger ID"
          placeholder="Eg: 000000000000"
          value={cardData.ledgerId}
          handleValue={cardData.handleLedger}
        />

        <TextField
          classes="col width-full"
          label="Account Alias"
          placeholder="Eg: Example Account Alias"
          value={cardData.alias}
          handleValue={cardData.handleAlias}
        />

        <div className="account-modal__btn-container">
          <Button
            type={"filled"}
            actions={[cardData.primaryBtn.onClick, closeAcctModal]}
          >
            {cardData.primaryBtn.label}
          </Button>

          <Button type={"outlined"} actions={[cardData.secondaryBtn.onClick]}>
            {cardData.secondaryBtn.label}
          </Button>
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

    default:
      return <></>;
  }
}
