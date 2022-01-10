import { emptyEvent } from "../../constants";
import * as t from "../types";

const emptyStatus = {
  errors: {},
  isSubmited: null,
  isLoading: false,
};

const emptyState = {
  events: {},
  status: {
    submitEvent: emptyStatus
  },
};

const events = (state = emptyState, action) => {
  switch (action.type) {
    case t.SUBMIT_EVENT: {
      const { id, event } = action.payload;
      return {
        ...state,
        events: {
          ...state.events,
          [id]: { ...emptyEvent, id, ...event },
        },
        status: {
          ...state.status,
          submitEvent: { errors: {}, isSubmited: true },
        },
      };
    }

    case t.SUBMIT_EVENT_ERROR: {
      return {
        ...state,
        status: {
          ...state.status,
          submitEvent: {
            ...emptyStatus,
            ...action.payload,
          },
        },
      };
    }

    case t.RESET_SUBMIT_EVENT_STATUS: {
      return {
        ...state,
        status: {
          ...state.status,
          submitEvent: emptyStatus,
        },
      };
    }

    case t.DELETE_EVENT: {
      const eventToDelete = state.events[action.payload];

      if (!eventToDelete) throw Error('event not found');

      const newEvents = {...state.events}

      delete newEvents[eventToDelete.id];

      return {
        ...state, 
        events: newEvents,
      }
    }

    default: {
      return state;
    }
  }
}

export default events;