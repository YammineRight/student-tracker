import { getLayout } from "../common/layouts/NavFooterLayout";
import { UilCalculatorAlt } from "@iconscout/react-unicons";

const Home = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <h1 className="text-center">Take Control Of Your Grades</h1>
        <p className="text-center">
          The only free app built by students to simplify grade tracking
        </p>
      </div>
      <div>
        <h6><UilCalculatorAlt /> Auto Average Calculation</h6>
        ...
      </div>
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
