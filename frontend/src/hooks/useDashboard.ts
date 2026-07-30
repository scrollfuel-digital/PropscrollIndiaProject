import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { dashboardStatsAtom, dashboardLoadingAtom, dashboardErrorAtom } from "@/src/state/dashboardState";
import { getDashboardStatsApi } from "@/src/api/dashboardApi";

export function useDashboard() {
  const [stats, setStats] = useAtom(dashboardStatsAtom);
  const setLoading = useSetAtom(dashboardLoadingAtom);
  const setError = useSetAtom(dashboardErrorAtom);

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getDashboardStatsApi();
      if (data.success) setStats(data.data);
      else setError("Failed to load dashboard data.");
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  return { stats, fetchStats };
}
