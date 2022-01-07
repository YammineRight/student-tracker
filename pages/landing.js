import { getLayout } from "../common/layouts/NavFooterLayout";
import {
  UilCalculatorAlt,
  UilChartBar,
  UilRulerCombined,
  UilBullseye,
} from "@iconscout/react-unicons";
import WebsiteLoader from "../common/loaders/WebsiteLoader";
import { useEffect, useState } from "react";
import { Api } from "../common/api";

const Home = () => {
  const [landingData, setLandingData] = useState({});
  const [features, setFeatures] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    try {
      Api.get("landing-data").then((response) => {
        const data = response.data;
        let dataToAdd = {};
        for (let c of data.landingData) {
          dataToAdd[c.key] = c.value;
        }
        setLandingData(() => dataToAdd);
        setFeatures(() => data.features);
        setTimeout( () => {
          document.getElementsByTagName("body")[0].style.overflowY = "overlay";
          setIsLoading(false);
        }, 5000)
      });
    } catch (e) {
      console.error(e);
      document.getElementsByTagName("body")[0].style.overflowY = "overlay";
      setIsLoading(false);
    }
  }, []);

  if (!isLoading) {
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center flex-column p-relative overflow-hidden"
          style={{ height: "calc(100vh - 56px)" }}
        >
          <img
            src={landingData.background_image}
            alt="happy usj"
            style={{
              position: "fixed",
              minWidth: "100vw",
              maxHeight: "100vh",
              minHeight: "100vh",
              top: "0px",
              left: "0px",
              right: "0px",
              zIndex: "-1",
              opacity: 0.2,
            }}
          />
          <h1 className="text-center title-primary fade-in">
            {landingData.page_header}
          </h1>
          <h5 className="text-center title-secondary fade-in">
            {landingData.page_subheader}
          </h5>
        </div>
        <div
          className="row m-3 pt-5 mb-5 bg-light"
          style={{
            borderRadius: "15px",
            paddingRight: "3rem",
            paddingLeft: "3rem",
          }}
        >
          <div className="col-12 col-md-6 col-lg-3 pb-5">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="d-flex flex-column align-items-center"
                style={{ maxWidth: "300px" }}
              >
                <UilCalculatorAlt
                  height="100"
                  width="100"
                  className="pb-3 animate-bounce-hover"
                />
                <h3 className="text-center">{features[0].title}</h3>
                <p className="text-center">{features[0].description}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 pb-5">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="d-flex flex-column align-items-center"
                style={{ maxWidth: "300px" }}
              >
                <UilBullseye
                  height="100"
                  width="100"
                  className="pb-3 animate-bounce-hover"
                />
                <h3 className="text-center">{features[1].title}</h3>
                <p className="text-center">{features[1].description}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 pb-5">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="d-flex flex-column align-items-center"
                style={{ maxWidth: "300px" }}
              >
                <UilRulerCombined
                  height="100"
                  width="100"
                  className="pb-3 animate-bounce-hover"
                />
                <h3 className="text-center">{features[2].title}</h3>
                <p className="text-center">{features[2].description}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 pb-5">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="d-flex flex-column align-items-center"
                style={{ maxWidth: "300px" }}
              >
                <UilChartBar
                  height="100"
                  width="100"
                  className="pb-3 animate-bounce-hover"
                />
                <h3 className="text-center">{features[3].title}</h3>
                <p className="text-center">{features[3].description}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <WebsiteLoader loading={isLoading} />
      </>
    );
  }
};

Home.getLayout = getLayout;

export default Home;
