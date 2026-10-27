import Image from "next/image";

export async function jellyApi(apiKey, ip, port, tiles, config, key) {
  console.log("Sending api request to Jellyfin");
  try {
    if (!apiKey) {
      return;
    }
    const response = await fetch(`http://${ip}:${port}/Items/Counts`, {
      method: "GET",
      headers: {
        Authorization: `MediaBrowser Token="${apiKey}"`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // console.log("Raw server data: ", response);
    const data = await response.json();

    // console.log(data);

    const movies = config.includes("movies");
    const series = config.includes("series");
    const episodes = config.includes("episodes");
    const artists = config.includes("artists");
    const programs = config.includes("programs");
    const trailers = config.includes("trailers");
    const songs = config.includes("songs");
    const albums = config.includes("albums");
    const musicVideos = config.includes("musicvideos");
    const boxSets = config.includes("boxsets");
    const books = config.includes("books");
    const items = config.includes("items");

    const dataOut = (
      <div key={key} className={`dashboardBoxJellyfin${tiles}`}>
        <div className="dashboardBoxJellyfinInfo">
          <div className="dashboardBoxJellyfinIcon">
            <Image
              src={`https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/jellyfin.svg`}
              alt={`Jellyfin icon`}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="dashboardBoxJellyfinName">
            <p>Jellyfin</p>
          </div>
        </div>
        <div className="dashboardDataJellyfinContent">
          {movies ? (
            <p className="dashboardDataJellyfin">Movies = {data.MovieCount}</p>
          ) : null}
          {series ? (
            <p className="dashboardDataJellyfin">Series = {data.SeriesCount}</p>
          ) : null}
          {episodes ? (
            <p className="dashboardDataJellyfin">
              Episodes = {data.EpisodeCount}
            </p>
          ) : null}
          {artists ? (
            <p className="dashboardDataJellyfin">
              Artists = {data.ArtistCount}
            </p>
          ) : null}
          {programs ? (
            <p className="dashboardDataJellyfin">
              Programs = {data.ProgramCount}
            </p>
          ) : null}
          {trailers ? (
            <p className="dashboardDataJellyfin">
              Trailers = {data.TrailerCount}
            </p>
          ) : null}
          {songs ? (
            <p className="dashboardDataJellyfin">Songs = {data.SongCount}</p>
          ) : null}
          {albums ? (
            <p className="dashboardDataJellyfin">Albums = {data.AlbumCount}</p>
          ) : null}
          {musicVideos ? (
            <p className="dashboardDataJellyfin">
              Music Videos = {data.MusicVideoCount}
            </p>
          ) : null}
          {boxSets ? (
            <p className="dashboardDataJellyfin">
              Box Sets = {data.BoxSetCount}
            </p>
          ) : null}
          {books ? (
            <p className="dashboardDataJellyfin">Books = {data.BookCount}</p>
          ) : null}
          {items ? (
            <p className="dashboardDataJellyfin">Items = {data.ItemCount}</p>
          ) : null}
        </div>
      </div>
    );
    // console.log("Array Content: ", content);
    // console.log("Sending back: ", dataOut);
    return dataOut;
  } catch (err) {
    console.error(err);
    return (
      <div key={key} className={`dashboardBoxJellyfin${tiles}`}>
        <div className="dashboardBoxJellyfinName">
          <p>Jellyfin - Error!</p>
        </div>
        <div className="dashboardDataJellyfinContent">
          <p className="dashboardDataJellyfin">{"" + err}</p>
        </div>
      </div>
    );
  }
}
