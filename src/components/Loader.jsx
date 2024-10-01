export function Loading({ classes }) {
  return (
    <div className="loader__background">
      <Loader classes={classes} />
    </div>
  );
}

export function SubLoading({ classes }) {
  return (
    <div className={`loader__component ${classes}`}>
      <Loader classes={"medium"} />
    </div>
  );
}

export function Loader({ classes = "" }) {
  return <div className={`loader ` + classes}></div>;
}
