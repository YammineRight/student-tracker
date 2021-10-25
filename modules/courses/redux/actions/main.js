import * as t from "../types";
import axios from "axios";
import { Validator } from "../../../../common/util/validation";
import { courseRules } from "../../constants";

export const addCourse = (course) => (dispatch) => {
  const { success, errors } = Validator.validate(course, courseRules);

  if (success) {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    dispatch({
      type: t.ADD_COURSE,
      payload: { id: randomId, course },
    });
    return randomId;
  } else {
    dispatch({
      type: t.ADD_COURSE_ERROR,
      payload: { errors },
    });
  }
};

export const resetAddCourseStatus = () => (dispatch) => {
  dispatch({
    type: t.RESET_ADD_COURSE_STATUS,
  });
};
