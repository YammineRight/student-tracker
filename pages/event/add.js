import { getLayout } from "../../common/layouts/NavFooterLayout";
import AddEditEvent from "../../modules/events/components/AddEditEvent";

const AddEvent = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2 className="pb-3">Add an Event</h2>
      <AddEditEvent />
    </div>
  );
};

AddEvent.getLayout = getLayout;

export default AddEvent;