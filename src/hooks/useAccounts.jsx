import { useContext, useEffect, useState } from "react";
import { getEndpoint } from "../utils/endpoint.utils";
import { ConfigContext } from "../context/ConfigContext";
import { AppContext } from "../context/AppContext";
import useDialog from "./useDialog";

export default function useAccounts(loadOnMount) {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state: configState, dispatch: configDispatch } =
    useContext(ConfigContext);
  const { config, openDialog } = useDialog();
  const [accts, setAccts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function updateChangeTime() {
    configDispatch({ type: "updateChangeTime", payload: Date.now() });
  }

  async function fetchAccts() {
    setIsLoading(true);

    try {
      const result = await fetch(getEndpoint("accts"), { cache: "no-store" });
      const resultData = await result.json();

      resultData.status === "success" && setAccts(resultData.data);
    } catch (error) {
      console.error(error?.message || error);
    } finally {
      setIsLoading(false);
    }
  }

  async function editAccount() {
    const { editAccount } = configState;
    appDispatch({ type: "updateLoader", payload: true });

    try {
      const result = await fetch(getEndpoint("accts"), {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acctId: editAccount.acctId,
          alias: editAccount.alias,
          ledgerId: editAccount.ledgerId,
        }),
      });

      const resultData = await result.json();

      if (resultData.status === "success") {
        const extendConfig = {
          ...config,
          title: "Account updated",
          description: resultData.message,
          leftBtn: {
            ...config.leftBtn,
            show: false,
          },
          rightBtn: {
            ...config.rightBtn,
            label: "close",
            type: "filled",
          },
        };
        openDialog(extendConfig, "success", updateChangeTime);
      } else throw new Error(resultData.message);
    } catch (error) {
      console.error(error?.message || error);

      const extendConfig = {
        ...config,
        title: "Account update failed",
        description: error?.message || error,
        leftBtn: {
          ...config.leftBtn,
          show: true,
          label: "close",
        },
        rightBtn: {
          ...config.rightBtn,
          show: false,
        },
      };
      openDialog(extendConfig, "error");
    } finally {
      appDispatch({ type: "updateLoader", payload: false });
    }
  }

  async function addAccount() {
    const { addAccount } = configState;
    appDispatch({ type: "updateLoader", payload: true });

    try {
      const result = await fetch(getEndpoint("accts"), {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ledgerId: addAccount.ledgerId,
          alias: addAccount.alias,
        }),
      });

      const resultData = await result.json();

      if (resultData.status === "success") {
        const extendConfig = {
          ...config,
          title: "Account created",
          description: resultData.message,
          leftBtn: {
            ...config.leftBtn,
            show: false,
          },
          rightBtn: {
            ...config.rightBtn,
            label: "close",
            type: "filled",
          },
        };
        openDialog(extendConfig, "success", updateChangeTime);
      } else throw new Error(resultData.message);
    } catch (error) {
      console.error(error?.message || error);

      const extendConfig = {
        ...config,
        title: "Account creation failed",
        description: error?.message || error,
        leftBtn: {
          ...config.leftBtn,
          show: true,
          label: "close",
        },
        rightBtn: {
          ...config.rightBtn,
          show: false,
        },
      };
      openDialog(extendConfig, "error");
    } finally {
      appDispatch({ type: "updateLoader", payload: false });
    }
  }

  async function deleteAccount(ledgerId) {
    appDispatch({ type: "updateLoader", payload: true });

    try {
      const result = await fetch(getEndpoint("accts") + `/${ledgerId}`, {
        cache: "no-store",
        method: "DELETE",
      });

      const resultData = await result.json();

      if (resultData.status === "success") {
        const extendConfig = {
          ...config,
          title: "Account deleted successfully",
          description: resultData.message,
          leftBtn: {
            ...config.leftBtn,
            show: false,
          },
          rightBtn: {
            ...config.rightBtn,
            label: "close",
            type: "filled",
          },
        };
        openDialog(extendConfig, "success", updateChangeTime);
      } else throw new Error(resultData.message);
    } catch (error) {
      console.error(error?.message || error);

      const extendConfig = {
        ...config,
        title: "Account deletion failed",
        description: error?.message || error,
        leftBtn: {
          ...config.leftBtn,
          show: true,
          label: "close",
        },
        rightBtn: {
          ...config.rightBtn,
          show: false,
        },
      };
      openDialog(extendConfig, "error");
    } finally {
      appDispatch({ type: "updateLoader", payload: false });
    }
  }

  useEffect(() => {
    if (loadOnMount) fetchAccts();
  }, [loadOnMount]);

  return {
    isLoading,
    accts,
    fetchAccts,
    editAccount,
    addAccount,
    deleteAccount,
  };
}
