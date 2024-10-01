import { createContext, useReducer } from "react";

const initialState = {
  changeTime: 0,
  showAccountModal: false,
  showIntegrationModal: false,
  accountAction: "add",
  addAccount: {
    ledgerId: "",
    alias: "",
  },
  editAccount: {
    acctId: "",
    ledgerId: "",
    alias: "",
  },
  selectedIntegration: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateShowAccountModal": {
      return {
        ...state,
        showAccountModal: action.payload,
      };
    }

    case "updateAccountAction": {
      return {
        ...state,
        accountAction: action.payload,
      };
    }

    case "updateEditAccount": {
      return {
        ...state,
        editAccount: {
          acctId: action.payload.acctId || "",
          ledgerId: action.payload.ledgerId || "",
          alias: action.payload.alias || "",
        },
      };
    }

    case "updateEditAccountField": {
      return {
        ...state,
        editAccount: {
          ...state.editAccount,
          ...action.payload,
        },
      };
    }

    case "updateAddAccount": {
      return {
        ...state,
        addAccount: {
          acctId: action.payload.acctId || "",
          ledgerId: action.payload.ledgerId || "",
          alias: action.payload.alias || "",
        },
      };
    }

    case "updateAddAccountField": {
      return {
        ...state,
        addAccount: {
          ...state.addAccount,
          ...action.payload,
        },
      };
    }

    case "updateChangeTime": {
      return {
        ...state,
        changeTime: action.payload,
      };
    }

    case "updateShowIntegrationModal": {
      return {
        ...state,
        showIntegrationModal: !state.showIntegrationModal,
      };
    }

    case "updateSelectedIntegration": {
      return {
        ...state,
        selectedIntegration: action.payload,
      };
    }

    default:
      throw new Error("Invalid action type.");
  }
};

export const ConfigContext = createContext(null);

export function ConfigContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
}
