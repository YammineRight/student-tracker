import { useSelector } from "react-redux";
import { getExam } from "../redux/getters/main";
import { UilBookOpen } from "@iconscout/react-unicons";

const Exam = ({ examId }) => {
  const exam = useSelector((state) => getExam(state, examId));

  return (
    <div className="d-flex p-2 rounded-3 align-items-center" style={{ background: "#eeeeee14", width: "fit-content", minHeight: '85px' }}>
      <div>
        <h4 className="mb-0">
          {exam.title}
          <UilBookOpen className="m-2"/>
        </h4>
      </div>
      <div className="d-flex flex-column p-3 pt-0 pb-0">
        {exam.grade && <small>Grade: {exam.grade}/20 </small>}
        {exam.weight && <small>Weight: {exam.weight}% </small>}
        {exam.date && <small>Scheduled on: {exam.date.toLocaleString()}</small>}
      </div>
    </div>
  );
};

export default Exam;
