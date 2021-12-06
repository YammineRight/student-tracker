import * as t from "../types";
import { Api } from "../../../../common/api.js";
import { Validator } from "../../../../common/util/validation";
import { courseRules, semesterRules, examRules } from "../../constants";

export const submitCourse = (course, semesterId) => async (dispatch) => {
  const { success, errors } = Validator.validate(
    { ...course, semesterId },
    courseRules
  );

  if (success) {
    if (!course.id) {
      try {
        const { data: courseAdded } = await Api.put("/add-course", {
          ...course,
          semesterId,
        });

        const formatedCourse = {
          id: courseAdded["_id"],
          ...courseAdded,
          examIds: course.exams,
        };

        dispatch({
          type: t.SUBMIT_COURSE,
          payload: {
            id: courseAdded["_id"],
            course: formatedCourse,
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data: courseAdded } = await Api.post("/update-course", {
          ...course,
          courseId: course.id,
        });

        const formatedCourse = {
          id: courseAdded["_id"],
          ...courseAdded,
          examIds: course.exams,
        };
        dispatch({
          type: t.SUBMIT_COURSE,
          payload: {
            id: courseAdded["_id"],
            course: formatedCourse,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    dispatch({
      type: t.SUBMIT_COURSE_ERROR,
      payload: { errors },
    });
  }
};

export const resetSubmitCourseStatus = () => (dispatch) => {
  dispatch({
    type: t.RESET_SUBMIT_COURSE_STATUS,
  });
};

export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    await Api.delete("/delete-course", { courseId });
    dispatch({
      type: t.DELETE_COURSE,
      payload: courseId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const submitSemester = (semester) => async (dispatch) => {
  const { success, errors } = Validator.validate(semester, semesterRules);

  if (success) {
    if (!semester.id) {
      try {
        const { data: semesterAdded } = await Api.put("/add-semester", {
          name: semester.number,
          ...semester,
        });
        const { name, startDate, endDate } = semesterAdded;

        const formatedSemester = {
          id: semesterAdded["_id"],
          number: name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        };
        dispatch({
          type: t.SUBMIT_SEMESTER,
          payload: {
            id: semesterAdded["_id"],
            semester: formatedSemester,
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data: semesterAdded } = await Api.post("/update-semester", {
          name: semester.number,
          ...semester,
          semesterId: semester.id,
        });
        const { name, startDate, endDate } = semesterAdded;

        const formatedSemester = {
          id: semesterAdded["_id"],
          number: name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        };
        dispatch({
          type: t.SUBMIT_SEMESTER,
          payload: {
            id: semesterAdded["_id"],
            semester: formatedSemester,
            courseIds: semester.courses,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    dispatch({
      type: t.SUBMIT_SEMESTER_ERROR,
      payload: { errors },
    });
  }
};

export const resetSubmitSemesterStatus = () => (dispatch) => {
  dispatch({
    type: t.RESET_SUBMIT_SEMESTER_STATUS,
  });
};

export const deleteSemester = (semesterId) => async (dispatch) => {
  try {
    await Api.delete("/delete-semester", { semesterId });
    dispatch({
      type: t.DELETE_SEMESTER,
      payload: semesterId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const submitExam = (exam, courseId) => async (dispatch) => {
  const { success, errors } = Validator.validate(
    { ...exam, courseId },
    examRules
  );

  if (success) {
    if (!exam.id) {
      try {
        const { data: examAdded } = await Api.put("/add-exam", {
          ...exam,
          courseId,
        });

        const formatedExam = {
          id: examAdded["_id"],
          ...examAdded,
        };
        dispatch({
          type: t.SUBMIT_EXAM,
          payload: {
            id: examAdded["_id"],
            exam: formatedExam,
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data: examAdded } = await Api.post("/update-exam", {
          ...exam,
          examId: exam.id,
        });

        const formatedExam = {
          id: examAdded["_id"],
          ...examAdded,
        };
        dispatch({
          type: t.SUBMIT_EXAM,
          payload: {
            id: examAdded["_id"],
            exam: formatedExam,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    dispatch({
      type: t.SUBMIT_EXAM_ERROR,
      payload: { errors },
    });
  }
};

export const resetSubmitExamStatus = () => (dispatch) => {
  dispatch({
    type: t.RESET_SUBMIT_EXAM_STATUS,
  });
};

export const deleteExam = (examId) => async (dispatch) => {
  try {
    await Api.delete("/delete-exam", { exanId });
    dispatch({
      type: t.DELETE_EXAM,
      payload: examId,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addSemester = (semester) => (dispatch) => {
  const { name, startDate, endDate } = semester;

  const formatedSemester = {
    id: semester["_id"],
    number: name,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
  dispatch({
    type: t.SUBMIT_SEMESTER,
    payload: {
      id: semester["_id"],
      semester: formatedSemester,
      courseIds: semester.courses,
    },
  });
};

export const addExam = (exam) => async (dispatch) => {
  const formatedExam = {
    id: exam["_id"],
    ...exam,
  };
  dispatch({
    type: t.SUBMIT_EXAM,
    payload: {
      id: exam["_id"],
      exam: formatedExam,
    },
  });
};

export const addCourse = (course) => (dispatch) => {
  const formatedCourse = {
    id: course["_id"],
    ...course,
    examIds: course.exams
  };

  dispatch({
    type: t.SUBMIT_COURSE,
    payload: {
      id: course["_id"],
      course: formatedCourse,
    },
  });
};
