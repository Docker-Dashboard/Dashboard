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
          radarr # Set radarr as the type
        apikey:
          "radarrapikey"
        ip:
          "127.0.0.1" # The ip your Radarr instance is on
        port:
          "7878"
        config: # All valid options
          missing
          queue
          count
          total`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
