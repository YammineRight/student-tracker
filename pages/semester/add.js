import { getLayout } from "../../common/layouts/NavFooterLayout";
import AddEditSemester from "../../modules/courses/components/AddEditSemester";

const AddSemester = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2 className="pb-3">Add a Semester</h2>
      <AddEditSemester />
    </div>
  );
};

AddSemester.getLayout = getLayout;

export default AddSemester;
