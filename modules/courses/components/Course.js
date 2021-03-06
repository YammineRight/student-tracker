import { useSelector } from "react-redux";
import { getCourse } from "../redux/getters/main";
import {
  UilEye,
  UilEyeSlash,
  UilPen,
  UilPlus,
  UilTrashAlt,
} from "@iconscout/react-unicons";
import { Button } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useToggle } from "../../../common/util/toogleHooks";
import Link from "next/link";
import Exam from "./Exam";
import { deleteCourse, addExam } from "../redux/actions/main";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Validator } from "../../../common/util/validation";
import { Api } from "../../../common/api";

const CourseDisplay = ({ courseId, dispatchDeleteCourse, addExam }) => {
  const course = useSelector((state) => getCourse(state, courseId));
  const { isActive: isDetailsOpen, toggle: toggleDetails } = useToggle();
  useEffect(async () => {
    if (courseId) {
      try {
        const { data: exams } = await Api.post("/exams", {
          courseId: courseId,
        });
        exams.forEach((exam) => {
          addExam({ ...exam, courseId });
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [courseId]);

  return (
    <div
      className="w-100 p-2 border-bottom rounded-3"
      style={{ background: "#eeeeee14" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">{course?.name}</h6>
        <div className="flex-shrink-0">
          <a
            style={{
              color: "white",
            }}
            className="btn text-light p-2"
            onClick={() => dispatchDeleteCourse(courseId)}
          >
            <UilTrashAlt />
          </a>
          <a className="btn text-light p-2" onClick={toggleDetails}>
            {isDetailsOpen ? <UilEyeSlash /> : <UilEye />}
          </a>
          <Link
            href={`/semester/${course?.semesterId}/course/${course?.id}/edit`}
            passHref={true}
          >
            <a className="btn text-light p-2">
              <UilPen size="21" />
            </a>
          </Link>
        </div>
      </div>
      <div>
        <Collapse in={isDetailsOpen}>
          <div className="d-flex flex-column">
            {course?.description && (
              <span>
                <small>
                  <em>Description: {course?.description}</em>
                </small>
              </span>
            )}
            {course?.credits && (
              <span>
                <small>
                  <em>Credits: {course?.credits}</em>
                </small>
              </span>
            )}
            {course?.professor && (
              <span>
                <small>
                  <em>Professor: {course?.professor}</em>
                </small>
              </span>
            )}
            {course?.link && (
              <span>
                <small>
                  <em>Link: {course?.link}</em>
                </small>
              </span>
            )}
            {course?.notes && (
              <span>
                <small>
                  <em>Notes: {course?.notes}</em>
                </small>
              </span>
            )}
          </div>
          <div className="w-100 p-2 rounded-3">
            {course?.examsIds?.length !== 0 ? (
              <>
                <h6 className="pt-2">Exams:</h6>
                <div className="d-flex align-items-center flex-wrap">
                  {course?.examsIds.reverse().map((examId) => (
                    <div key={examId} className="p-1">
                      <Exam examId={examId} />
                    </div>
                  ))}
                  <Link
                    href={`/semester/${course?.semesterId}/course/${course?.id}/exam/add`}
                    passHref={true}
                  >
                    <Button
                      className="m-1 text-light justify-content-center"
                      style={{
                        background: "#eeeeee14",
                        height: "85px",
                      }}
                    >
                      <UilPlus />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <span>No exams added yet &nbsp;&nbsp;&nbsp;</span>
                <Link
                  href={`/semester/${course?.semesterId}/course/${course?.id}/exam/add`}
                  passHref={true}
                >
                  <Button
                    className="pt-1 pb-1 text-light"
                    startIcon={<UilPlus />}
                  >
                    add
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  dispatchDeleteCourse: deleteCourse,
  addExam,
};

export default connect((state) => ({}), mapDispatchToProps)(CourseDisplay);
