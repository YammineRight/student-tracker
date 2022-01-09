import { useEffect, useState } from "react";
import { getLayout } from "../common/layouts/NavFooterLayout";
import WebsiteLoader from "../common/loaders/WebsiteLoader";
import { Api } from "../common/api";
import styles from "../styles/Admin.module.css";
import { UilPen, UilSave } from "@iconscout/react-unicons";
import { TextField } from "@material-ui/core";

const Admin = () => {
  const [landingData, setLandingData] = useState({
    background_image: "",
    page_header: "",
    page_subheader: "",
    page_title: "",
  });
  const [features, setFeatures] = useState([
    {
      title: "",
      description: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingLandingData, setIsEditingLandingData] = useState({
    status: false,
    key: "",
  });
  const [isEditingFeatures, setIsEditingFeatures] = useState({
    status: false,
    key: "",
  });
  const submitLandingDataChanges = (id) => {
    Api.post("update-landing-data", {
      key: id,
      value: landingData[id],
    });
    setIsEditingLandingData({
      status: false,
      key: "",
    });
  };

  const submitEditFeaturesChanges = (id) => {
    console.log({
      featureId: features[id]._id,
      title: features[id].title,
      description: features[id].description,
    });
    Api.post("update-features", {
      featureId: features[id]._id,
      title: features[id].title,
      description: features[id].description,
    });
    setIsEditingFeatures({
      status: false,
      key: "",
    });
  };

  const handleChange = ({ target: field }) => {
    const { name, value } = field;
    setLandingData((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleFeatures = ({ target: field }, id) => {
    const { name, value } = field;
    console.log(name);
    setFeatures((oldState) => ({
      ...oldState,
      [id]: {
        ...oldState[id],
        [name]: value,
      },
    }));
  };

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
        document.getElementsByTagName("body")[0].style.overflowY = "overlay";
        setIsLoading(false);
      });
    } catch (e) {
      console.error(e);
      document.getElementsByTagName("body")[0].style.overflowY = "overlay";
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <WebsiteLoader loading={isLoading} />;
  } else {
    return (
      <>
        <div
          className="container"
          style={{
            marginTop: "36px",
            marginBottom: "16px",
          }}
        >
          <div className="row">
            <h1 className={"col"}>Landing Data</h1>
          </div>
          <table
            className="table"
            style={{
              height: "fit-content",
            }}
          >
            <thead>
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Value</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(landingData).map((id) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    {isEditingLandingData.status == true &&
                    isEditingLandingData.key == id ? (
                      <TextField
                        error={false}
                        name={id}
                        helperText=""
                        value={landingData[id]}
                        onChange={handleChange}
                        variant="standard"
                        className="w-100 pb-2"
                      />
                    ) : (
                      <span>{landingData[id]}</span>
                    )}
                  </td>
                  <td>
                    <span
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isEditingLandingData.status == true &&
                      isEditingLandingData.key == id ? (
                        <UilSave
                          className={styles.action}
                          onClick={() => {
                            submitLandingDataChanges(id);
                          }}
                        />
                      ) : (
                        <UilPen
                          onClick={() => {
                            setIsEditingLandingData({
                              status: !isEditingLandingData.status,
                              key: isEditingLandingData.key == id ? "" : id,
                            });
                          }}
                          className={styles.action}
                        />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <h1
              className="col"
              style={{
                marginTop: "36px",
              }}
            >
              Features
            </h1>
          </div>
          <table
            className="table"
            style={{
              height: "fit-content",
            }}
          >
            <thead>
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Value</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(features).map((id) => (
              <tr key={id}>
                  <td>
                    {isEditingFeatures.status == true &&
                    isEditingFeatures.key == id ? (
                      <TextField
                        error={false}
                        name="title"
                        helperText=""
                        value={features[id].title}
                        onChange={(e) => handleFeatures(e, id)}
                        variant="standard"
                        className="w-100 pb-2"
                      />
                    ) : (
                      <span>{features[id].title}</span>
                    )}
                  </td>
                  <td>
                    {isEditingFeatures.status == true &&
                    isEditingFeatures.key == id ? (
                      <TextField
                        error={false}
                        name="description"
                        helperText=""
                        value={features[id].description}
                        onChange={(e) => handleFeatures(e, id)}
                        variant="standard"
                        className="w-100 pb-2"
                      />
                    ) : (
                      <span>{features[id].description}</span>
                    )}
                  </td>
                  <td className={styles.action}>
                    <span
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isEditingFeatures.status == true &&
                      isEditingFeatures.key == id ? (
                        <UilSave
                          className={styles.action}
                          onClick={() => {
                            submitEditFeaturesChanges(id);
                          }}
                        />
                      ) : (
                        <UilPen
                          onClick={() => {
                            setIsEditingFeatures({
                              status: !isEditingFeatures.status,
                              key: isEditingFeatures.key == id ? "" : id,
                            });
                          }}
                          className={styles.action}
                        />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

Admin.getLayout = getLayout;
export default Admin;
