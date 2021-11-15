import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { getLayout } from "../../../../../common/layouts/NavFooterLayout";
import AddEditCourseForm from "../../../../../modules/courses/components/AddEditCourseForm";
import { getCourse } from "../../../../../modules/courses/redux/getters/main";

const EditCourse = () => {
  const router = useRouter();
  const { courseId, semesterId } = router.query;
  const course = useSelector((state) => getCourse(state, courseId))

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
        <h2 className="pb-3">Edit course</h2>
        <AddEditCourseForm courseToEdit={course} semesterId={semesterId}/>
    </div>
  );
};

EditCourse.getLayout = getLayout;

export default EditCourse;
