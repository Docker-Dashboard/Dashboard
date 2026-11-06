import Navigation from "@/app/documentation/components/navigation";
import TopBar from "@/app/components/dashboard";

export default function Page() {
  return (
    <div className="main">
      <TopBar />
      <div className="mainContent">
        <Navigation />
        <div className="mainDocumentationPage">
          <div className="codeDiv">
            <pre>
              <code>
                {`    - widget:
        type:
          jellyfin # Set jellyfin as the type
        apikey:
          "jellyfinapikey"
        ip:
          "127.0.0.1" # The ip your Jellyfin instance is on
        port:
          "8096"
        config: # All valid options
          movies
          series
          episodes
          artists
          programs
          trailers
          songs
          albums
          musicvideos
          boxsets
          books
          items`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
