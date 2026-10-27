import React, { JSX } from "react";
import Image from "next/image";
import { unstable_noStore } from "next/cache";
import { access, constants, writeFile, mkdir } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import os from "node:os";
import { parse } from "yaml";
import { jellyApi } from "@/api/services/jellyfin.js";
import { seerrApi } from "@/api/services/seerr.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

let dashboardData = <></>;

const defaultConfigContent = `config:
  tiles:
    2
  jellyfin:
    ip:
      "127.0.0.1"
    port:
      "8096"
    apikey:
      1234
    tiles:
      movies
      series
      episodes
      songs`;

const configFile =
  process.env.NODE_ENV == "production"
    ? "/config/config.yaml"
    : join(process.cwd(), "config", "config.yaml");

const configDir =
  process.env.NODE_ENV == "production"
    ? "/config"
    : join(process.cwd(), "config");

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

async function run() {
  const data = await readFile(configFile, "utf-8");

  const finalData = [];

  // console.log(data);
  const yamlData = parse(data);

  const tiles = yamlData.config?.tiles;
  const map: Record<string, (config: any, key: number) => Promise<any>> = {
    jellyfin: async (config: any, key: number) => {
      return await jellyApi(
        config?.apikey,
        config?.ip,
        config?.port,
        tiles,
        config?.config,
        key,
      );
    },
    seerr: async (config: any, key: number) => {
      return await seerrApi(
        config?.apikey,
        config?.ip,
        config?.port,
        tiles,
        config?.config,
        key,
      );
    },
  };
  let key = 0;
  if (yamlData.apps) {
    const order = Object.keys(yamlData.apps);

    for (const app of order) {
      const config = yamlData.apps[app];
      if (typeof map[app] == "function" && config) {
        const data = await map[app](config, key);
        key += 1;
        finalData.push(data);
      } else {
        console.warn(
          "Could not find valid app, this could be caused by the app not yet supporting this service or a typo!",
        );
      }
    }
  }

  dashboardData = <div className="dashboardBoxMain">{finalData}</div>;
}

export default async function Home() {
  unstable_noStore();
  await run();
  return (
    <div className="main">
      <p>test</p>
      <div className="data">{dashboardData}</div>
    </div>
  );
}
