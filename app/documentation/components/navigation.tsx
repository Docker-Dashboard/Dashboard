export default function Navigation() {
  return (
    <div className="navBar">
      <div className="navBarContent">
        <a href="/site">Home</a>
        <a href="/documentation">Documentation</a>
        <a href="/documentation/configuration">Configuration</a>
        <br>
        </br>
        <a href="/documentation/services/all">Services</a>
        <div className="navBarServices">
          <a href="/documentation/services/github/releases">Github</a>
          <a href="/documentation/services/jellyfin">Jellyfin</a>
          <a href="/documentation/services/pihole">Pi-Hole</a>
          <a href="/documentation/services/radarr">Radarr</a>
          <a href="/documentation/services/seerr">Seerr</a>
          <a href="/documentation/services/sonarr">Sonarr</a>
          <a href="/documentation/services/stats">System Stats</a>
        </div>
      </div>
    </div>
  )
}