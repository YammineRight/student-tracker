import { useRouter } from "next/dist/client/router";
import { courses } from "../../modules/courses/constants";
import { getLayout } from "../../common/layouts/NavFooterLayout";
import { connect } from "react-redux";

const CoursePage = ({ courses }) => {
  const router = useRouter();
  const { courseId } = router.query;

  if (courses[courseId]) {
    return (
      <div className="pt-4">
        <h4>Course title: {courses[courseId].title}</h4>
        <p>description: {courses[courseId].description}</p>
      </div>
    );
  }

  return <></>;
};

CoursePage.getLayout = getLayout;

const mapStateToProps = (state) => {
  return { courses: state.main.courses };
};

export default connect(mapStateToProps)(CoursePage);
