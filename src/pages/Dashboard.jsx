import { useContext } from "react";
import { CountDownXL, StatsWidgetXL } from "../components/Widgets";
import { AppContext } from "../context/AppContext";
import Message from "../components/Message";
import useCountdown from "../hooks/useCountdown";
import { useTransStream } from "../hooks/useTrans";
import formatAmount from "../utils/format.utils";
import today from "../utils/today.utils";

function Dashboard() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;
  const startDate = "2018-01-01";
  const endDate = today("date");

  // Hooks
  const [timeLeft] = useCountdown();
  const { hasLoaded: sourceLoaded, stats: sourceStats } = useTransStream(
    "source",
    startDate,
    endDate
  );
  const { hasLoaded: issuesLoaded, stats: issuesStats } = useTransStream(
    "issues",
    startDate,
    endDate
  );
  const { hasLoaded: archiveLoaded, stats: archiveStats } = useTransStream(
    "archive",
    startDate,
    endDate
  );

  return ledgerId !== "000000000000" ? (
    <main className="main main--dashboard">
      <CountDownXL
        label="Countdown"
        desc="Showing time left till auto recon"
        timeLeft={timeLeft}
        lastRun="DD/MM/YYYY"
      />

      <StatsWidgetXL
        isLoaded={archiveLoaded}
        label={"Reconciled"}
        desc={"Showing metrics about reconciled transactions"}
        data={[
          { label: "Core count", value: archiveStats?.coreCount || "0" },
          { label: "Party count", value: archiveStats?.partyCount || "0" },
          { label: "Total count", value: archiveStats?.totalCount || "0" },
          {
            label: "Core total",
            value: formatAmount(archiveStats?.coreTotal || 0.0),
          },
          {
            label: "Party total",
            value: formatAmount(archiveStats?.partyTotal || 0.0),
          },
          {
            label: "Balance",
            value: formatAmount(archiveStats?.balance || 0.0),
          },
        ]}
      />

      <StatsWidgetXL
        isLoaded={sourceLoaded}
        label={"Pending"}
        desc={"Showing metrics about pending transactions"}
        data={[
          { label: "Core count", value: sourceStats?.coreCount || "0" },
          { label: "Party count", value: sourceStats?.partyCount || "0" },
          { label: "Total count", value: sourceStats?.totalCount || "0" },
          {
            label: "Core total",
            value: formatAmount(sourceStats?.coreTotal || 0.0),
          },
          {
            label: "Party total",
            value: formatAmount(sourceStats?.partyTotal || 0.0),
          },
          {
            label: "Balance",
            value: formatAmount(sourceStats?.balance || 0.0),
          },
        ]}
      />

      <StatsWidgetXL
        isLoaded={issuesLoaded}
        label={"Outstanding"}
        desc={"Showing metrics about outstanding transactions"}
        data={[
          {
            label: "Mismatch count",
            value: issuesStats?.extraData.mmCount || "0",
          },
          {
            label: "Partial count",
            value: issuesStats?.extraData.pmCount || "0",
          },
          { label: "Total count", value: issuesStats?.totalCount || "0" },
          {
            label: "Mismatch total",
            value: formatAmount(issuesStats?.extraData.mmTotal || 0.0),
          },
          {
            label: "Partial total",
            value: formatAmount(issuesStats?.extraData.pmTotal || 0.0),
          },
          {
            label: "Balance",
            value: formatAmount(issuesStats?.balance || 0.0),
          },
        ]}
      />
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

export default Dashboard;
