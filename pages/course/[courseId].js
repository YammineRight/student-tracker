import { useRouter } from "next/dist/client/router";
import { getLayout } from "../../common/layouts/NavFooterLayout";
import { connect } from "react-redux";
import DefaultErrorPage from "next/error";

const CoursePage = ({ courses }) => {
  const router = useRouter();
  const { courseId } = router.query;

  if (courses[courseId]) {
    return (
      <div className="pt-4">
        <div className="pb-3">
          <h6 className="d-inline">Course title:</h6>
          <h4 className="d-inline"> {courses[courseId].title}</h4>
        </div>
        <div style={{ maxWidth: "max-content" }}>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>credits:</span>
            <span>{courses[courseId].credits}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>description:</span>
            <span>{courses[courseId]?.description || "NA"}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>professor:</span>
            <span>{courses[courseId]?.professor || "NA"}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>link:</span>
            <span>{courses[courseId]?.link || "NA"}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>notes:</span>
            <span>{courses[courseId]?.notes || "NA"}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <DefaultErrorPage statusCode={404} title="This course does not exist" />
  );
};

CoursePage.getLayout = getLayout;

const mapStateToProps = (state) => {
  return { courses: state.main.courses };
};

export default connect(mapStateToProps)(CoursePage);
