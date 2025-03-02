import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";

import "../../Css/base/FrameWorkDash.css";
import "../../Css/component/SideBar.css";
import "../../Css/base/Dashboard.css";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page d-flex">
      <SideBar />
      <div className="content w-full">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}
