import { emptyCourse, emptyExam, emptySemester } from "../../constants";
import * as t from "../types";

const emptyStatus = {
  errors: {},
  isSubmited: null,
  isLoading: false,
};

const emptyState = {
  courses: {
    1: {
      id: 1,
      semesterId: 2,
      title: "Web Development",
      credits: 4,
      professor: "Youssef Bakouny",
      link: null,
      examsIds: [2, 3],
    },
    2: {
      id: 2,
      semesterId: 2,
      title: "Analyse de Projet",
      credits: 4,
      professor: "Bernadette Wakim",
      link: null,
      examsIds: [4],
    },
    3: {
      id: 3,
      semesterId: 2,
      title: "Communication Analogique et Numerique",
      credits: 6,
      professor: "Hadi Sawaya",
      link: null,
      examsIds: [1],
    },
    4: {
      id: 4,
      semesterId: 1,
      title: "Theorie du Signal",
      credits: 4,
      professor: "Hadi Sawaya",
      link: null,
      examsIds: [],
    },
    5: {
      id: 5,
      semesterId: 1,
      title: "Bases de donnes relationnelles",
      credits: 4,
      professor: "Jihad Renno",
      link: null,
      examsIds: [],
    },
    6: {
      id: 6,
      semester_id: 1,
      title: "Electronique Numerique",
      credits: 6,
      professor: "Rayan Mina",
      link: null,
      examsIds: [],
    },
  },
  exams: {
    1: {
      id: 1,
      courseId: 3,
      title: "partiel",
      date: new Date("2021-11-04"),
      gradeOver: "20",
      passingGrade: 10,
      grade: 12,
    },
    2: {
      id: 2,
      courseId: 1,
      title: "2eme Iteration",
      date: new Date("2021-11-16"),
      gradeOver: "20",
      passingGrade: 10,
      grade: null,
    },
    3: {
      id: 3,
      courseId: 1,
      title: "1ere Iteration",
      date: new Date("2021-10-14"),
      gradeOver: "20",
      passingGrade: 10,
      grade: 8,
    },
    4: {
      id: 4,
      courseId: 2,
      title: "Devoir",
      date: new Date("2021-10-22"),
      gradeOver: "20",
      passingGrade: 10,
      grade: 18,
    },
  },
  semesters: {
    1: {
      id: 1,
      number: 1,
      start_date: new Date("2021-01-15"),
      end_date: new Date("2021-06-25"),
      coursesIds: [4, 5, 6],
    },
    2: {
      id: 2,
      number: 2,
      start_date: new Date("2021-09-01"),
      end_date: null,
      coursesIds: [1, 2, 3],
    },
  },
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
