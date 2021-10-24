import * as t from "../types";

const emptyStatus = {
  errors: {},
  isSubmited: null,
  isLoading: false,
}

const emptyState = {
  courses: {},
  status: {
    addCourse: emptyStatus,
  },
};

const main = (state = emptyState, action) => {
  switch (action.type) {
    case t.ADD_COURSE: {
      const { id, course } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
          [id]: course,
        },
        status: {
          ...state.status,
          addCourse: { errors: {}, isSubmited: true },
        },
      };
    }

    case t.ADD_COURSE_ERROR: {
      return {
        ...state,
        status: {
          ...state.status,
          addCourse: {
            ...emptyStatus,
            ...action.payload,
          },
        },
      };
    }

    case t.RESET_ADD_COURSE_STATUS: {
      return {
        ...state,
        status: {
          ...state.status,
          addCourse: emptyStatus,
        },
      };
    }

    default:
      return { ...state };
  }
};

export default main;
