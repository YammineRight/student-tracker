export const courseRules = {
  title: "required",
  description: "nullable",
  credits: "required",
  professor: "nullable",
  link: "url|nullable",
  notes: "nullable",
  semesterId: "required",
}

export const emptyCourse = {
  title: "",
  description: "",
  credits: "",
  professor: "",
  link: "",
  notes: "",
  examsIds: [],
}

export const semesterRules = {
  number: "required|number",
  startDate: "nullable|date",
  endDate: "nullable|date",
}

export const emptySemester = (() => ({
  title: "",
  startDate: new Date(),
  endDate: new Date(),
  coursesIds: []
}))();

export const examRules = {
  title: "required",
  weight: "nullable",
  grade: "nullable|max:20|min:0",
  date: "nullable",
  passingGrade: "required|max:20|min:0",
  courseId: "required",
}

export const emptyExam = {
  title: "",
  weight: "",
  grade: "",
  date: "",
  gradeOver: "20",
  passingGrade: "12",
  courseId: ""
}