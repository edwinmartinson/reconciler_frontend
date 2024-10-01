/**
 * Tabs component
 * @param {*} activeTab
 * @param {*} btnObj
 * @returns {JSX.Element}
 */
export default function Tabs({ activeTab, btnObj }) {
  return (
    <section className="tabs">
      {btnObj?.map((btn, index) => (
        <Button
          key={index}
          status={activeTab === index ? "active" : "inactive"}
          label={btn.label}
          handleClick={() => btn.action()}
        />
      ))}
    </section>
  );
}

function Button({ status, label, handleClick }) {
  return (
    <div role="button" className={`tabs__btn ${status}`} onClick={handleClick}>
      <p className="ft-p-regular">{label}</p>
    </div>
  );
}
