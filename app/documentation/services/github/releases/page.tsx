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
          github # Set github as the type
        apikey:
          "github_pat_somevalue" # Optional, increases GitHub api limit
        config: # Put the repos that you want to monitor here!
          - docker-dashboard/dashboard
          - jellyfin/jellyfin`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
