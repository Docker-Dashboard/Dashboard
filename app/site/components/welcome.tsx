export async function welcome(key: number) {
  return (
    <div key={key} className="dashboardBoxWelcome">
      <div className="dashboardBoxWelcomeInfo">
        <div className="dashboardBoxWelcomeName">
          <p>Welcome!</p>
        </div>
      </div>
      <div className="dashboardDataWelcomeContent">
        <p className="dashboardDataWelcome">
          Thank you for checking out Docker Dashboard!
        </p>
        <p className="dashboardDataWelcome">
          Please check out the documentation at{" "}
          <a href="/documentation" className="dashboardDataWelcome">
            /documentation
          </a>
          !
        </p>
      </div>
    </div>
  );
}
