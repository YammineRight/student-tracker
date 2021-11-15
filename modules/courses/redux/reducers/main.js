import { emptyCourse, emptyExam, emptySemester } from "../../constants";
import * as t from "../types";

const emptyStatus = {
  errors: {},
  isSubmited: null,
  isLoading: false,
};

const emptyState = {
  courses: {},
  exams: {},
  semesters: {},
  status: {
    submitCourse: emptyStatus,
    submitExam: emptyStatus,
    submitSemester: emptyStatus,
  },
};

const main = (state = emptyState, action) => {
  switch (action.type) {
    case t.SUBMIT_COURSE: {
      const { id, course, semesterId } = action.payload;

      if (!state.semesters[semesterId]) throw Error("semester unavailable");

      let coursesIds = [...state.semesters[semesterId].coursesIds];
      if (!course.id) {
        coursesIds = [...coursesIds, id];
      }
      const updatedSemester = { ...state.semesters[semesterId], coursesIds };

      return {
        ...state,
        courses: {
          ...state.courses,
          [id]: { ...emptyCourse, id, ...course, semesterId },
        },
        semesters: {
          ...state.semesters,
          [semesterId]: updatedSemester,
        },
        status: {
          ...state.status,
          submitCourse: { errors: {}, isSubmited: true },
        },
      };
    }

    case t.SUBMIT_COURSE_ERROR: {
      return {
        ...state,
        status: {
          ...state.status,
          submitCourse: {
            ...emptyStatus,
            ...action.payload,
          },
        },
      };
    }

    case t.RESET_SUBMIT_COURSE_STATUS: {
      return {
        ...state,
        status: {
          ...state.status,
          submitCourse: emptyStatus,
        },
      };
    }

    case t.SUBMIT_SEMESTER: {
      const { id, semester } = action.payload;
      return {
        ...state,
        semesters: {
          ...state.semesters,
          [id]: { ...emptySemester, id, ...semester },
        },
        status: {
          ...state.status,
          submitSemester: { errors: {}, isSubmited: true },
        },
      };
    }

    case t.SUBMIT_SEMESTER_ERROR: {
      return {
        ...state,
        status: {
          ...state.status,
          submitSemester: {
            ...emptyStatus,
            ...action.payload,
          },
        },
      };
    }

    case t.RESET_SUBMIT_SEMESTER_STATUS: {
      return {
        ...state,
        status: {
          ...state.status,
          submitSemester: emptyStatus,
        },
      };
    }

    case t.SUBMIT_EXAM: {
      const { id, exam, courseId } = action.payload;

      if (!state.courses[courseId]) throw Error("course unavailable");

      let examsIds = [...state.courses[courseId].examsIds];
      if (!exam.id) {
        examsIds = [...examsIds, id];
      }
      const updatedCourse = { ...state.courses[courseId], examsIds };

      return {
        ...state,
        exams: {
          ...state.exams,
          [id]: { id, ...exam, courseId },
        },
        courses: {
          ...state.courses,
          [courseId]: updatedCourse,
        },
        status: {
          ...state.status,
          submitExam: { errors: {}, isSubmited: true },
        },
      };
    }

    case t.SUBMIT_EXAM_ERROR: {
      return {
        ...state,
        status: {
          ...state.status,
          submitExam: {
            ...emptyStatus,
            ...action.payload,
          },
        },
      };
    }

    case t.RESET_SUBMIT_EXAM_STATUS: {
      return {
        ...state,
        status: {
          ...state.status,
          submitExam: emptyStatus,
        },
      };
    }

    default:
      return { ...state };
  }
};

export default main;
