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

    case t.DELETE_COURSE: {
      const courseToDelete = state.courses[action.payload];

      if (!courseToDelete) throw Error('course not found');

      const newExams = {...state.exams}
      const newCourses = {...state.courses}

      delete newCourses[courseToDelete.id];

      const semesterToUpdate = {...state.semesters[courseToDelete.semesterId]}
      semesterToUpdate.coursesIds = semesterToUpdate.coursesIds.filter((id) => id!= courseToDelete.id);

      for (examId of courseToDelete) {
        delete newExams[examId];
      }


      return {
        ...state, 
        semesters: {
          ...state.semesters,
          [courseToDelete.semesterId]: semesterToUpdate
        },
        courses: newCourses,
        exams: newExams,
      }
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

    case t.DELETE_SEMESTER: {
      const semesterToDelete = state.semesters[action.payload];

      if (!semesterToDelete) throw Error('course not found');

      const newExams = {...state.exams}
      const newCourses = {...state.courses}

      const newSemesters = {...state.semesters}
      delete newSemesters[semesterToDelete.id];

      for (courseId of semesterToDelete.coursesIds) {
        for (examId of newCourses[courseId].examsIds) {
          delete newExams[examId];
        }
        delete newCourses[courseId];
      }

      return {
        ...state, 
        semesters: newSemesters,
        courses: newCourses,
        exams: newExams,
      }
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

    case t.DELETE_EXAM: {
      const examToDelete = state.exams[action.payload];

      if (!examToDelete) throw Error('exam not found');

      const newExams = {...state.exams}
      const newCourses = {...state.courses}

      delete newExams[examToDelete.id];

      const courseToUpdate = {...state.courses[examToDelete.courseId]}
      courseToUpdate.coursesIds = courseToUpdate.coursesIds.filter((id) => id!= examToDelete.id);


      return {
        ...state, 
        courses: {
          ...state.courses,
          [examToDelete.courseId]: courseToUpdate
        },
        exams: newExams,
      }
    }

    default:
      return { ...state };
  }
};

export default main;
