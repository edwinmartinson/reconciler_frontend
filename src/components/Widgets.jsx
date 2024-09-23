import { SubLoading } from "./Loader";
import { Link } from "react-router-dom";

const colorClass = (type) => {
  switch (type) {
    case "countdown":
      return "clr--black";

    case "pending":
      return "clr--accent";

    case "outstanding":
      return "clr--red";

    case "reconciled":
      return "clr--green";

    default:
      throw new Error("Invalid type.");
  }
};

/**
 * A widget that displays a statistic with a label, value, and description.
 * @param {{ hasLoaded: boolean, label: string, value: string|number, desc: string, showLoader: boolean }} props
 * @returns {ReactElement} A JSX element representing the widget.
 */
export function StatsWidget({
  hasLoaded,
  label,
  value,
  desc,
  showLoader = true,
}) {
  return (
    <div className="widget">
      {hasLoaded === false && showLoader ? (
        <SubLoading classes={"p-12"} />
      ) : (
        <></>
      )}
      <div className="wrapper--h">
        <p className="ft-h6-regular">{label}</p>
        <p className="ft-h6-medium">{value}</p>
      </div>

      <p className="ft-txt-regular clr--gray">{desc}</p>
    </div>
  );
}

/**
 * A widget that contains an action button.
 * @param {object} props
 * @param {string} props.title - The title to display above the action button.
 * @param {string} props.desc - The description to display above the action button.
 * @param {function():void} props.handleClick - The function to call when the action button is clicked.
 * @param {ReactElement} props.children - The content to display inside the action button.
 * @returns {ReactElement} A JSX element representing the action widget.
 */
export function ActionWidget({ title, desc, handleClick, children }) {
  return (
    <div className="widget widget--action">
      <div className="wrapper--v">
        <p className="ft-h6-regular">{title}</p>
        <p className="ft-txt-regular clr--gray">{desc}</p>
      </div>

      <span className="btn clickable" onClick={handleClick}>
        {children}
      </span>
    </div>
  );
}

/**
 * A widget that displays a large statistic.
 * @param {{ label: string, desc: string, data: Array<{ label: string, value: string|number }> }} props
 * @returns {ReactElement} A JSX element representing the widget.
 */
export function StatsWidgetXL({ isLoaded, label, desc, data }) {
  const type = label.toLowerCase();

  return (
    <div className="widget-xl">
      {isLoaded ? <></> : <SubLoading classes={""} />}

      <div className="widget-xl__head">
        <div className="wrapper--h">
          <StatsWidgetXLIcon type={type} />
          <p className={`ft-h6-regular ${colorClass(type)}`}>{label}</p>
        </div>

        <Link to={`/${label ? type : ""}`}>
          <p className="ft-txt-regular clr--gray underline">view more</p>
        </Link>
      </div>

      <div className="widget-xl__body">
        {data?.map(({ label, value }, key) => (
          <div className="widget-xl__body__child" key={key}>
            <p className="ft-p-regular clr--gray">{label}</p>
            <p className="ft-p-regular">{value}</p>
          </div>
        ))}
      </div>

      <div className={`widget-xl__footer ${type}`}>
        <p className="ft-p-regular">{desc}</p>
      </div>
    </div>
  );
}

/**
 * A widget that displays a large countdown statistic.
 * @param {{ label: string, desc: string, timeLeft: string, lastRun: string }} props
 * @returns {ReactElement} A JSX element representing the countdown widget.
 */
export function CountDownXL({ label, desc, timeLeft, lastRun }) {
  const type = label.toLowerCase();
  return (
    <div className="widget-xl">
      <div className="widget-xl__head">
        <div className="wrapper--h">
          <StatsWidgetXLIcon type={type} />
          <p className={`ft-h6-regular ${colorClass(type)}`}>{label}</p>
        </div>

        <Link to={`/dashboard`}>
          <p className="ft-txt-regular clr--gray underline">view more</p>
        </Link>
      </div>

      <div className="widget-xl__body--countdown">
        <p className="ft-txt-regular clr--gray">Last run on {lastRun}</p>
        <h1 className="ft-h1-regular">{timeLeft}</h1>
      </div>

      <div className="widget-xl__skip">
        <p className="ft-p-regular">Welcome back, User.</p>
      </div>

      <div className={`widget-xl__footer ${type}`}>
        <p className="ft-p-regular">{desc}</p>
      </div>
    </div>
  );
}

