import { getLayout } from "../../../../../../../common/layouts/NavFooterLayout";
import AddEditExam from "../../../../../../../modules/courses/components/AddEditExam";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { getCourse, getExam } from "../../../../../../../modules/courses/redux/getters/main";

const EditExam = () => {
  const router = useRouter();
  const { courseId, examId } = router.query;
  const exam = useSelector((state) => getExam(state, examId))

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
        <h2 className="pb-3">Edit Exam {exam?.name}</h2>
        <AddEditExam courseId={courseId} examToEdit={exam} />
    </div>
  );
};

EditExam.getLayout = getLayout;

export default EditExam;
