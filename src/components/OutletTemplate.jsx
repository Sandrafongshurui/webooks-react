import { Outlet } from "react-router-dom";
import { SiteHeader } from "./Headers";

export const OutletTemplate = () => {
    return (
      <div>
        <SiteHeader /> 
        <Outlet />
        {/* <Footer /> */}
      </div>
    );
}