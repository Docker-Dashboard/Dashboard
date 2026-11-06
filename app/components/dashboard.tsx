import { version } from "@/package.json";

export default function TopBar() {
  return (
    <div className="dashboardInfo">
      <p className="dashboardInfoName">Dashboard | Version: {version}</p>
    </div>
  );
}
