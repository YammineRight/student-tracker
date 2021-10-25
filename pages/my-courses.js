import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { getLayout } from "../common/layouts/NavFooterLayout";
import { CourseDisplay } from "../modules/courses/components/Course";
import Link from "next/link";
import { UilPlus } from "@iconscout/react-unicons";
import { connect } from "react-redux";
import { Validator } from "../common/util/validation";
import { UilExclamationOctagon } from '@iconscout/react-unicons'

const MyCourses = (props) => {
  const { courses } = props;
  const router = useRouter();

  // courses are static for now
  // later they will be fetched inside a useEffect hook from an api endpoint
  return (
    <>
      <div className="d-flex justify-content-between pb-4 pt-4">
        <h3>My Courses</h3>
        <Link href="/add-course" passHref={true}>
          <Button startIcon={<UilPlus />}>Add Course</Button>
        </Link>
      </div>
      {Validator.isEmpty(courses).success ? (
        <div className="d-flex justify-content-center align-items-center flex-fill">
          <h6 className="text-warning"><UilExclamationOctagon/> you dont have any courses yet</h6>
        </div>
      ) : (
        <div className="row">
          {Object.keys(courses).map((id) => (
            <div className="col-12 col-sm-6 col-md-4 pb-4" key={id}>
              <CourseDisplay
                onClick={() => router.push(`/course/${id}`)}
                title={courses[id].title}
                description={courses[id].description}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

MyCourses.getLayout = getLayout;

const mapStateToProps = (state) => {
  return { courses: state.main.courses };
};

export default connect(mapStateToProps)(MyCourses);
