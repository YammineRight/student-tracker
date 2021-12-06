import { Card } from "@material-ui/core";

const EventCard = ({ event }) => (
  <Card className="m-2 p-3">
    <h3>{event.name}</h3>
    <div>{event.description}</div>
    <div>{event.date}</div>
    <span>{event.startDate.substring(0, 5)}</span>
    {
      event.endDate &&
      <span>{` ... ${event.endDate.substring(0, 5)}`}</span>
    }
    <p style={{fontSize: '12px', textAlign: 'right', color: 'red'}} className="mt-2 mb-0">{event.eventType}</p>
  </Card>
)

export default EventCard;