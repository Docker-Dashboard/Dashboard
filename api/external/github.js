import Image from "next/image";
import { Suspense } from "react";

async function getGitHubReleases(apiKey, userAndRepo) {
  // console.log(userAndRepo);
  // return userAndRepo;
  let response;
  if (!apiKey) {
    response = await fetch(
      `https://api.github.com/repos/${userAndRepo}/releases/latest`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );
  } else {
    response = await fetch(
      `https://api.github.com/repos/${userAndRepo}/releases/latest`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/vnd.github+json",
        },
      },
    );
  }

  if (!response.ok && response.status != 404) {
    throw `Api response error ${response.status}`;
  }

  if (response.status == 404) {
    const out = {
      name: userAndRepo,
      version: "N/A",
      released: new Date(),
      url: `https://github.com/${userAndRepo}`,
    };
    return out;
  }

  const data = await response.json();

  // console.log("Repo: " + userAndRepo);
  const out = {
    name: userAndRepo,
    version: data.name,
    released: data.published_at,
    url: data.html_url,
  };

  // console.log("Version: " + data.name);
  // console.log("Released: " + data.published_at);
  // console.log("link: " + data.html_url);
  return out;
}

async function gitHubData(apiKey, config) {
  try {
    const releases = [];
    let key = 1;
    console.log(config);
    if (config) {
      const order = Object.keys(config);

      for (const app of order) {
        const userAndRepo = config[app];
        const data = await getGitHubReleases(apiKey, userAndRepo);
        key += 1;
        releases.push(data);
      }
    } else {
      return (
        <div className="dashboardDataGitHubContent">
          <p className="dashboardDataGitHub">No releases in config.yaml!</p>
        </div>
      );
    }
    // console.log("unsorted: ", releases);
    releases.sort((a, b) => Date.parse(b.released) - Date.parse(a.released));
    // console.log("Sorted: ", releases);

    const finalData = [];
    let returnKey = 1;

    for (let i = 0; i < releases.length; i++) {
      const currentRepo = releases[i];
      console.log(currentRepo);
      const releaseTime = new Date(currentRepo.released);
      const currentTime = new Date();
      const timeDifference = currentTime - releaseTime;
      const diffHours = Math.floor(timeDifference / (1000 * 60 * 60));
      const diffDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      // console.log(`${currentRepo.name}, ${diffDays} days ago`);
      // console.log(`${currentRepo.name}, ${diffHours} hours ago`);
      let timeSinceRelease = `${diffHours} hours ago`;
      if (diffHours > 23) {
        timeSinceRelease = `${diffDays} days ago`;
      }
      const dataReturn = (
        <div key={returnKey} className="dashboardDataGitHubReleases">
          <a className="dashboardDataGitHubReleases" href={currentRepo.url}>
            <p>{currentRepo.name}</p>
            {currentRepo.version} | {timeSinceRelease}
          </a>
        </div>
      );
      returnKey += 1;
      finalData.push(dataReturn);
    }

    // console.log(data);

    const dataOut = (
      <div className="dashboardDataGitHubContent">{finalData}</div>
    );
    return dataOut;
  } catch (err) {
    return (
      <div className="dashboardDataGitHubContent">
        <p className="dashboardDataGitHub">{"" + err}</p>
      </div>
    );
  }
}

export async function gitHubApi(apiKey, tiles, config, key) {
  console.log("Sending api request to GitHub");
  try {
    if (!tiles || !config || !key) {
      console.log("invalid input data");
      console.log(!tiles);
      console.log(!config);
      console.log(!key);
      return;
    }
    return (
      <div key={key} className={`dashboardBoxGitHub${tiles}`}>
        <div className="dashboardBoxGitHubInfo">
          <div className="dashboardBoxGitHubIcon">
            <Image
              src={`https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/github.svg`}
              alt={`GitHub icon`}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="dashboardBoxGitHubName">
            <p>GitHub</p>
          </div>
        </div>
        <Suspense>{gitHubData(apiKey, config)}</Suspense>
      </div>
    );
  } catch (err) {
    return (
      <div key={key} className={`dashboardBoxGithub${tiles}`}>
        <div className="dashboardBoxGitHubInfo">
          <p>GitHub - Error!</p>
        </div>
        <div className="dashboardDataGitHubContent">
          <p className="dashboardDataGitHub">{"" + err}</p>
        </div>
      </div>
    );
  }
}
