import { useContext } from "react";
import { CountDownXL, StatsWidgetXL } from "../components/Widgets";
import { AppContext } from "../context/AppContext";
import Message from "../components/Message";
import useCountdown from "../hooks/useCountdown";
import { useTransStream } from "../hooks/useTrans";
import formatAmount from "../utils/format.utils";

function Dashboard() {
  const { state } = useContext(AppContext);
  const ledgerId = state.ledgerId;
  const startDate = "2018-01-01";
  const endDate = state.endDate;

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
        isLoaded={sourceLoaded}
        label={"Pending"}
        desc={"Showing metrics about pending transactions"}
        data={[
          { label: "Core count", value: sourceStats?.coreCount || "00" },
          { label: "Party count", value: sourceStats?.partyCount || "00" },
          { label: "Total count", value: sourceStats?.totalCount || "00" },
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
            value: issuesStats?.extraData.mmCount || "00",
          },
          {
            label: "Partial count",
            value: issuesStats?.extraData.pmCount || "00",
          },
          { label: "Total count", value: issuesStats?.totalCount || "00" },
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

      <StatsWidgetXL
        isLoaded={archiveLoaded}
        label={"Reconciled"}
        desc={"Showing metrics about reconciled transactions"}
        data={[
          { label: "Core count", value: archiveStats?.coreCount || "00" },
          { label: "Party count", value: archiveStats?.partyCount || "00" },
          { label: "Total count", value: archiveStats?.totalCount || "00" },
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
    </main>
  ) : (
    <main className="main center">
      <Message />
    </main>
  );
}

export default Dashboard;
