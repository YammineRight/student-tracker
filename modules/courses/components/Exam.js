import { useSelector, useDispatch } from "react-redux";
import { getCourse, getExam } from "../redux/getters/main";
import { UilBookOpen, UilTrashAlt } from "@iconscout/react-unicons";
import Link from "next/link";
import { ButtonBase, Button } from "@material-ui/core";
import {deleteExam} from "../redux/actions/main";
import { connect } from "react-redux";


const Exam = ({ examId, dispatchDeleteExam }) => {
  const exam = useSelector((state) => getExam(state, examId));
  const course = useSelector((state) => getCourse(state, exam.courseId))

  return (
    <div
          className="text-light d-flex rounded-3 align-items-center"
          style={{
            background: "#eeeeee14",
            width: "fit-content",
            minHeight: "85px",
          }}
    >
      <Link
        passHref={true}
        href={`semester/${course.semesterId}/course/${exam.courseId}/exam/${examId}/edit`}
      >
        <ButtonBase
        className="first-custom-class"
        >
          <div className="d-flex p-3 align-items-center">
            <div>
              <h4 className="mb-0">
                {exam.name}
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
        </ButtonBase>
      </Link>
          <a
            onClick={() => dispatchDeleteExam(examId)}
            style={{
              color: "white",
              padding: "15px",
              position: "relative",
              zIndex: "2",
              cursor: "pointer",
            }}
          >
            <UilTrashAlt />
          </a>
    </div>
  );
};

const mapDispatchToProps = {
  dispatchDeleteExam: deleteExam,
};

export default connect((state) => ({}), mapDispatchToProps)(Exam);
