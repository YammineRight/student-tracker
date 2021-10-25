import { getLayout } from "../common/layouts/NavFooterLayout";
import {
  UilCalculatorAlt,
  UilChartBar,
  UilRulerCombined,
  UilBullseye,
} from "@iconscout/react-unicons";

const Home = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center flex-column p-relative overflow-hidden"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <img
          src="/happy-usj.jpeg"
          alt="happy usj"
          style={{
            position: "absolute",
            minWidth: "100vw",
            maxHeight: "calc(100vh - 56px)",
            minHeight: "calc(100vh - 56px)",
            top: "0px",
            left: "0px",
            zIndex: "-1",
            opacity: 0.2,
          }}
        />
        <h1 className="text-center">Take Control Of Your Grades</h1>
        <p className="text-center">
          The only free app built by students to simplify grade tracking
        </p>
      </div>
      <div className="row mt-5 pt-5 pb-5 mb-5">
        <div className="col-12 col-md-6 col-lg-3 pb-4">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex flex-column align-items-center"
              style={{ maxWidth: "300px" }}
            >
              <UilCalculatorAlt height="100" width="100" className="pb-3"/>
              <h3 className="text-center">Auto Average Calculation</h3>
              <p className="text-center">
                Grades Tracker will automatically calculate your module average
                and your year average. You will always know exactly where you
                are.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 pb-4">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex flex-column align-items-center"
              style={{ maxWidth: "300px" }}
            >
              <UilBullseye height="100" width="100" className="pb-3"/>
              <h3 className="text-center">What do I need?</h3>
              <p className="text-center">
                {
                  "Once you've entered at least one assignment result, Grades Tracker will automatically calculate what % you need in your future assignments to get your target grade. Smart ay!"
                }
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 pb-4">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex flex-column align-items-center"
              style={{ maxWidth: "300px" }}
            >
              <UilRulerCombined height="100" width="100" className="pb-3"/>
              <h3 className="text-center">Tailored for you</h3>
              <p className="text-center">
                {
                  "Set up your own target grades, and track your grades in your own personal account."
                }
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 pb-4">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex flex-column align-items-center"
              style={{ maxWidth: "300px" }}
            >
              <UilChartBar height="100" width="100" className="pb-3"/>
              <h3 className="text-center">Grade Analytics</h3>
              <p className="text-center">
                {
                  "Useful analysis of your grades. E.g. Average grades for reports, essays, exams. Allowing you to focus on areas of development."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = getLayout;

export default Home;
