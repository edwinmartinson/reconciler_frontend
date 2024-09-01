import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div className="main error">
      <div className="error">
        <h1 className="error__label">
          Err<span className="clr--red">o</span>r
        </h1>

        <div className="error__group">
          <h1 className="ft-h1-regular clr--gray error__text">
            Sorry, there was an error on this page
          </h1>
          <h3 className="error__message ft-h3-regular">
            {error.statusText || error.message}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Error;
