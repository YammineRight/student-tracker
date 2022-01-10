import * as t from "../types";
import { Api } from "../../../../common/api.js";
import { Validator } from "../../../../common/util/validation";
import { eventRules } from "../../constants";

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export const submitEvent = (event) => async (dispatch) => {
  const newEventRules = {
    ...eventRules,
    [`${event?.eventType}Id`]: "required",
  };
  const { success, errors } = Validator.validate(event, newEventRules);

  if (success) {
    if (!event.id) {
      try {
        const { date, duration, ...restOfEvent } = event;

        const formatedEvent = {
          ...restOfEvent,
          date,
          startDate: date,
          endDate: addMinutes(date, duration).toString(),
        };

        const { data: eventAdded } = await Api.put("/add-event",
          formatedEvent
        );

        dispatch({
          type: t.SUBMIT_EVENT,
          payload: {
            id: eventAdded["_id"],
            event: formatedEvent,
          },
        });
        return 1;
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data: eventAdded } = await Api.post("/update-event", {
          name: event.name,
          ...event,
          eventId: event.id,
        });
        const { startDate, endDate, ...restOfEvent } = eventAdded;

        const formatedEvent = {
          endDate: new Date(endDate),
          startDate: new Date(startDate),
          ...restOfEvent,
        };
        dispatch({
          type: t.SUBMIT_EVENT,
          payload: {
            id: eventAdded["_id"],
            event: formatedEvent,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    dispatch({
      type: t.SUBMIT_EVENT_ERROR,
      payload: { errors },
    });
  }
};

export const resetSubmitEventStatus = () => (dispatch) => {
  dispatch({
    type: t.RESET_SUBMIT_EVENT_STATUS,
  });
};

export const deleteEvent = (eventId) => async (dispatch) => {
  console.log(eventId)
  try {
    await Api.post("/delete-event", { eventId });
    dispatch({
      type: t.DELETE_EVENT,
      payload: eventId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addEvent = (eventAdded) => (dispatch) => {
  dispatch({
    type: t.SUBMIT_EVENT,
    payload: {
      id: eventAdded["_id"],
      event: eventAdded,
    },
  });
} 
