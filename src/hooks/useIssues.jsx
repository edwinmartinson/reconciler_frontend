import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Updates the total amount of selected transactions for a given source type.
 *
 * The `useIssues` hook is used to update the total amount of selected transactions
 * for a given source type. It takes two parameters, `sourceType` and `transArray`.
 * `sourceType` is a string that specifies the source type of the transactions.
 * `transArray` is an array of transaction objects.
 *
 * The hook uses the `useContext` and `useEffect` hooks to get the current state of
 * the `AppContext` and to update the total amount of selected transactions when
 * the state changes.
 *
 * @param {string} sourceType - The source type of the transactions.
 * @param {array} transArray - An array of transaction objects.
 *
 * @returns {void}
 */
function useIssues(sourceType) {
  const { state, dispatch } = useContext(AppContext);
  const issues = state.issues;

  const selectedTrans = (issues, sourceType) => {
    switch (sourceType) {
      case "core":
        return issues.selectedCoreTrans;
      case "party":
        return issues.selectedPartyTrans;
      default:
        throw new Error("Invalid source type");
    }
  };

  useEffect(() => {
    const selectedTransObj = selectedTrans(issues, sourceType);

    const total = selectedTransObj?.reduce((pre, { amount }) => {
      return parseFloat((pre + Number.parseFloat(amount)).toFixed(2));
    }, 0.0);

    const handleTotal = (sourceType, total) => {
      switch (sourceType) {
        case "core":
          dispatch({
            type: "updateIssues",
            payload: { coreTotal: total },
          });
          break;

        case "party":
          dispatch({
            type: "updateIssues",
            payload: { partyTotal: total },
          });
          break;

        default:
          throw new Error("Invalid source type");
      }
    };

    handleTotal(sourceType, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues.selectedCoreTrans, issues.selectedPartyTrans]);
}

export default useIssues;
