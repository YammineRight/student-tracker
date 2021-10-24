import { getLayout } from "../common/layouts/NavFooterLayout";
import AddEditCourseForm from "../modules/courses/components/AddEditCourseForm";

const AddCourse = (props) => {

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
        <h2 className="pb-3">Add Course</h2>
        <AddEditCourseForm />
    </div>
  );
};

AddCourse.getLayout = getLayout;

export default AddCourse;
