import { createContext, useReducer } from "react";
import today from "../utils/today.utils";

const initialState = {
  changeTime: 0,
  ledgerId: "000000000000",
  transType: "az",
  startDate: "2018-01-01",
  endDate: today("date"),
  isConnected: false,
  isCoreImportActive: false,
  isPartyImportActive: false,
  isReconActive: false,
  isAutoReconActive: false,
  showAppLoader: false,
  showSysToast: false,
  showBlockScreen: false,
  modalStack: [],
  modelQueue: [
    { id: 123, payload: { title: "test1" } },
    { id: 1234, payload: { title: "test2" } },
  ],
  issues: {
    showModal: false,
    selectedCoreTrans: [],
    selectedPartyTrans: [],
    coreTotal: 0,
    partyTotal: 0,
    count: 0,
    action: function () {
      console.log("Manual recon action");
    },
  },
  dialog: {
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

    case "updateIssues": {
      return {
        ...state,
        issues: {
          ...state.issues,
          ...action.payload,
        },
      };
    }

    case "updateTransState": {
      return {
        ...state,
        transState: action.payload,
      };
    }

    case "updateTransType": {
      return {
        ...state,
        transType: action.payload,
      };
    }

    case "updateStartDate": {
      return {
        ...state,
        startDate: action.payload,
      };
    }

    case "updateEndDate": {
      return {
        ...state,
        endDate: action.payload,
      };
    }

    case "updateChangeTime": {
      return {
        ...state,
        changeTime: action.payload,
      };
    }

    case "updateChangeInState": {
      return {
        ...state,
        changeInState: action.payload,
      };
    }

    case "updateShowBlockScreen": {
      return {
        ...state,
        showBlockScreen: action.payload,
      };
    }

    case "updateModalStack": {
      return {
        ...state,
        modalStack: [action.payload],
      };
    }

    case "clearModalStack": {
      return {
        ...state,
        modalStack: [],
      };
    }

    case "updateModelQueue": {
      return {
        ...state,
        modelQueue: [...state.modalQueue, action.payload],
      };
    }

    case "refreshModelQueue": {
      const updatedQueue = [...state.modelQueue].slice(1);
      return {
        ...state,
        modelQueue: updatedQueue,
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
