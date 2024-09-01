import ActionDialog from "./components/ActionDialog";
import Header from "./components/Header";
import Loader from "./components/Loader";
import SmallScreen from "./components/SmallScreen";

function AppWrapper({ hideHeader, children }) {
  return (
    <>
      <Loader />
      <SmallScreen />
      <ActionDialog />
      {hideHeader ? <></> : <Header />}
      {children}
    </>
  );
}

export default AppWrapper;
