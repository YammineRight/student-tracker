export const courseRules = {
  name: "required",
  description: "nullable",
  credits: "required",
  professorName: "nullable",
  link: "url|nullable",
  notes: "nullable",
  semesterId: "required",
}

export const emptyCourse = {
  name: "",
  description: "",
  credits: "",
  professorName: "",
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
  courses: []
}))();

export const examRules = {
  name: "required",
  weight: "nullable",
  grade: "nullable|max:20|min:0",
  date: "nullable",
  courseId: "required",
}

export const emptyExam = {
  name: "",
  weight: "",
  grade: "",
  date: "",
  courseId: ""
}