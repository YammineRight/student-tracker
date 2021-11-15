import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { getLayout } from "../../../common/layouts/NavFooterLayout";
import AddEditSemesterForm from "../../../modules/courses/components/AddEditSemester";
import { getSemester } from "../../../modules/courses/redux/getters/main";

const EditSemester = () => {
  const router = useRouter();
  const { semesterId } = router.query;
  const semester = useSelector((state) => getSemester(state, semesterId))

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
        <h2 className="pb-3">Edit Semester</h2>
        <AddEditSemesterForm semesterToEdit={semester}/>
    </div>
  );
};

EditSemester.getLayout = getLayout;

export default EditSemester;
