import ActionDialog from "./components/Dialog/ActionDialog";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";

function AppWrapper({ hideHeader, children }) {
  return (
    <>
      <Loader />
      <ActionDialog />
      {hideHeader ? <></> : <Header />}
      {children}
    </>
  );
}

export default AppWrapper;
