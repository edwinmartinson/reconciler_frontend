import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import useActions from "../../../hooks/useActions";

export default function Widgets() {
  return (
    <div className="widgets">
      <Countdown />
      <ImporterTracker />
      <ErrorTracker />
      <AppActions />
    </div>
  );
}

function WidgetIcons({ index }) {
  switch (index) {
    case 1:
      // Timer
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            width="32"
            height="32"
            rx="16"
            fill="#C0C0C0"
            fillOpacity="0.2"
          />
          <path
            d="M10.9 16C10.9 13.1833 13.1833 10.9 16 10.9C18.8166 10.9 21.1 13.1833 21.1 16C21.1 18.8166 18.8166 21.1 16 21.1C13.1833 21.1 10.9 18.8166 10.9 16ZM16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10ZM15.9959 12.789C15.9661 12.5694 15.7777 12.4 15.55 12.4C15.3016 12.4 15.1 12.6016 15.1 12.85V16.45L15.1041 16.511C15.1339 16.7306 15.3223 16.9 15.55 16.9H17.95L18.011 16.8959C18.2306 16.8661 18.4 16.6777 18.4 16.45C18.4 16.2016 18.1984 16 17.95 16H16V12.85L15.9959 12.789Z"
            fill="#121212"
          />
        </svg>
      );

    case 2:
      // Imports
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            width="32"
            height="32"
            rx="16"
            fill="#C0C0C0"
            fillOpacity="0.2"
          />
          <path
            d="M11.8587 11.5012L11.8571 12.7143V18.7167C11.8571 19.7423 12.6886 20.5738 13.7143 20.5738L14.8482 20.5739C15.0127 20.8888 15.2209 21.1772 15.4649 21.431H13.7143C12.2152 21.431 11 20.2158 11 18.7167V12.7143C11 12.1539 11.3585 11.6772 11.8587 11.5012ZM20.1429 11.2857V15.7267C19.8782 15.5573 19.5906 15.4205 19.2857 15.322V11.2857C19.2857 11.049 19.0938 10.8571 18.8571 10.8571H13.7143C13.4776 10.8571 13.2857 11.049 13.2857 11.2857V18.7143C13.2857 18.951 13.4776 19.1429 13.7143 19.1429H14.4394C14.462 19.4397 14.5194 19.7267 14.6077 20H13.7143C13.0042 20 12.4286 19.4243 12.4286 18.7143V11.2857C12.4286 10.5756 13.0042 10 13.7143 10H18.8571C19.5672 10 20.1429 10.5756 20.1429 11.2857ZM21.2857 18.8571C21.2857 17.1214 19.8786 15.7143 18.1429 15.7143C16.4071 15.7143 15 17.1214 15 18.8571C15 20.5929 16.4071 22 18.1429 22C19.8786 22 21.2857 20.5929 21.2857 18.8571ZM18.4289 19.1429L18.4292 20.5734C18.4292 20.7313 18.3013 20.8591 18.1435 20.8591C17.9857 20.8591 17.8578 20.7313 17.8578 20.5734L17.8575 19.1429H16.4261C16.2684 19.1429 16.1406 19.015 16.1406 18.8571C16.1406 18.6994 16.2684 18.5714 16.4261 18.5714H17.8574L17.8571 17.1425C17.8571 16.9846 17.9851 16.8567 18.1429 16.8567C18.3006 16.8567 18.4286 16.9846 18.4286 17.1425L18.4289 18.5714H19.8552C20.0129 18.5714 20.1406 18.6994 20.1406 18.8571C20.1406 19.015 20.0129 19.1429 19.8552 19.1429H18.4289Z"
            fill="#121212"
          />
        </svg>
      );

    case 3:
      // Issues
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            width="32"
            height="32"
            rx="16"
            fill="#C0C0C0"
            fillOpacity="0.2"
          />
          <path
            d="M12.5487 18.4013C13.1286 18.4013 13.5987 18.8714 13.5987 19.4513V20.95C13.5987 21.5299 13.1286 22 12.5487 22H11.05C10.4701 22 10 21.5299 10 20.95V19.4513C10 18.8714 10.4701 18.4013 11.05 18.4013H12.5487ZM12.5487 19.3013H11.05C10.9672 19.3013 10.9 19.3685 10.9 19.4513V20.95C10.9 21.0329 10.9672 21.1 11.05 21.1H12.5487C12.6316 21.1 12.6987 21.0329 12.6987 20.95V19.4513C12.6987 19.3685 12.6316 19.3013 12.5487 19.3013ZM14.6489 19.6H21.5517C21.8003 19.6 22.0017 19.8015 22.0017 20.05C22.0017 20.2778 21.8324 20.4661 21.6128 20.4959L21.5517 20.5H14.6489C14.4003 20.5 14.1989 20.2985 14.1989 20.05C14.1989 19.8222 14.3682 19.6339 14.5878 19.6041L14.6489 19.6ZM12.5487 14.2006C13.1286 14.2006 13.5987 14.6707 13.5987 15.2507V16.7493C13.5987 17.3292 13.1286 17.7993 12.5487 17.7993H11.05C10.4701 17.7993 10 17.3292 10 16.7493V15.2507C10 14.6707 10.4701 14.2006 11.05 14.2006H12.5487ZM12.5487 15.1007H11.05C10.9672 15.1007 10.9 15.1678 10.9 15.2507V16.7493C10.9 16.8322 10.9672 16.8993 11.05 16.8993H12.5487C12.6316 16.8993 12.6987 16.8322 12.6987 16.7493V15.2507C12.6987 15.1678 12.6316 15.1007 12.5487 15.1007ZM14.6489 15.4H21.5517C21.8003 15.4 22.0017 15.6015 22.0017 15.85C22.0017 16.0778 21.8324 16.2661 21.6128 16.2959L21.5517 16.3H14.6489C14.4003 16.3 14.1989 16.0985 14.1989 15.85C14.1989 15.6222 14.3682 15.4339 14.5878 15.4041L14.6489 15.4ZM12.5487 10C13.1286 10 13.5987 10.4701 13.5987 11.05V12.5487C13.5987 13.1286 13.1286 13.5987 12.5487 13.5987H11.05C10.4701 13.5987 10 13.1286 10 12.5487V11.05C10 10.4701 10.4701 10 11.05 10H12.5487ZM12.5487 10.9H11.05C10.9672 10.9 10.9 10.9672 10.9 11.05V12.5487C10.9 12.6316 10.9672 12.6987 11.05 12.6987H12.5487C12.6316 12.6987 12.6987 12.6316 12.6987 12.5487V11.05C12.6987 10.9672 12.6316 10.9 12.5487 10.9ZM14.6489 11.2H21.5517C21.8003 11.2 22.0017 11.4015 22.0017 11.65C22.0017 11.8778 21.8324 12.0661 21.6128 12.0959L21.5517 12.1H14.6489C14.4003 12.1 14.1989 11.8985 14.1989 11.65C14.1989 11.4222 14.3682 11.2339 14.5878 11.2041L14.6489 11.2Z"
            fill="#121212"
          />
        </svg>
      );

    case 4:
      // Transactions
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            width="32"
            height="32"
            rx="16"
            fill="#C0C0C0"
            fillOpacity="0.2"
          />
          <path
            d="M16 10C19.3138 10 22 12.6868 22 16C22 19.3132 19.3138 22 16 22C12.6862 22 10 19.3132 10 16C10 12.6868 12.6862 10 16 10ZM16 11.0002C13.243 11.0002 11.0002 13.243 11.0002 16C11.0002 18.757 13.243 20.9998 16 20.9998C18.757 20.9998 20.9998 18.757 20.9998 16C20.9998 13.243 18.757 11.0002 16 11.0002ZM15.9992 17.5013C16.3301 17.5013 16.5984 17.7696 16.5984 18.1005C16.5984 18.4314 16.3301 18.6998 15.9992 18.6998C15.6683 18.6998 15.4 18.4314 15.4 18.1005C15.4 17.7696 15.6683 17.5013 15.9992 17.5013ZM15.9967 13C16.2245 12.9998 16.4129 13.169 16.4429 13.3886L16.4471 13.4496L16.4492 16.1506C16.4494 16.3991 16.2481 16.6008 15.9996 16.601C15.7718 16.6011 15.5833 16.432 15.5534 16.2124L15.5492 16.1513L15.5471 13.4504C15.5468 13.2018 15.7481 13.0002 15.9967 13Z"
            fill="#212121"
          />
        </svg>
      );

    case 5:
      // Actions
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            width="32"
            height="32"
            rx="16"
            fill="#C0C0C0"
            fillOpacity="0.2"
          />
          <path
            d="M19.6182 10.4091L21.5917 12.3826C22.1372 12.9282 22.1372 13.8126 21.5917 14.3581L19.9872 15.9624C20.6595 16.0632 21.1751 16.6432 21.1751 17.3437V20.6031C21.1751 21.3746 20.5496 22 19.7782 22H11.3969C10.6254 22 10 21.3746 10 20.6031V12.2218C10 11.4503 10.6254 10.8249 11.3969 10.8249H14.6563C15.3571 10.8249 15.9375 11.3411 16.0378 12.014L17.6427 10.4091C18.1882 9.86362 19.0727 9.86362 19.6182 10.4091ZM10.9313 20.6031C10.9313 20.8603 11.1397 21.0687 11.3969 21.0687L15.1213 21.0683L15.1219 16.8781L10.9313 16.8777V20.6031ZM16.0525 21.0683L19.7782 21.0687C20.0353 21.0687 20.2438 20.8603 20.2438 20.6031V17.3437C20.2438 17.0865 20.0353 16.8781 19.7782 16.8781L16.0525 16.8777V21.0683ZM14.6563 11.7561H11.3969C11.1397 11.7561 10.9313 11.9646 10.9313 12.2218V15.9464H15.1219V12.2218C15.1219 11.9646 14.9134 11.7561 14.6563 11.7561ZM16.0532 14.742V15.9468L17.2576 15.9464L16.0532 14.742ZM18.3012 11.0676L16.3277 13.0411C16.1459 13.223 16.1459 13.5178 16.3277 13.6996L18.3012 15.6731C18.483 15.8549 18.7778 15.8549 18.9597 15.6731L20.9332 13.6996C21.115 13.5178 21.115 13.223 20.9332 13.0411L18.9597 11.0676C18.7778 10.8858 18.483 10.8858 18.3012 11.0676Z"
            fill="#212121"
          />
        </svg>
      );

    default:
      throw new Error("Invalid index");
  }
}

