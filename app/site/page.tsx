import { Suspense } from "react";
import { unstable_noStore } from "next/cache";
import { readFile, writeFile, mkdir, access, constants } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import TopBar from "@/app/components/dashboard"
import { gitHubApi } from "@/app/site/components/github";
import { jellyApi } from "@/app/site/components/jellyfin";
import { radarrApi } from "@/app/site/components/radarr";
import { piholeApi } from "@/app/site/components/pihole";
import { seerrApi } from "@/app/site/components/seerr";
import { sonarrApi } from "@/app/site/components/sonarr";
import { welcome } from "@/app/site/components/welcome";
import { stats } from "@/app/site/components/stats";

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
          welcome`;

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
      throw new Error((err as Error).message);
    }

    const data = await readFile(configFile, "utf-8");

    const leftData: any = [];
    const middleData: any = [];
    const rightData: any = [];

    // console.log(data);
    const yamlData = parse(data);
    if (!yamlData) {
      console.error("No config found!")
      throw new Error("No config found!") 
    }

    const map: Record<string, (config: any, key: number) => Promise<any>> = {
      welcome: async (key: number) => {
        return await welcome(key);
      },
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
    if (yamlData.config.configversion <= 0) {
      console.error("Please enter a valid configuration version.")
      throw new Error("Invalid config version")
    } else if (yamlData?.config?.configversion == 1) {
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
    } else {
      console.error("No compatible config version found!")
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
      <TopBar />
      {/* <p>Loading</p> */}
      {/* <div className="data">{dashboardData}</div> */}
      <Suspense fallback={<p className="loadingText">Loading...</p>}>
        {run()}
      </Suspense>
    </div>
  );
}
