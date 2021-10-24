export const courseRules = {
  title: "required",
  description: "nullable",
  credits: "required",
  professor: "nullable",
  url: "url|nullable",
  notes: "nullable"
}

export const emptyCourse = {
  title: "",
  description: "",
  credits: 4,
  professor: "",
  url: "",
  notes: "",
}