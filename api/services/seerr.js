import Image from "next/image";
import { Suspense } from "react";

async function seerrData(apiKey, ip, port, config) {
  try {
    const response = await fetch(`http://${ip}:${port}/api/v1/request/count`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw `Api response error ${response.status}`;
    }

    // console.log("Raw server data: ", response);
    const data = await response.json();

    // console.log(data);

    const total = config.includes("total");
    const movies = config.includes("movies");
    const series = config.includes("series");
    const pending = config.includes("pending");
    const approved = config.includes("approved");
    const declined = config.includes("declined");
    const processing = config.includes("processing");
    const available = config.includes("available");
    const completed = config.includes("completed");

    const dataOut = (
      <div className="dashboardDataSeerrContent">
        {total ? (
          <p className="dashboardDataSeerr">Total = {data.total}</p>
        ) : null}
        {movies ? (
          <p className="dashboardDataSeerr">Movies = {data.movie}</p>
        ) : null}
        {series ? (
          <p className="dashboardDataSeerr">Series = {data.tv}</p>
        ) : null}
        {pending ? (
          <p className="dashboardDataSeerr">Pending = {data.pending}</p>
        ) : null}
        {approved ? (
          <p className="dashboardDataSeerr">Approved = {data.approved}</p>
        ) : null}
        {declined ? (
          <p className="dashboardDataSeerr">Declined = {data.declined}</p>
        ) : null}
        {processing ? (
          <p className="dashboardDataSeerr">Processing = {data.processing}</p>
        ) : null}
        {available ? (
          <p className="dashboardDataSeerr">Available = {data.available}</p>
        ) : null}
        {completed ? (
          <p className="dashboardDataSeerr">Completed = {data.completed}</p>
        ) : null}
      </div>
    );
    return dataOut;
  } catch (err) {
    return (
      <div className="dashboardDataSeerrContent">
        <p className="dashboardDataSeerr">{"" + err}</p>
      </div>
    );
  }
}

export async function seerrApi(apiKey, ip, port, tiles, config, key) {
  console.log("Sending api request to Seerr");
  try {
    if (!apiKey || !ip || !port || !tiles || !config || !key) {
      console.log("invalid input data");
      console.log(!apiKey);
      console.log(!ip);
      console.log(!port);
      console.log(!tiles);
      console.log(!config);
      console.log(!key);
      return;
    }
    return (
      <div key={key} className={`dashboardBoxSeerr${tiles}`}>
        <div className="dashboardBoxSeerrInfo">
          <div className="dashboardBoxSeerrIcon">
            <Image
              src={`https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/seerr.svg`}
              alt={`Seerr icon`}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="dashboardBoxSeerrName">
            <p>Seerr</p>
          </div>
        </div>
        <Suspense>{seerrData(apiKey, ip, port, config)}</Suspense>
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <div key={key} className={`dashboardBoxSeerr${tiles}`}>
        <div className="dashboardBoxSeerrInfo">
          <p>Seerr - Error!</p>
        </div>
        <div className="dashboardDataSeerrContent">
          <p className="dashboardDataSeerr">{"" + err}</p>
        </div>
      </div>
    );
  }
}
