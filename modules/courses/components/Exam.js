import { useSelector } from "react-redux";
import { getCourse, getExam } from "../redux/getters/main";
import { UilBookOpen, UilTrashAlt } from "@iconscout/react-unicons";
import Link from "next/link";
import { ButtonBase } from "@material-ui/core";

const Exam = ({ examId }) => {
  const exam = useSelector((state) => getExam(state, examId));
  const course = useSelector((state) => getCourse(state, exam.courseId))

  return (
    <Link
      passHref={true}
      href={`semester/${course.semesterId}/course/${exam.courseId}/exam/${examId}/edit`}
    >
      <ButtonBase
        className="text-light d-flex rounded-3"
        style={{
          background: "#eeeeee14",
          width: "fit-content",
          minHeight: "85px",
        }}
      >
        <div className="d-flex p-3 align-items-center">
          <div>
            <h4 className="mb-0">
              {exam.title}
              <UilBookOpen className="m-2" />
            </h4>
          </div>
          <div
            className="d-flex flex-column pt-0 pb-0"
            style={{ paddingLeft: "10px" }}
          >
            {exam.grade && (
              <small
                style={{
                  color: exam.passingGrade > exam.grade ? "#efc2c2" : ""
                }}
              >
                Grade: {exam.grade}/20{" "}
              </small>
            )}
            {exam.weight && <small>Weight: {exam.weight}% </small>}
            {exam.date && (
              <small>Scheduled on: {exam.date.toLocaleString()}</small>
            )}
          </div>
        </div>
        <UilTrashAlt />
      </ButtonBase>
    </Link>
  );
};

export default Exam;
