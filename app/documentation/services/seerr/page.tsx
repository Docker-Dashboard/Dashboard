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
          seerr # Set seerr as the type
        apikey:
          "seersapikey"
        ip:
          "127.0.0.1" # The ip your Seerr instance is on
        port:
          "5055"
        config: # All valid options
          total
          movies
          series
          pending
          approved
          declined
          processing
          available
          completed`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
