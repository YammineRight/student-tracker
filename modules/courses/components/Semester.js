import { UilPen, UilPlus, UilArrowDown, UilTrashAlt } from "@iconscout/react-unicons";
import Link from "next/link";
import { Button } from "@material-ui/core";
import CourseDisplay from "./Course";
import { useToggle } from "../../../common/util/toogleHooks";
import Collapse from "@material-ui/core/Collapse";
import { deleteSemester } from "../redux/actions/main";
import { connect } from "react-redux";

const Semester = ({ semester, dispatchDeleteSemester }) => {
  const { isActive: isCoursesOpen, toggle: toggleCourses } = useToggle(true);
  return (
    <div className="bg-light rounded-3 p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-0 ">Semester {semester?.number}</h3>
        <div>
          <a className="p-2" style={{cursor: "pointer"}} onClick={() => dispatchDeleteSemester(semester.id)}>
            <UilTrashAlt />
          </a>
          <Link href={`/semester/${semester.id}/edit`} passHref={true}>
            <a className="p-2">
              <UilPen />
            </a>
          </Link>
        </div>
      </div>
      <div className="text-secondary pt-2">
        <small>
          {semester?.startDate && (
            <span>{semester.startDate.toLocaleDateString()}</span>
          )}
          {semester?.endDate && (
            <span> ----> {semester.endDate.toLocaleDateString()}</span>
          )}
        </small>
      </div>
      <div className="mt-2 p-3 bg-secondary rounded-3 text-light">
        {semester.coursesIds.length !== 0 && (
          <div className="d-flex justify-content-between align-items-center pb-3">
            <h5>Courses</h5>
            <Button onClick={toggleCourses}>
              <UilArrowDown
                className="text-light"
                style={{
                  transition: "transform 200ms ease-in-out",
                  transform: `rotate(${isCoursesOpen ? "-180" : "0"}deg)`,
                }}
              />
            </Button>
          </div>
        )}
        <div>
          {semester.coursesIds.length !== 0 && (
            <div className="pb-4">
              <Collapse in={isCoursesOpen}>
                {semester.coursesIds.reverse().map((id) => (
                  <CourseDisplay courseId={id} key={id} />
                ))}
              </Collapse>
            </div>
          )}
          <div className="w-100 d-flex justify-content-center">
            <Link href={`/semester/${semester.id}/course/add`} passHref={true}>
              <Button className="text-light" startIcon={<UilPlus />}>
                Add Course
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  dispatchDeleteSemester: deleteSemester,
};

export default connect((state) => ({}), mapDispatchToProps)(Semester);
