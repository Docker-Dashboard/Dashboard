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
          pihole # Set pihole as the type
        apikey:
          "yourpiholepassword"
        ip:
          "127.0.0.1" # The ip your Pi-Hole instance is on
        port:
          "80"
        config: # All valid options
          total
          blocked
          forwarded
          cached
          clientsactive
          clientstotal`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
