import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { getLayout } from "../../../../common/layouts/NavFooterLayout";
import AddEditCourseForm from "../../../../modules/courses/components/AddEditCourseForm";
import { getSemester } from "../../../../modules/courses/redux/getters/main";

const AddCourse = () => {
  const router = useRouter();
  const { semesterId } = router.query;
  const semester = useSelector((state) => getSemester(state, semesterId));

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2 className="pb-3">Add Course to Semester {semester?.number}</h2>
      <AddEditCourseForm semesterId={semesterId}/>
    </div>
  );
};

AddCourse.getLayout = getLayout;

export default AddCourse;
