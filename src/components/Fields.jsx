/**
 * A controlled text input component with a label.
 * @param {object} props
 * @param {string} props.classes - Additional class names to apply to the component.
 * @param {string} props.label - The label to display above the text input.
 * @param {string} props.placeholder - The placeholder text to display in the text input.
 * @param {function(string):void} props.handleValue - A function to call when the input value changes.
 * @param {boolean} props.disable - A boolean indicating whether the input should be disabled.
 * @returns {ReactElement} A JSX element representing the text input component.
 */
export function TextField({
  classes,
  label,
  placeholder,
  handleValue,
  disable = false,
  value,
}) {
  return (
    <label className={`field ${classes}`}>
      <p className="field__label">{label}</p>
      <input
        disabled={disable}
        className="field__input"
        placeholder={placeholder}
        onChange={(e) => handleValue(e.target.value)}
        value={value}
      />
    </label>
  );
}

/**
 * A controlled select component with a label.
 * @param {object} props
 * @param {string} props.classes - Additional class names to apply to the component.
 * @param {string} props.label - The label to display above the select.
 * @param {function(string):void} props.handleValue - A function to call when the select value changes.
 * @param {string} props.defaultValue - The default value of the select.
 * @param {ReactNode} props.children - The children to display inside the select.
 * @returns {ReactElement} A JSX element representing the select component.
 */
export function SelectField({
  classes,
  label,
  handleValue,
  defaultValue,
  children,
}) {
  return (
    <label className={`field ${classes}`}>
      {label ? <p className="field__label">{label}</p> : <></>}
      <select
        className="field__input select"
        onChange={(e) => handleValue(e.target.value)}
        value={defaultValue}
      >
        {children}
      </select>
    </label>
  );
}

/**
 * A controlled date input component with a label.
 * @param {object} props
 * @param {string} props.classes - Additional class names to apply to the component.
 * @param {string} props.label - The label to display above the date input.
 * @param {function(string):void} props.handleValue - A function to call when the input value changes.
 * @param {string} props.defaultValue - The default value of the date input.
 * @returns {ReactElement} A JSX element representing the date input component.
 */
export function DataField({ classes, label, handleValue, defaultValue }) {
  return (
    <label className={`field ${classes}`}>
      <p className="field__label">{label}</p>
      <input
        type="date"
        className="field__input"
        onChange={(e) => handleValue(e.target.value)}
        value={defaultValue}
      />
    </label>
  );
}

/**
 * A simple container component for grouping fields together.
 * @param {object} props
 * @param {*} props.children - The content to display inside the container.
 * @returns {ReactElement} A JSX element representing the container component.
 */
export function FieldContainer({ children }) {
  return <div className="field-container">{children}</div>;
}
