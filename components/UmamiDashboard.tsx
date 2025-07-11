import React, { useEffect, useState } from "react";

export const UmamiDashboard: React.FC = () => {
  // Total Visitors Widget State
  const [visitors, setVisitors] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pageviews Trend Widget State
  const [pageviews, setPageviews] = useState<any>(null);
  const [pageviewsLoading, setPageviewsLoading] = useState(false);
  const [pageviewsError, setPageviewsError] = useState<string | null>(null);

  // Stats Widget State
  const [stats, setStats] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/umami/metrics?type=url`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        if (
          data &&
          data.data &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setVisitors(data.data[0].y);
        } else {
          setVisitors(0);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPageviewsLoading(true);
    setPageviewsError(null);
    fetch(`/api/umami/pageviews`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setPageviews(data))
      .catch((err) => setPageviewsError(err.message))
      .finally(() => setPageviewsLoading(false));
  }, []);

  useEffect(() => {
    setStatsLoading(true);
    setStatsError(null);
    fetch("/api/umami/stats")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => setStatsError(err.message))
      .finally(() => setStatsLoading(false));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
      }}
    >
      {/* Total Visitors Widget */}
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
        <h3>Total visitors</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>Error: {error}</div>
        ) : (
          <div style={{ fontSize: 32, fontWeight: 600 }}>{visitors ?? "-"}</div>
        )}
      </div>
      {/* Pageviews Trend Widget */}
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
        <h3>Pageviews trend</h3>
        {pageviewsLoading ? (
          <div>Loading...</div>
        ) : pageviewsError ? (
          <div style={{ color: "red" }}>Error: {pageviewsError}</div>
        ) : (
          <>
            {/* TODO: Replace with chart visualization */}
            <pre
              style={{
                fontSize: 12,
                background: "#f8f8f8",
                padding: 8,
                borderRadius: 4,
                overflowX: "auto",
              }}
            >
              {JSON.stringify(pageviews, null, 2)}
            </pre>
          </>
        )}
      </div>
      {/* Stats Widget */}
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
        <h3>Stats</h3>
        {statsLoading ? (
          <div>Loading...</div>
        ) : statsError ? (
          <div style={{ color: "red" }}>Error: {statsError}</div>
        ) : stats && stats.data ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 500 }}>Pageviews</div>
              <div style={{ fontSize: 20 }}>
                {stats.data.pageviews?.value ?? "-"}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>Visitors</div>
              <div style={{ fontSize: 20 }}>
                {stats.data.visitors?.value ?? "-"}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>Visits</div>
              <div style={{ fontSize: 20 }}>
                {stats.data.visits?.value ?? "-"}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>Bounces</div>
              <div style={{ fontSize: 20 }}>
                {stats.data.bounces?.value ?? "-"}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>Total time</div>
              <div style={{ fontSize: 20 }}>
                {stats.data.totaltime?.value ?? "-"}
              </div>
            </div>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>
      {/* Other widgets... */}
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
        <h3>Top pages</h3>
        <div>Coming soon</div>
      </div>
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
        <h3>Referrers</h3>
        <div>Coming soon</div>
      </div>
    </div>
  );
};

export default UmamiDashboard;
