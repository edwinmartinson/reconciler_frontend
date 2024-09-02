import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function useReseter(objKey) {
  const { dispatch } = useContext(AppContext);

  switch (objKey) {
    case "modal":
      return () => {
        dispatch({
          type: "updateDialog",
          payload: {
            show: false,
            type: "default",
            hideAction: true,
            title: "This is the title.",
            description: "This is the description of the action dialog",
            action: function () {
              console.log("This is working");
            },
          },
        });
      };
    case "issues":
      return () => {
        dispatch({
          type: "updateIssues",
          payload: {
            selectedCoreTrans: [],
            selectedPartyTrans: [],
            coreTotal: 0,
            partyTotal: 0,
            count: 0,
            coreRef: "",
          },
        });
      };

    default:
      throw new Error("Invalid object key");
  }
}

export default useReseter;