function Countdown() {
  return (
    <div className="widget">
      <div className="wrapper">
        <WidgetIcons index={5} />
        <h3 className="ft-h6-regular">Countdown</h3>
      </div>

      <h1 className="ft-h1-regular">2hrs 3min 24s</h1>
      <p className="ft-txt-regular clr--gray">
        Time left till next auto reconciliation.
      </p>
    </div>
  );
}

function ImporterTracker() {
  const { state } = useContext(AppContext);
  const coreImporter = state.isCoreImportActive ? "active" : "inactive";
  const partyImporter = state.isPartyImportActive ? "active" : "inactive";

  return (
    <div className="widget">
      <div className="wrapper">
        <WidgetIcons index={2} />
        <h3 className="ft-h6-regular">Importer tracker</h3>
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Core importer</h6>
        <ImportStatusPile status={coreImporter} />
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Party importer</h6>
        <ImportStatusPile status={partyImporter} />
      </div>

      <p className="ft-txt-regular clr--gray">
        Showing current state of importers.
      </p>
    </div>
  );
}

function ImportStatusPile({ status }) {
  switch (status) {
    case "inactive":
      return (
        <div className="widget__import inactive">
          <p className="ft-p-medium">Inactive</p>
        </div>
      );

    case "active":
      return (
        <div className="widget__import active">
          <p className="ft-p-medium">Active</p>
        </div>
      );

    default:
      throw new Error("Invalid status");
  }
}

