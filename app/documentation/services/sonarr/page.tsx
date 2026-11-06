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
          sonarr # Set sonarr as the type
        apikey:
          "sonarrapikey"
        ip:
          "127.0.0.1" # The ip your Sonarr instance is on
        port:
          "8989"
        config: # All valid options
          missing
          queue
          total`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
