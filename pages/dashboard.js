import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { getLayout } from "../common/layouts/NavFooterLayout";
import Semester from "../modules/courses/components/Semester";
import Link from "next/link";
import { UilPlus } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { Validator } from "../common/util/validation";
import { UilExclamationOctagon } from "@iconscout/react-unicons";
import { getSemesters } from "../modules/courses/redux/getters/main";

const Dashboard = () => {
  const router = useRouter();
  const semesters = useSelector(getSemesters);
  console.log(semesters)

  return (
    <>
      <div className="d-flex justify-content-between pb-4 pt-4">
        <h3>Dashboard</h3>
        <Link href="/semester/add" passHref={true}>
          <Button startIcon={<UilPlus />}>Add Semester</Button>
        </Link>
      </div>
      {Validator.isEmpty(semesters).success ? (
        <div className="d-flex justify-content-center align-items-center flex-fill">
          <h6 className="text-warning">
            <UilExclamationOctagon /> you dont have any semesters yet
          </h6>
        </div>
      ) : (
        <div className="row">
          {Object.keys(semesters).map((id) => (
            <Semester
              key={id}
              onClick={() => router.push(`/course/${id}`)}
              semester={semesters[id]}
            />
          ))}
        </div>
      )}
    </>
  );
};

Dashboard.getLayout = getLayout;

export default Dashboard;
