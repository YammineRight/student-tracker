import Footer from "../components/Footer";
import NavbarCustom from "../components/Navbar";

const NavFooterLayout = ({ children }) => {
  return (
    <>
      <NavbarCustom />
      <div className="container d-flex flex-column" style={{minHeight: "calc(100vh - 56px)", position: "relative", overflow: "hidden"}}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export const getLayout = (page) => <NavFooterLayout>{page}</NavFooterLayout>;
