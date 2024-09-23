function Notification() {
  return (
    <div className="notification">
      <Card type="success" message={"Account created successfully."} />
      <Card type="error" message={"Sorry, something went wrong."} />
    </div>
  );
}

export default Notification;

/**
 * A component that displays a card with a type and a message.
 *
 * @param {{ type: string, message: string }} props
 * @prop {string} type The type of notification to display. Can be one of "info", "warning", "error", or "success".
 * @prop {string} message The message to display inside the card.
 *
 * @returns {ReactElement} A JSX element representing the card component.
 */
function Card({ type, message }) {
  return (
    <div className="notification__card">
      <div className="wrapper">
        <Badge type={type} />
        <span className="icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0C12.4182 0 16 3.58172 16 8C16 12.4182 12.4182 16 8 16C3.58172 16 0 12.4182 0 8C0 3.58172 3.58172 0 8 0ZM10.8242 5.17574L10.757 5.11764C10.5482 4.96272 10.2616 4.96081 10.0509 5.1119L9.97576 5.17574L8 7.1512L6.02426 5.17574L5.95697 5.11764C5.74818 4.96272 5.46161 4.96081 5.2509 5.1119L5.17574 5.17574L5.11764 5.24303C4.96272 5.45182 4.96081 5.73839 5.1119 5.9491L5.17574 6.02426L7.1512 8L5.17574 9.97576L5.11764 10.043C4.96272 10.2518 4.96081 10.5384 5.1119 10.7491L5.17574 10.8242L5.24303 10.8823C5.45182 11.0373 5.73839 11.0392 5.9491 10.8881L6.02426 10.8242L8 8.8488L9.97576 10.8242L10.043 10.8823C10.2518 11.0373 10.5384 11.0392 10.7491 10.8881L10.8242 10.8242L10.8823 10.757C11.0373 10.5482 11.0392 10.2616 10.8881 10.0509L10.8242 9.97576L8.8488 8L10.8242 6.02426L10.8823 5.95697C11.0373 5.74818 11.0392 5.46161 10.8881 5.2509L10.8242 5.17574Z"
              fill="#121212"
            />
          </svg>
        </span>
      </div>

      <p className="ft-p-regular">{message}</p>
    </div>
  );
}

/**
 * A component that displays a badge with a given type.
 * @param {object} props
 * @param {"error" | "warning" | "success" | "alert"} props.type - The type of the badge.
 * @returns {ReactElement} A JSX element representing the badge.
 * @throws {Error} If the type is invalid.
 */
function Badge({ type }) {
  switch (type) {
    case "error":
      return (
        <div className="notification__badge error">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M6.5 0C10.0898 0 13 2.91015 13 6.5C13 10.0898 10.0898 13 6.5 13C2.91015 13 0 10.0898 0 6.5C0 2.91015 2.91015 0 6.5 0ZM8.7947 4.20529L8.74003 4.15808C8.57038 4.03221 8.33755 4.03066 8.16634 4.15342L8.10531 4.20529L6.5 5.81035L4.89471 4.20529L4.84004 4.15808C4.67039 4.03221 4.43756 4.03066 4.26635 4.15342L4.20529 4.20529L4.15808 4.25996C4.03221 4.42961 4.03066 4.66244 4.15342 4.83365L4.20529 4.89471L5.81035 6.5L4.20529 8.10531L4.15808 8.15997C4.03221 8.32962 4.03066 8.56245 4.15342 8.73366L4.20529 8.7947L4.25996 8.84188C4.42961 8.96779 4.66244 8.96935 4.83365 8.84656L4.89471 8.7947L6.5 7.18965L8.10531 8.7947L8.15997 8.84188C8.32962 8.96779 8.56245 8.96935 8.73366 8.84656L8.7947 8.7947L8.84188 8.74003C8.96779 8.57038 8.96935 8.33755 8.84656 8.16634L8.7947 8.10531L7.18965 6.5L8.7947 4.89471L8.84188 4.84004C8.96779 4.67039 8.96935 4.43756 8.84656 4.26635L8.7947 4.20529Z"
              fill="#EC1F26"
            />
          </svg>
          <p className="badge__text">Error</p>
        </div>
      );
    case "success":
      return (
        <div className="notification__badge success">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M6.5 0C10.0898 0 13 2.91015 13 6.5C13 10.0898 10.0898 13 6.5 13C2.91015 13 0 10.0898 0 6.5C0 2.91015 2.91015 0 6.5 0ZM8.5928 4.53029L5.6875 7.43554L4.40721 6.1553C4.21684 5.96492 3.90816 5.96492 3.71779 6.1553C3.52741 6.34569 3.52741 6.65431 3.71779 6.84469L5.3428 8.4697C5.53319 8.66008 5.84181 8.66008 6.0322 8.4697L9.2822 5.2197C9.47258 5.02934 9.47258 4.72066 9.2822 4.53029C9.09181 4.33991 8.78319 4.33991 8.5928 4.53029Z"
              fill="#1ED760"
            />
          </svg>
          <p className="badge__text">Success</p>
        </div>
      );
    case "warning":
      return (
        <div className="notification__badge warning">
          <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
            <path
              d="M5.64205 0.815694C6.24365 -0.271885 7.80719 -0.271899 8.40879 0.815658L13.8514 10.6537C14.4343 11.7075 13.6722 13 12.468 13H1.58323C0.379043 13 -0.383063 11.7075 0.199819 10.6538L5.64205 0.815694ZM7.72722 10.1904C7.72722 9.80288 7.41307 9.48866 7.02556 9.48866C6.63798 9.48866 6.32383 9.80288 6.32383 10.1904C6.32383 10.5779 6.63798 10.8921 7.02556 10.8921C7.41307 10.8921 7.72722 10.5779 7.72722 10.1904ZM7.5451 4.67232C7.51004 4.41512 7.2894 4.21705 7.02261 4.21726C6.7315 4.21749 6.49576 4.45362 6.49604 4.74467L6.49857 7.9077L6.50342 7.97923C6.53848 8.2364 6.75919 8.43448 7.02598 8.43427C7.31702 8.43406 7.55276 8.1979 7.55255 7.90686L7.55002 4.74382L7.5451 4.67232Z"
              fill="#FFEF00"
            />
          </svg>
          <p className="badge__text">Warning</p>
        </div>
      );
    case "alert":
      return (
        <div className="notification__badge alert">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
            <path
              d="M4.02702 11.3341H7.97188C7.81273 12.2796 6.99023 13 5.99944 13C5.00865 13 4.18613 12.2796 4.02702 11.3341ZM5.99944 0C8.76118 0 11.0001 2.23885 11.0001 5.00062V7.66661L11.9457 9.7736C11.9823 9.85515 12.0012 9.94356 12.0012 10.033C12.0012 10.3828 11.7177 10.6664 11.3678 10.6664H0.633569C0.544365 10.6664 0.456174 10.6476 0.374757 10.6111C0.0554713 10.4682 -0.087493 10.0934 0.0554446 9.77413L0.998828 7.66687L0.998895 4.992L1.00184 4.82537C1.09457 2.13789 3.30303 0 5.99944 0Z"
              fill="#6575F8"
            />
          </svg>
          <p className="badge__text">Alert</p>
        </div>
      );
    default:
      throw new Error("Invalid type");
  }
}
