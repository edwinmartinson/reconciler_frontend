import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import formatAmount from "../../../utils/formatNumber";

export function Widgets() {
  const { state } = useContext(AppContext);

  const count = state.issues.count;
  const coreTotal = state.issues.coreTotal;
  const partyTotal = state.issues.partyTotal;

  return (
    <div className="issue-widgets">
      <DataWidgetT1
        label={"Outstanding trans"}
        value={count}
        desc={"Showing current number of outstanding trans."}
      />
      <DataWidgetT2
        dataObjA={{
          label: "Core total",
          value: coreTotal,
        }}
        dataObjB={{
          label: "Party total",
          value: partyTotal,
        }}
      />
      <DataWidgetT3
        label={"Total balance"}
        value={coreTotal + partyTotal}
        desc={"Showing balance of selected transactions."}
      />
      <ManualRecon />
    </div>
  );
}

function DataWidgetT1({ label, value, desc }) {
  return (
    <div className="issue-widget">
      <div className="wrapper">
        <p className="ft-h6-regular">{label}</p>
        <p className="ft-h3-medium">{value}</p>
      </div>

      <p className="ft-txt-regular clr--gray">{desc}</p>
    </div>
  );
}

function DataWidgetT2({ dataObjA, dataObjB }) {
  return (
    <div className="issue-widget">
      <div className="wrapper">
        <p className="ft-h6-regular">{dataObjA.label}</p>
        <p className="ft-h3-medium">{formatAmount(dataObjA.value || 0)}</p>
      </div>

      <div className="wrapper">
        <p className="ft-h6-regular">{dataObjB.label}</p>
        <p className="ft-h3-medium">{formatAmount(dataObjB.value || 0)}</p>
      </div>
    </div>
  );
}

function DataWidgetT3({ label, value, desc }) {
  return (
    <div className="issue-widget">
      <div className="wrapper">
        <p className="ft-h6-regular">{label}</p>
        <p className="ft-h3-medium">{formatAmount(value || 0)}</p>
      </div>

      <p className="ft-txt-regular clr--gray">{desc}</p>
    </div>
  );
}

function ManualRecon() {
  return (
    <div className="issue-widget row">
      <div className="wrapper">
        <p className="ft-h6-regular">Manually reconcile</p>
        <p className="ft-txt-regular clr--gray">
          Manually reconcile selected trans.
        </p>
      </div>

      <span className="btn">
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
          <path
            d="M16.2126 0.271347L16.1181 0.188431C15.7562 -0.0879382 15.2376 -0.0602952 14.9071 0.271347L14.8246 0.366215C14.5492 0.729341 14.5767 1.24987 14.9071 1.58151L17.3336 4.01452H8.69237L8.40544 4.01959C4.12007 4.17121 0.692383 7.70565 0.692383 12.0436C0.692383 14.1242 1.48094 16.02 2.77447 17.4464L2.86354 17.5319C3.02464 17.6695 3.23346 17.7526 3.46161 17.7526C3.97141 17.7526 4.38469 17.3378 4.38469 16.8262C4.38469 16.613 4.31293 16.4166 4.19235 16.26L3.94701 15.9761C3.06719 14.9079 2.53853 13.5377 2.53853 12.0436C2.53853 8.63256 5.29371 5.86738 8.69237 5.86738H17.1613L14.9071 8.13235L14.8246 8.22723C14.5492 8.59035 14.5767 9.11088 14.9071 9.44252C15.2676 9.8043 15.8521 9.8043 16.2126 9.44252L20.1289 5.51202L20.2115 5.41715C20.4868 5.05402 20.4593 4.5335 20.1289 4.20185L16.2126 0.271347ZM23.1293 6.54901C22.9692 6.41506 22.7633 6.33448 22.5385 6.33448C22.0287 6.33448 21.6154 6.74926 21.6154 7.2609C21.6154 7.49067 21.6988 7.70091 21.8359 7.86118C22.8452 8.96133 23.4616 10.4303 23.4616 12.0436C23.4616 15.4546 20.7064 18.2198 17.3077 18.2198H8.76376L11.1089 15.8677L11.1988 15.7628C11.4418 15.4335 11.4393 14.9792 11.1914 14.6523L11.1089 14.5574L11.0044 14.4671C10.6762 14.2234 10.2236 14.2258 9.89792 14.4746L9.8034 14.5574L5.88712 18.488L5.79707 18.5927C5.5542 18.9221 5.55667 19.3765 5.80451 19.7032L5.88712 19.7981L9.8034 23.7286L9.90693 23.8183C10.2683 24.0875 10.7811 24.0576 11.1089 23.7286C11.4393 23.397 11.4668 22.8764 11.1914 22.5133L11.1089 22.4184L8.77114 20.0726H17.3077L17.5946 20.0675C21.8801 19.9159 25.3077 16.3815 25.3077 12.0436C25.3077 9.95937 24.5165 8.06058 23.219 6.63341L23.1293 6.54901Z"
            fill="white"
          />
        </svg>
      </span>
    </div>
  );
}
