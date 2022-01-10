import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { emptyEvent } from "../constants";
import {
  submitEvent,
  resetSubmitEventStatus,
} from "../redux/actions/main";
import { DateTimePicker } from "@material-ui/pickers";
import { addCourse, addExam, addSemester } from "../../courses/redux/actions/main";
import { Api } from "../../../common/api";


const AddEditEvent = (props) => {
  const { submitEvent, errors, resetSubmitEventStatus, eventToEdit } =
    props;
  const [event, setEvent] = useState(eventToEdit || emptyEvent);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    try {
      const { data: semesters } = await Api.get("/semesters");

      semesters.forEach(async (semester) => {
        props.addSemester(semester);
        const { data: courses } = await Api.post("/courses", {
          semesterId: semester["_id"],
        });
        courses.forEach(async (course) => {
          props.addCourse({ ...course, semesterId: semester["_id"] });
          const courseId = course["_id"]
          const { data: exams } = await Api.post("/exams", {
            courseId: courseId,
          });
          exams.forEach((exam) => {
            props.addExam({ ...exam, courseId });
          });
        });
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }, []);

  const handleInput = ({ target: field }) => {
    const { name, value } = field;

    setEvent((oldState) => ({ ...oldState, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = await submitEvent(event);
    setIsLoading(false);
    if (id) {
      router.push("/upcoming");
    }
  };

  useEffect(() => {
    resetSubmitEventStatus();
    return resetSubmitEventStatus();
  }, [resetSubmitEventStatus]);

  const checkEventType = () => {
    const eventType = event?.eventType;
    if (eventType === 'course' || eventType === 'exam') return 'name';
    return 'number';
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth className="pb-2"
      >
        <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
        <Select
          value={event?.eventType}
          name="eventType"
          label="Select event type"
          onChange={handleInput}
        >
          <MenuItem value='semester'>Semester</MenuItem>
          <MenuItem value='exam'>Exam</MenuItem>
          <MenuItem value='course'>Course</MenuItem>
        </Select>
      </FormControl>
      {event?.eventType &&
        <FormControl fullWidth className="pb-2"
        >
          <InputLabel id="demo-simple-select-label">Choose {event.eventType}</InputLabel>
          <Select
            value={event[event.eventType + "Id"]}
            name={event.eventType + "Id"}
            label="Select event type"
            onChange={handleInput}
          >
            {Object.keys(props.all[event?.eventType + 's']).map((id) => {
              return <MenuItem value={id} key={id}>{props.all[event?.eventType + 's'][id][checkEventType()]}</MenuItem>
            })}
          </Select>
        </FormControl>
      }
      <TextField
        error={errors?.name}
        helperText={errors?.name || " "}
        name="name"
        label="Name*"
        value={event?.name}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.description}
        helperText={errors?.description || " "}
        name="description"
        label="Description*"
        value={event?.description}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.url}
        helperText={errors?.url || " "}
        name="url"
        label="Url"
        value={event?.url}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.duration}
        helperText={errors?.duration || " "}
        name="duration"
        label="Duration in minutes"
        value={event?.duration}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <DateTimePicker
        autoOk={true}
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        className="w-100 pb-2"
        value={event?.date}
        name="date"
        label="Date"
        onChange={(v) => handleInput({ target: { name: "date", value: v } })}
        error={errors?.date}
        helperText={errors?.date || " "}
      />
      <Button variant="contained" type="submit" disabled={isLoading}>
        {eventToEdit?.id ? "Save" : "Add"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.events.status.submitEvent.errors,
    isSubmited: state.events.status.submitEvent.isSubmited,
    all: state.main
  };
};



const mapDispatchToProps = {
  submitEvent,
  resetSubmitEventStatus,
  addSemester,
  addCourse,
  addExam
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditEvent);
