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
          stats # Set stats as the type
        config: # All valid options
          cpu
          memory`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
