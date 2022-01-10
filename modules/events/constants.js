export const eventRules = {
  name: "required",
  description: "required",
  date: "required|date",
  url: "nullable|url",
  duration: "number|required",
  eventType: "required",
}

export const emptyEvent = {
  name: "",
  description: "",
  date: "",
  url: "",
  startDate: "",
  eventType: "",
  endDate: "",
  courseId: "",
  semesterId: "",
  examId: ""
}