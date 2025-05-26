import SideBar from "../SideBar/SideBar";
 
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <div>
      <div className="d-flex ">
        <SideBar />
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
