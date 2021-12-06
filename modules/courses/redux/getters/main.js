export const getCourse = (state, courseId) => {
  return state?.main?.courses[courseId];
};

export const getCourses = (state, semesterId) => {
  const courses = {...state?.main?.courses};
  Object.keys(courses).forEach((courseId) => {
    if (courses[courseId].semesterId !== semesterId) {
      delete courses[courseId];
    } 
  });
  return courses;
};

export const getSemester = (state, semesterId) => {
  return state?.main?.semesters[semesterId];
};

export const getSemesters = (state) => {
  return state?.main?.semesters;
};

export const getExam = (state, examId) => {
  return state?.main?.exams[examId];
};

export const getExams = (state) => {
  return state?.main?.courses;
};
