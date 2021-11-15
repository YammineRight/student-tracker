import { getLayout } from "../../../../../../common/layouts/NavFooterLayout";
import AddEditExam from "../../../../../../modules/courses/components/AddEditExam";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { getCourse } from "../../../../../../modules/courses/redux/getters/main";

const AddExam = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const course = useSelector((state) => getCourse(state, courseId))

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
        <h2 className="pb-3">Add Exam to {course.title}</h2>
        <AddEditExam courseId={courseId}/>
    </div>
  );
};

AddExam.getLayout = getLayout;

export default AddExam;