/**
 * Renders an icon based on the given type.
 *
 * @param {string} type - Type of icon to render. Valid values are "countdown", "pending", "outstanding", and "reconciled".
 * @returns {ReactElement} JSX element representing the icon.
 * @throws {Error} If type is invalid.
 */
function StatsWidgetXLIcon({ type }) {
  switch (type) {
    case "countdown":
      return (
        <span className="icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="16" fill="#121212" />
            <path
              d="M14.4864 10.9324C14.0236 10.364 13.3177 10 12.5263 10C11.1311 10 10 11.1311 10 12.5263C10 13.3177 10.364 14.0236 10.9324 14.4864C10.7374 15.0605 10.6316 15.6757 10.6316 16.3158C10.6316 17.7149 11.1371 18.996 11.9754 19.9863L10.7703 21.1914C10.5853 21.3764 10.5853 21.6763 10.7703 21.8612C10.9553 22.0462 11.2552 22.0462 11.4402 21.8612L12.6453 20.6562C13.6356 21.4945 14.9167 22 16.3158 22C17.7149 22 18.996 21.4945 19.9863 20.6562L21.1914 21.8612C21.3764 22.0462 21.6763 22.0462 21.8612 21.8612C22.0462 21.6763 22.0462 21.3764 21.8612 21.1914L20.6562 19.9863C21.4945 18.996 22 17.7149 22 16.3158C22 15.6757 21.8942 15.0605 21.6992 14.4864C22.2676 14.0236 22.6316 13.3177 22.6316 12.5263C22.6316 11.1311 21.5005 10 20.1053 10C19.314 10 18.608 10.364 18.1453 10.9324C17.5712 10.7374 16.9558 10.6316 16.3158 10.6316C15.6757 10.6316 15.0605 10.7374 14.4864 10.9324ZM12.5263 10.9474C12.9248 10.9474 13.2892 11.0949 13.5673 11.339C12.6314 11.857 11.857 12.6314 11.339 13.5673C11.0949 13.2891 10.9474 12.9248 10.9474 12.5263C10.9474 11.6543 11.6543 10.9474 12.5263 10.9474ZM19.0643 11.339C19.3424 11.0949 19.7068 10.9474 20.1053 10.9474C20.9773 10.9474 21.6843 11.6543 21.6843 12.5263C21.6843 12.9248 21.5367 13.2892 21.2926 13.5674C20.7746 12.6314 20.0002 11.8571 19.0643 11.339ZM15.8421 13.1579C16.1037 13.1579 16.3158 13.37 16.3158 13.6316V16.3158H18.0526C18.3142 16.3158 18.5263 16.5279 18.5263 16.7895C18.5263 17.0511 18.3142 17.2632 18.0526 17.2632H15.8421C15.5805 17.2632 15.3684 17.0511 15.3684 16.7895V13.6316C15.3684 13.37 15.5805 13.1579 15.8421 13.1579Z"
              fill="white"
            />
          </svg>
        </span>
      );
    case "pending":
      return (
        <span className="icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="16" fill="#6575F8" />
            <path
              d="M10.6875 10C9.75552 10 9 10.7555 9 11.6875V13.5625C9 14.4945 9.75552 15.25 10.6875 15.25H12.5625C13.4945 15.25 14.25 14.4945 14.25 13.5625V11.6875C14.25 10.7555 13.4945 10 12.5625 10H10.6875ZM15.9375 10.75C15.6269 10.75 15.375 11.0018 15.375 11.3125C15.375 11.6232 15.6269 11.875 15.9375 11.875H23.4375C23.7481 11.875 24 11.6232 24 11.3125C24 11.0018 23.7481 10.75 23.4375 10.75H15.9375ZM15.9375 13C15.6269 13 15.375 13.2518 15.375 13.5625C15.375 13.8732 15.6269 14.125 15.9375 14.125H21.1875C21.4981 14.125 21.75 13.8732 21.75 13.5625C21.75 13.2518 21.4981 13 21.1875 13H15.9375ZM10.6875 16.75C9.75552 16.75 9 17.5055 9 18.4375V20.3125C9 21.2444 9.75552 22 10.6875 22H12.5625C13.4945 22 14.25 21.2444 14.25 20.3125V18.4375C14.25 17.5055 13.4945 16.75 12.5625 16.75H10.6875ZM15.9375 17.5C15.6269 17.5 15.375 17.7519 15.375 18.0625C15.375 18.3731 15.6269 18.625 15.9375 18.625H23.4375C23.7481 18.625 24 18.3731 24 18.0625C24 17.7519 23.7481 17.5 23.4375 17.5H15.9375ZM15.9375 19.75C15.6269 19.75 15.375 20.0019 15.375 20.3125C15.375 20.6231 15.6269 20.875 15.9375 20.875H21.1875C21.4981 20.875 21.75 20.6231 21.75 20.3125C21.75 20.0019 21.4981 19.75 21.1875 19.75H15.9375Z"
              fill="white"
            />
          </svg>
        </span>
      );

    case "outstanding":
      return (
        <span className="icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="16" fill="#EC1F26" />
            <path
              d="M14.8184 10.6966C15.3322 9.7678 16.6675 9.76779 17.1813 10.6966L21.8293 19.0985C22.3272 19.9984 21.6763 21.1023 20.6479 21.1023H11.3521C10.3237 21.1023 9.67286 19.9984 10.1706 19.0985L14.8184 10.6966ZM16.5992 18.7028C16.5992 18.3719 16.3309 18.1035 16 18.1035C15.669 18.1035 15.4007 18.3719 15.4007 18.7028C15.4007 19.0337 15.669 19.3021 16 19.3021C16.3309 19.3021 16.5992 19.0337 16.5992 18.7028ZM16.4437 13.9903C16.4137 13.7706 16.2253 13.6014 15.9974 13.6016C15.7488 13.6018 15.5475 13.8035 15.5478 14.052L15.5499 16.7533L15.5541 16.8144C15.584 17.034 15.7725 17.2032 16.0003 17.203C16.2489 17.2028 16.4502 17.0012 16.45 16.7526L16.4479 14.0513L16.4437 13.9903Z"
              fill="white"
            />
          </svg>
        </span>
      );

    case "reconciled":
      return (
        <span className="icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="16" fill="#1ED760" />
            <path
              d="M12.125 10C9.84682 10 8 11.8468 8 14.125C8 15.8769 9.09218 17.3738 10.6328 17.9718C10.6623 17.447 10.7749 16.9443 10.9575 16.4768C10.0936 16.047 9.5 15.1554 9.5 14.125C9.5 12.6753 10.6753 11.5 12.125 11.5H16.625C18.0747 11.5 19.25 12.6753 19.25 14.125C19.25 15.5747 18.0747 16.75 16.625 16.75H16.25C15.8358 16.75 15.5 17.0858 15.5 17.5C15.5 17.9142 15.8358 18.25 16.25 18.25H16.625C18.9032 18.25 20.75 16.4032 20.75 14.125C20.75 11.8468 18.9032 10 16.625 10H12.125ZM21.5851 16.16C22.4143 16.4917 23 17.3025 23 18.25C23 19.4927 21.9927 20.5 20.75 20.5H15.5C14.2574 20.5 13.25 19.4927 13.25 18.25C13.25 17.0073 14.2574 16 15.5 16H16.25C16.6642 16 17 15.6642 17 15.25C17 14.8358 16.6642 14.5 16.2501 14.5H15.5C13.4289 14.5 11.75 16.1789 11.75 18.25C11.75 20.321 13.4289 22 15.5 22H20.75C22.821 22 24.5 20.321 24.5 18.25C24.5 16.5698 23.395 15.1477 21.8722 14.6708C21.8542 15.1922 21.7543 15.6927 21.5851 16.16Z"
              fill="white"
            />
          </svg>
        </span>
      );
    default:
      throw new Error("Invalid type.");
  }
}
