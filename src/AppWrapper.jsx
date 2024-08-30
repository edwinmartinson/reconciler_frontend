import ActionDialog from "./components/ActionDialog";
import Header from "./components/Header";
import Loader from "./components/Loader";

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
