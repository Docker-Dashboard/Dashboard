import Image from "next/image";
import { Suspense } from "react";

async function sonarrData(apiKey, ip, port, config) {
  try {
    const missing = await fetch(`http://${ip}:${port}/api/v3/wanted/missing`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!missing.ok) {
      throw `Api response error ${missing.status}`;
    }

    const missingData = await missing.json();
    // console.log(missingData);
    console.log("Missing: ", missingData.totalRecords);

    const queue = await fetch(`http://${ip}:${port}/api/v3/queue`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // console.log(queue);

    if (!queue.ok) {
      throw `Api response error ${queue.status}`;
    }

    const queueData = await queue.json();
    // console.log(queueData);
    console.log("In queue: ", queueData.records.length);

    const series = await fetch(`http://${ip}:${port}/api/v3/series`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!series.ok) {
      throw `Api response error ${series.status}`;
    }

    const seriesData = await series.json();

    const missingConfig = config.includes("missing");
    const queueConfig = config.includes("queue");
    const totalConfig = config.includes("total");

    const dataOut = (
      <div className="dashboardDataSonarrContent">
        {missingConfig ? (
          <p className="dashboardDataRadarr">
            Missing = {missingData.totalRecords}
          </p>
        ) : null}
        {queueConfig ? (
          <p className="dashboardDataRadarr">
            Queued = {queueData.records.length}
          </p>
        ) : null}
        {totalConfig ? (
          <p className="dashboardDataRadarr">Total = {seriesData.length}</p>
        ) : null}
      </div>
    );
    return dataOut;
  } catch (err) {
    return (
      <div className="dashboardDataSonarrContent">
        <p className="dashboardDataSonarr">{"" + err}</p>
      </div>
    );
  }
}

export async function sonarrApi(apiKey, ip, port, config, key) {
  console.log("Sending api request to Sonarr");
  try {
    if (!apiKey || !ip || !port || !config || !key) {
      console.log("invalid input data");
      console.log(!apiKey);
      console.log(!ip);
      console.log(!port);
      console.log(!config);
      console.log(!key);
      return;
    }
    return (
      <a href={`http://${ip}:${port}`} key={key}>
        <div className="dashboardBoxSonarr">
          <div className="dashboardBoxSonarrInfo">
            <div className="dashboardBoxSonarrIcon">
              <Image
                src={`https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/sonarr.svg`}
                alt={`Sonarr icon`}
                width={24}
                height={24}
                unoptimized
              />
            </div>
            <div className="dashboardBoxSonarrName">
              <p>Sonarr</p>
            </div>
          </div>
          <Suspense fallback={<p className="loadingText">Loading...</p>}>
            {sonarrData(apiKey, ip, port, config)}
          </Suspense>
        </div>
      </a>
    );
  } catch (err) {
    console.error(err);
    return (
      <div key={key} className="dashboardBoxSonarr">
        <div className="dashboardBoxSonarrInfo">
          <p>Sonarr - Error!</p>
        </div>
        <div className="dashboardDataSonarrContent">
          <p className="dashboardDataSonarr">{"" + err}</p>
        </div>
      </div>
    );
  }
}
