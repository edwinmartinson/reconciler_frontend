import { createContext, useReducer } from "react";

const initialState = new Map([["acctId", 0]]);

const reducer = (state, action) => {
  switch (action.type) {
    case "updateAcctId": {
      const newState = new Map(state);
      newState.set("acctId", action.payload);
      return newState;
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
