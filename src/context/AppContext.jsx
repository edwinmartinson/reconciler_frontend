import { createContext, useReducer } from "react";

const initialState = {
  ledgerId: "000000000000",
  isConnected: false,
  isCoreImportActive: false,
  isPartyImportActive: false,
  isReconActive: false,
  isAutoReconActive: false,
  showAppLoader: false,
  dialog: {
    show: false,
    type: "default",
    hideAction: true,
    title: "This is the title.",
    description: "This is the description of the action dialog",
    action: function () {
      console.log("This is working");
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateLedgerId": {
      return {
        ...state,
        ledgerId: action.payload,
      };
    }

    case "updateLoader": {
      return {
        ...state,
        showAppLoader: action.payload,
      };
    }

    case "updateDialog": {
      return {
        ...state,
        dialog: action.payload,
      };
    }

    case "updateAppState": {
      return {
        ...state,
        isCoreImportActive: action.payload.isCoreImportActive,
        isPartyImportActive: action.payload.isPartyImportActive,
        isReconActive: action.payload.isReconActive,
        isAutoReconActive: action.payload.isAutoReconActive,
      };
    }

    case "updateIsConnected": {
      return {
        ...state,
        isConnected: action.payload,
      };
    }

    default:
      throw new Error("Invalid action type.");
  }
};

export const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
