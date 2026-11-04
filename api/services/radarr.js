import Image from "next/image";
import { Suspense } from "react";

async function radarrData(apiKey, ip, port, config) {
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
    // console.log("Missing: ", missingData.totalRecords);

    const queue = await fetch(`http://${ip}:${port}/api/v3/queue`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!queue.ok) {
      throw `Api response error ${queue.status}`;
    }

    const queueData = await queue.json();
    // console.log("In queue: ", queueData.records.length);

    const movie = await fetch(`http://${ip}:${port}/api/v3/movie`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!movie.ok) {
      throw `Api response error ${movie.status}`;
    }

    const movieData = await movie.json();
    let movieCount = 0;
    for (let i = 0; i < movieData.length; i++) {
      const currentMovie = movieData[i];
      if (currentMovie.hasFile == true) {
        movieCount += 1;
      }
    }
    // console.log("Movie count: ", movieCount);

    // console.log("Missing: ", missing.records.length);
    // console.log(data.length);

    const missingConfig = config.includes("missing");
    const queueConfig = config.includes("queue");
    const countConfig = config.includes("count");
    const totalConfig = config.includes("total");

    const dataOut = (
      <div className="dashboardDataRadarrContent">
        {/* <p className="dashboardDataRadarr">
          data recieved: {JSON.stringify(data)}
        </p> */}
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
        {countConfig ? (
          <p className="dashboardDataRadarr">Count = {movieCount}</p>
        ) : null}
        {totalConfig ? (
          <p className="dashboardDataRadarr">Total = {movieData.length}</p>
        ) : null}
      </div>
    );
    return dataOut;
  } catch (err) {
    return (
      <div className="dashboardDataRadarrContent">
        <p className="dashboardDataRadarr">{"" + err}</p>
      </div>
    );
  }
}

export async function radarrApi(apiKey, ip, port, config, key) {
  console.log("Sending api request to Radarr");
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
      <a key={key} href={`http://${ip}:${port}`}>
        <div className="dashboardBoxRadarr">
          <div className="dashboardBoxRadarrInfo">
            <div className="dashboardBoxRadarrIcon">
              <Image
                src={`https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/radarr.svg`}
                alt={`Radarr icon`}
                width={24}
                height={24}
                unoptimized
              />
            </div>
            <div className="dashboardBoxRadarrName">
              <p>Radarr</p>
            </div>
          </div>
          <Suspense fallback={<p className="loadingText">Loading...</p>}>
            {radarrData(apiKey, ip, port, config)}
          </Suspense>
        </div>
      </a>
    );
  } catch (err) {
    console.error(err);
    return (
      <div key={key} className="dashboardBoxRadarr">
        <div className="dashboardBoxRadarrInfo">
          <p>Radarr - Error!</p>
        </div>
        <div className="dashboardDataRadarrContent">
          <p className="dashboardDataRadarr">{"" + err}</p>
        </div>
      </div>
    );
  }
}
