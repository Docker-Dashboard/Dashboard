import React from "react";
import Image from "next/image";
import { access, constants, readFile, writeFile, mkdir } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import os from "node:os";
import { parse } from "yaml";

export const dynamic = "force-dynamic";

let dashboardData = <></>;

const defaultConfigContent = `config:
  tiles:
    2
  jellyfin:
    apikey:
      1234`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let configFile = join(__dirname, "config", "config.yaml");
let configDir = join(__dirname, "config");

if (process.env.NODE_ENV == "production") {
  configFile = "/config/config.yaml";
}

access(configFile, constants.F_OK, (err) => {
  console.log(`${configFile} ${err ? "does not exist" : "exists"}`);
  const fileExists = err ? 0 : 1;
  if (fileExists == 0) {
    mkdir(configDir, { recursive: true }, (err) => {
      if (err) throw err;
    });
    writeFile(configFile, defaultConfigContent, (err) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log("Default config file written successfully");
      }
    });
  }
});

access(configFile, constants.R_OK, (err) => {
  console.log(`${configFile} ${err ? "is not readable" : "is readable"}`);
  dashboardData = <p>Error: Could not read config file</p>;
});

readFile(configFile, (err, rawData) => {
  if (err) throw err;
  const data = rawData + "";
  // console.log(rawData);
  console.log(data);
  const yamlData = parse(data);

  // dashboardData = (
  //   <div>
  //     <p>{data}</p>
  //     {/* <p>{data}</p> */}
  //   </div>
  // );
});

try {
  const response = await fetch("http://localhost:8096/Items/Counts", {
    method: "GET",
    headers: {
      Authorization: `MediaBrowser Token="${API_KEY}"`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();

  console.log(data);
  dashboardData = (
    <div>
      <p>Movies = {data.MovieCount}</p>
      <p>Series = {data.SeriesCount}</p>
      <p>Episodes = {data.EpisodeCount}</p>
      <p>Songs = {data.SongCount}</p>
    </div>
  );
} catch (err) {
  console.error(err);
}

export default function Home() {
  return (
    <div>
      <p>test</p>
      {dashboardData}
    </div>
  );
}
