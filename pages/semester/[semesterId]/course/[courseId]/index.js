import { useRouter } from "next/dist/client/router";
import { getLayout } from "../../../../../common/layouts/NavFooterLayout";
import { useSelector } from "react-redux";
import DefaultErrorPage from "next/error";
import { getCourse } from "../../../../../modules/courses/redux/getters/main";

const CoursePage = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const course = useSelector((state) => getCourse(state, courseId))

  if (course) {
    return (
      <div className="pt-4">
        <div className="pb-3">
          <h6 className="d-inline">Course title:</h6>
          <h4 className="d-inline"> {course.title}</h4>
        </div>
        <div style={{ maxWidth: "max-content" }}>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>credits:</span>
            <span>{course.credits}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>description:</span>
            <span>{course?.description || "NA"}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>professor:</span>
            <span>{course?.professor || "NA"}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>link:</span>
            <span>{course?.link || "NA"}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span style={{ paddingRight: "10px" }}>notes:</span>
            <span>{course?.notes || "NA"}</span>
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

export default CoursePage;
