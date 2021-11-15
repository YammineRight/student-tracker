import * as t from "../types";
import axios from "axios";
import { Validator } from "../../../../common/util/validation";
import { courseRules, semesterRules, examRules } from "../../constants";

export const submitCourse = (course, semesterId) => (dispatch) => {
  const { success, errors } = Validator.validate({...course, semesterId}, courseRules);
  const randomId = Math.floor(1000 + Math.random() * 9000);
  if (success) {
    dispatch({
      type: t.SUBMIT_COURSE,
      payload: {
        id: course.id || randomId,
        course,
        semesterId
      },
    });
    return course.id || randomId;
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

export const deleteCourse = (courseId) => (dispatch) => {
  dispatch({
    type: t.DELETE_COURSE,
    payload: courseId,
  })
};

export const submitSemester = (semester) => (dispatch) => {
  const { success, errors } = Validator.validate(semester, semesterRules);
  const randomId = Math.floor(1000 + Math.random() * 9000);
  if (success) {
    dispatch({
      type: t.SUBMIT_SEMESTER,
      payload: {
        id: semester.id || randomId,
        semester,
      },
    });
    return semester.id || randomId;
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

export const deleteSemester = (semesterId) => (dispatch) => {
  dispatch({
    type: t.DELETE_SEMESTER,
    payload: semesterId
  })
};

export const submitExam = (exam, courseId) => (dispatch) => {
  const { success, errors } = Validator.validate({...exam, courseId}, examRules);
  const randomId = Math.floor(1000 + Math.random() * 9000);
  if (success) {
    dispatch({
      type: t.SUBMIT_EXAM,
      payload: {
        id: exam.id || randomId,
        exam,
        courseId
      },
    });
    return exam.id || randomId;
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

export const deleteExam = (examId) => (dispatch) => {
  dispatch({
    type: t.DELETE_EXAM,
    payload: examId
  })
};
