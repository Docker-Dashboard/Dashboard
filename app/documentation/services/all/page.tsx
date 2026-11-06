import Navigation from "@/app/documentation/components/navigation";
import TopBar from "@/app/components/dashboard";

export default function Page() {
  return (
    <div className="main">
      <TopBar />
      <div className="mainContent">
        <Navigation />
        <div className="smallerMainDocumentationPage">
          <p>list of all supported services:</p>
          <br></br>
          <p>GitHub releases</p>
          <p>Jellyfin</p>
          <p>Pi-Hole</p>
          <p>Radarr</p>
          <p>Seerr</p>
          <p>Sonarr</p>
        </div>
      </div>
    </div>
  );
}
