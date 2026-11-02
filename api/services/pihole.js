import Image from "next/image";
import { Suspense } from "react";

async function piholeData(apiKey, ip, port, config) {
  try {
    const sessionRaw = await fetch(`http://${ip}:${port}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ password: apiKey }),
    });

    if (!sessionRaw.ok) {
      throw `Api response error ${sessionRaw.status}`;
    }

    const sessionData = await sessionRaw.json();
    const session = sessionData.session.sid;

    // console.log(sessionData);

    const response = await fetch(`http://${ip}:${port}/api/stats/summary`, {
      method: "GET",
      headers: {
        "X-FTL-SID": session,
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

    await fetch(`http://${ip}:${port}/api/auth?sid=${session}`, {
      method: "DELETE",
      headers: {
        "X-FTL-SID": session,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const total = config.includes("total");
    const blocked = config.includes("blocked");
    const forwarded = config.includes("forwarded");
    const cached = config.includes("cached");
    const clientsActive = config.includes("clientsactive");
    const clientsTotal = config.includes("clientstotal");

    const dataOut = (
      <div className="dashboardDataPiHoleContent">
        {total ? (
          <p className="dashboardDataPiHole">Total = {data.queries.total}</p>
        ) : null}
        {blocked ? (
          <p className="dashboardDataPiHole">
            Blocked = {data.queries.blocked}
          </p>
        ) : null}
        {forwarded ? (
          <p className="dashboardDataPiHole">
            Forwarded = {data.queries.forwarded}
          </p>
        ) : null}
        {cached ? (
          <p className="dashboardDataPiHole">cached = {data.queries.cached}</p>
        ) : null}
        {clientsActive ? (
          <p className="dashboardDataPiHole">
            Active Clients = {data.clients.active}
          </p>
        ) : null}
        {clientsTotal ? (
          <p className="dashboardDataPiHole">
            Total Clients = {data.clients.total}
          </p>
        ) : null}
      </div>
    );
    // console.log("Array Content: ", content);
    // console.log("Sending back: ", dataOut);
    return dataOut;
  } catch (err) {
    return (
      <div className="dashboardDataPiHoleContent">
        <p className="dashboardDataPiHole">{"" + err}</p>
      </div>
    );
  }
}

export async function piholeApi(apiKey, ip, port, config, key) {
  console.log("Sending api request to PiHole");
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
      <a key={key} href={`http://${ip}:${port}/admin`}>
        <div className="dashboardBoxPiHole">
          <div className="dashboardBoxPiHoleInfo">
            <div className="dashboardBoxPiHoleIcon">
              <Image
                src={`https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/pi-hole.svg`}
                alt={`PiHole icon`}
                width={24}
                height={24}
                unoptimized
              />
            </div>
            <div className="dashboardBoxPiHoleName">
              <p>PiHole</p>
            </div>
          </div>
          <Suspense fallback={<p className="loadingText">Loading...</p>}>
            {piholeData(apiKey, ip, port, config)}
          </Suspense>
        </div>
      </a>
    );
  } catch (err) {
    console.error(err);
    return (
      <div key={key} className="dashboardBoxPiHole">
        <div className="dashboardBoxPiHoleName">
          <p>PiHole - Error!</p>
        </div>
        <div className="dashboardDataPiHoleContent">
          <p className="dashboardDataPiHole">{"" + err}</p>
        </div>
      </div>
    );
  }
}
