import Footer from "../components/Footer";
import AuthenticationWrapper from "../../modules/user/components/AuthenticationWrapper";
import NavbarCustom from "../components/Navbar";

const NavFooterLayout = ({ children }) => {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <AuthenticationWrapper>
        <NavbarCustom />
        <div
          className="container d-flex flex-column"
          style={{ minHeight: "100vh", paddingTop: "56px" }}
        >
          {children}
        </div>
        <Footer />
      </AuthenticationWrapper>
    </div>
  );
};

export const getLayout = (page) => <NavFooterLayout>{page}</NavFooterLayout>;