function ErrorTracker() {
  return (
    <div className="widget">
      <div className="wrapper">
        <WidgetIcons index={3} />
        <h3 className="ft-h6-regular">Error tracker</h3>
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Import errors</h6>
        <h6 className="ft-h3-medium clr--gray">00</h6>
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Recon error</h6>
        <h6 className="ft-h3-medium clr--gray">00</h6>
      </div>

      <p className="ft-txt-regular clr--gray">
        Showing error count for last run.
      </p>
    </div>
  );
}

function OutstandingTrans() {
  return (
    <div className="widget">
      <div className="wrapper">
        <WidgetIcons index={4} />
        <h3 className="ft-h6-regular">Outstanding</h3>
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Core transactions</h6>
        <h6 className="ft-h3-medium clr--gray">00</h6>
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Party transactions</h6>
        <h6 className="ft-h3-medium clr--red">02</h6>
      </div>

      <p className="ft-txt-regular clr--gray">
        Showing current outstanding trans.
      </p>
    </div>
  );
}

function AppActions() {
  const { dispatch } = useContext(AppContext);
  const {
    error: iError,
    hasResponded: iHasResponded,
    message: iMessage,
    doAction: iDoAction,
  } = useActions("import");
  const {
    error: rError,
    hasResponded: rHasResponded,
    message: rMessage,
    doAction: rDoAction,
  } = useActions("recon");

  useEffect(() => {
    if (iHasResponded === true) onImportRes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iHasResponded]);

  useEffect(() => {
    if (rHasResponded === true) onReconRes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rHasResponded]);

  function onImportRes() {
    return dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: iError === true ? "error" : "success",
        hideAction: true,
        title:
          iError === true
            ? "Instant import failed."
            : "Instant import initiated",
        description: iMessage,
        action: iDoAction,
      },
    });
  }

  function onReconRes() {
    return dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: rError === true ? "error" : "success",
        hideAction: true,
        title:
          rError === true ? "Instant recon failed." : "Instant recon initiated",
        description: rMessage,
        action: rDoAction,
      },
    });
  }

  const handleImport = () => {
    dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: "default",
        hideAction: false,
        title: "Are you sure?",
        description:
          "Confirm this action to instantly import transactions from core source and third parties.",
        action: iDoAction,
      },
    });
  };

  const handleRecon = () => {
    dispatch({
      type: "updateDialog",
      payload: {
        show: true,
        type: "default",
        hideAction: false,
        title: "Are you sure?",
        description:
          "Confirm this action to instantly reconcile imported transactions.",
        action: rDoAction,
      },
    });
  };

  return (
    <div className="widget">
      <div className="wrapper">
        <WidgetIcons index={5} />
        <h3 className="ft-h6-regular">App actions</h3>
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Instant import</h6>
        <AppActionBtn action={handleImport} />
      </div>

      <div className="wrapper space-between">
        <h6 className="ft-h6-regular">Instant recon</h6>
        <AppActionBtn action={handleRecon} />
      </div>

      <p className="ft-txt-regular clr--gray">
        Quick app actions for reconciler
      </p>
    </div>
  );
}

function AppActionBtn({ action }) {
  return (
    <div className="widget__action" onClick={() => action()}>
      <p className="ft-p-medium">Activate</p>
    </div>
  );
}
