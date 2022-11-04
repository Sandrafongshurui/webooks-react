import { Outlet } from "react-router-dom";
import { SiteHeader } from "./Headers";
import { Footer } from "./Footer";

export const PublicOutlet = () => {
    return (
      <div>
        <SiteHeader /> 
        <Outlet />
        <Footer />
      </div>
    );
}

export const ProtectedOutlet = () => {
  return (
    <div>
 
      <Outlet />
      <Footer />
    </div>
  );
}
