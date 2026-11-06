import { Suspense } from "react";
import { StatsData } from "@/app/site/components/stats-client";

export async function stats(config: any, key: number) {
  console.log("Getting host stats");
  try {
    if (!config || !key) {
      console.log("invalid input data");
      console.log(!config);
      console.log(!key);
      return;
    }
    return (
        <div key={key} className="dashboardBoxStats">
          <div className="dashboardBoxStatsInfo">
            <div className="dashboardBoxStatsName">
              <p>Stats</p>
            </div>
          </div>
          <Suspense fallback={<p className="loadingText">Loading...</p>}>
            <StatsData config={config} />
          </Suspense>
        </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <div key={key} className="dashboardBoxStats">
        <div className="dashboardBoxStatsName">
          <p>Stats - Error!</p>
        </div>
        <div className="dashboardDataStatsContent">
          <p className="dashboardDataStats">{"" + err}</p>
        </div>
      </div>
    );
  }
}
