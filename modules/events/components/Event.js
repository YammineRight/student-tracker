import { Card } from "@material-ui/core";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteEvent } from "../redux/actions/main.js";

const EventCard = ({ event: eventy, dispatchDeleteEvent }) => {
  const checkEventType = () => {
    const eventType = eventy?.eventType;
    if (eventType === "course" || eventType === "exam") return "name";

    return "number";
  };

  return (
    <Card className="m-2 p-3">
      <h3 className="d-flex justify-content-between" style={{ width: "100%" }}>
        {eventy?.name}
        <Button
          onClick={() => dispatchDeleteEvent(eventy.id)}
          className="mb-1"
        >
          <UilTrashAlt />
        </Button>
      </h3>
      <div>{eventy.description}</div>
      <div>{eventy.date.toString().substring(0, 10)}</div>
      <span>
        {(new Date(eventy.endDate) - new Date(eventy.startDate)) / 60000}{" "}
        minutes
      </span>
      <p
        style={{ fontSize: "12px", textAlign: "right", color: "red" }}
        className="mt-2 mb-0"
      >
        {eventy.eventType}
      </p>
    </Card>
  );
};

const mapDispatchToProps = {
  dispatchDeleteEvent: deleteEvent,
};

export default connect((state) => ({}), mapDispatchToProps)(EventCard);
