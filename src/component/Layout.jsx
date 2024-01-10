import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const showHeaderAndFooter = !location.pathname.includes("addmin");
  return (
    <>
      {showHeaderAndFooter && <Header />}
      <Outlet />
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

export default Layout;
