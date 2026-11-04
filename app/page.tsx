import React, { JSX, Suspense } from "react";
import Image from "next/image";
import { unstable_noStore } from "next/cache";
import { readFile, writeFile, mkdir, access, constants } from "node:fs/promises";
import { dirname, join } from "node:path";
import os from "node:os";
import { parse } from "yaml";
import { gitHubApi } from "@/api/external/github.js";
import { jellyApi } from "@/api/services/jellyfin.js";
import { radarrApi } from "@/api/services/radarr.js";
import { piholeApi } from "@/api/services/pihole.js";
import { seerrApi } from "@/api/services/seerr.js";
import { sonarrApi } from "@/api/services/sonarr.js";
import { stats } from "@/api/system/stats.js"

export const dynamic = "force-dynamic";
export const revalidate = 0;

let dashboardData = <></>;

const defaultConfigContent = `config:
  configversion:
    1
apps:
  middle:
    - widget:
        type:
          jellyfin
        ip:
          "127.0.0.1"
        port:
          "8096"
        apikey:
          "abcd"
        config:
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

async function makeConfig() {
  await mkdir(configDir, { recursive: true });
  await writeFile(configFile, defaultConfigContent);
}

async function run() {
  try {
    try{
      await access(configFile, constants.F_OK,);
    } catch (err) {
      console.log(`${configFile} does not exist`);
      await makeConfig();
    }

    try{
      await access(configFile, constants.R_OK,);
    } catch (err) {
      console.log(`${configFile} is not readable`);
      throw (err);
    }

    const data = await readFile(configFile, "utf-8");

    const leftData: any = [];
    const middleData: any = [];
    const rightData: any = [];

    // console.log(data);
    const yamlData = parse(data);

    const map: Record<string, (config: any, key: number) => Promise<any>> = {
      jellyfin: async (config: any, key: number) => {
        return await jellyApi(
          config?.apikey,
          config?.ip,
          config?.port,
          config?.config,
          key,
        );
      },
      seerr: async (config: any, key: number) => {
        return await seerrApi(
          config?.apikey,
          config?.ip,
          config?.port,
          config?.config,
          key,
        );
      },
      radarr: async (config: any, key: number) => {
        return await radarrApi(
          config?.apikey,
          config?.ip,
          config?.port,
          config?.config,
          key,
        );
      },
      sonarr: async (config: any, key: number) => {
        return await sonarrApi(
          config?.apikey,
          config?.ip,
          config?.port,
          config?.config,
          key,
        );
      },
      pihole: async (config: any, key: number) => {
        return await piholeApi(
          config?.apikey,
          config?.ip,
          config?.port,
          config?.config,
          key,
        );
      },
      github: async (config: any, key: number) => {
        return await gitHubApi(config?.apikey, config?.config, key);
      },
      stats: async (config: any, key: number) => {
        return await stats(config?.config, key);
      },
    };
    if (yamlData?.config?.configversion == 1) {
      // console.log(yamlData.apps.left)
      if (yamlData.apps.left) {
        const order = Object.keys(yamlData.apps.left);
        let leftKey = 1;

        for (const item of order) {
          const config = yamlData.apps.left[item].widget;
          const app = config.type;
          if (typeof map[app] == "function" && config) {
            const data = await map[app](config, leftKey);
            leftKey += 1;
            leftData.push(data);
          } else {
            console.warn(
              `Could not find valid app, this could be caused by the app not yet supporting this service or a typo!`,
            );
          }
        }
      }
      // console.log(yamlData.apps.middle)
      if (yamlData.apps.middle) {
        const order = Object.keys(yamlData.apps.middle);
        let middleKey = 1;

        for (const item of order) {
          const config = yamlData.apps.middle[item].widget;
          // console.log(config);
          const app = config.type;
          if (typeof map[app] == "function" && config) {
            const data = await map[app](config, middleKey);
            middleKey += 1;
            middleData.push(data);
          } else {
            console.warn(
              `Could not find valid app, this could be caused by the app not yet supporting this service or a typo!`,
            );
          }
        }
      }
      if (yamlData.apps.right) {
        const order = Object.keys(yamlData.apps.right);
        let rightKey = 1;

        for (const item of order) {
          const config = yamlData.apps.right[item].widget;
          const app = config.type;

          if (typeof map[app] == "function" && config) {
            const data = await map[app](config, rightKey);
            rightKey += 1;
            rightData.push(data);
          } else {
            console.warn(
              `Could not find valid app, this could be caused by the app not yet supporting this service or a typo!`,
            );
          }
        }
      }
    }

    dashboardData = (
      <div className="dashboardBoxMain">
        <div className="dashboardBoxMainLeft">{leftData}</div>
        <div className="dashboardBoxMainMiddle">{middleData}</div>
        <div className="dashboardBoxMainRight">{rightData}</div>
      </div>
    );
    return dashboardData;
  } catch (err) {
    return <div className="error">{"" + err}</div>;
  }
}

export default async function Home() {
  unstable_noStore();
  return (
    <div className="main">
      <div className="dashboardInfo">
        <p className="dashboardInfoName">Dashboard | Version: 1.0.0</p>
      </div>
      {/* <p>Loading</p> */}
      {/* <div className="data">{dashboardData}</div> */}
      <Suspense fallback={<p className="loadingText">Loading...</p>}>
        {run()}
      </Suspense>
    </div>
  );
}
