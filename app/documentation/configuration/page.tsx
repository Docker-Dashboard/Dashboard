import Navigation from "@/app/documentation/components/navigation";
import TopBar from "@/app/components/dashboard";

export default function Page() {
  return (
    <div className="main">
      <TopBar />
      <div className="mainContent">
        <Navigation />
        <div className="mainDocumentationPage">
          <p>This is what the configuration file looks like by default:</p>
          <div className="codeDiv">
            <pre>
              <code>
                {`config:
  configversion:
    1
apps:
  middle:
    - widget:
        type:
          welcome`}
              </code>
            </pre>
          </div>
          The config.configversion is what the code uses to know what version of the configuration file it is.
          <div className="codeDiv">
            <pre>
              <code>
                {`config:
  configversion:
    1`}
              </code>
            </pre>
          </div>
          <p>The apps block is where the widgets are defined.</p>
          <div className="codeDiv">
            <pre>
              <code>
                {`apps:
  middle:
    - widget:
        type:
          welcome`}
              </code>
            </pre>
          </div>
          <p>The middle block can be replaced with left or right and there can be multiple widgets in each section.</p>
          <p>Additional widgets can be added by adding more - widget blocks to the block sequence.</p>
          <div className="codeDiv">
            <pre>
              <code>
                {`apps:
  middle:
    - widget:
        type:
          welcome
    - widget:
        type:
          welcome
  right:
    - widget:
        type:
          welcome`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
