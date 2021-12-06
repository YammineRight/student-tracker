import { useSelector } from "react-redux";
import { getCourse } from "../redux/getters/main";
import { UilEye, UilEyeSlash, UilPen, UilPlus, UilTrashAlt } from "@iconscout/react-unicons";
import { Button } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useToggle } from "../../../common/util/toogleHooks";
import Link from "next/link";
import Exam from "./Exam";
import {deleteCourse} from "../redux/actions/main";
import { connect } from "react-redux";

const CourseDisplay = ({ courseId, dispatchDeleteCourse }) => {
  const course = useSelector((state) => getCourse(state, courseId));
  const { isActive: isDetailsOpen, toggle: toggleDetails } = useToggle();
  const { title, ...details } = course;

  return (
    <div
      className="w-100 p-2 border-bottom rounded-3"
      style={{ background: "#eeeeee14" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">{title}</h6>
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
            href={`/semester/${course.semesterId}/course/${course.id}/edit`}
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
            {details.description && (
              <span>
                <small>
                  <em>Description: {details.description}</em>
                </small>
              </span>
            )}
            {details.credits && (
              <span>
                <small>
                  <em>Credits: {details.credits}</em>
                </small>
              </span>
            )}
            {details.professor && (
              <span>
                <small>
                  <em>Professor: {details.professor}</em>
                </small>
              </span>
            )}
            {details.link && (
              <span>
                <small>
                  <em>Link: {details.link}</em>
                </small>
              </span>
            )}
            {details.notes && (
              <span>
                <small>
                  <em>Notes: {details.notes}</em>
                </small>
              </span>
            )}
          </div>
          <div className="w-100 p-2 rounded-3">
            {course.examsIds.length !== 0 ? (
              <>
                <h6 className="pt-2">Exams:</h6>
                <div className="d-flex align-items-center flex-wrap">
                  {course.examsIds.reverse().map((examId) => (
                    <div key={examId} className="p-1">
                      <Exam examId={examId} />
                    </div>
                  ))}
                  <Link
                    href={`/semester/${course.semesterId}/course/${course.id}/exam/add`}
                    passHref={true}
                  >
                    <Button
                      className="m-1 text-light justify-content-center"
                      style={{
                        background: "#eeeeee14",
                        height: "85px",
                      }}
                    >
                      <UilPlus  />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <span>No exams added yet &nbsp;&nbsp;&nbsp;</span>
                <Link
                  href={`/semester/${course.semesterId}/course/${course.id}/exam/add`}
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
};

export default connect((state) => ({}), mapDispatchToProps)(CourseDisplay);