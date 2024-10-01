function Button({ type = "filled", actions, classes, children }) {
  switch (type) {
    case "filled":
      return (
        <div
          className={"button filled " + classes}
          onClick={() => actions.forEach((action) => action.call())}
        >
          <p className="ft-p-medium">{children}</p>
        </div>
      );

    case "outlined":
      return (
        <div
          className={"button outlined" + classes}
          onClick={() => actions.forEach((action) => action.call())}
        >
          <p className="ft-p-medium">{children}</p>
        </div>
      );

    default:
      throw new Error("Invalid button type.");
  }
}

export default Button;
