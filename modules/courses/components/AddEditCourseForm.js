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
import { connect } from "react-redux";
import { emptyCourse } from "../constants";
import { submitCourse, resetSubmitCourseStatus } from "../redux/actions/main";

const EditAddCourseForm = (props) => {
  const { submitCourse, errors, resetSubmitCourseStatus, courseToEdit, semesterId } = props;
  const [course, setCourse] = useState(courseToEdit || emptyCourse);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState();

  const handleInput = ({ target: field }) => {
    const { name, value } = field;

    setCourse((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = submitCourse(course, semesterId);
    setIsLoading(false);
    if (id) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    resetSubmitCourseStatus();
    return resetSubmitCourseStatus();
  }, [resetSubmitCourseStatus]);

  return (
    <form onSubmit={handleSubmit}>
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      <TextField
        error={errors?.name}
        helperText={errors?.name || " "}
        name="name"
        label="Name*"
        value={course.name}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.credits}
        helperText={errors?.credits || " "}
        name="credits"
        label="Credits*"
        type="number"
        value={course.credits}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.description}
        helperText={errors?.description || " "}
        name="description"
        label="Description"
        value={course.description}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.professorName}
        helperText={errors?.professorName || " "}
        name="professorName"
        label="Professor Name"
        value={course.professorName}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.notes}
        helperText={errors?.notes || " "}
        name="notes"
        label="Notes"
        value={course.notes}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.link}
        helperText={errors?.link || " "}
        name="link"
        label="Link"
        value={course.link}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-4"
      />

      <Button variant="contained" type="submit">
        {courseToEdit?.id ? 'Save' : 'Add'}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.main.status.submitCourse.errors,
    isSubmited: state.main.status.submitCourse.isSubmited,
  };
};

const mapDispatchToProps = {
  submitCourse,
  resetSubmitCourseStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddCourseForm);
