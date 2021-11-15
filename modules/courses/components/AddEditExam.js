import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { emptyExam } from "../constants";
import { submitExam, resetSubmitExamStatus } from "../redux/actions/main";

const EditAddExamForm = (props) => {
  const { submitExam, errors, resetSubmitExamStatus, examToEdit, courseId } =
    props;
  const [exam, setExam] = useState(examToEdit || emptyExam);
  const router = useRouter();

  const handleInput = ({ target: field }) => {
    const { name, value } = field;

    setExam((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = submitExam(exam, courseId);
    if (id) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    resetSubmitExamStatus();
    return resetSubmitExamStatus();
  }, [resetSubmitExamStatus]);

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
        error={errors?.title}
        helperText={errors?.title || " "}
        name="title"
        label="Title*"
        value={exam.title}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.weight}
        helperText={errors?.weight || " "}
        name="weight"
        label="Weight %"
        type="number"
        value={exam.weight}
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <TextField
        error={errors?.grade}
        helperText={errors?.grade || " "}
        name="grade"
        label="Grade / 20"
        value={exam.grade}
        type="number"
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <DateTimePicker
        autoOk={true}
        variant="inline"
        margin="normal"
        className="w-100 pb-2"
        label="Exam Date"
        value={exam.date}
        onChange={(v) => handleInput({ target: { name: "date", value: v } })}
        error={errors?.date}
        helperText={errors?.date || " "}
      />
      <TextField
        error={errors?.passingGrade}
        helperText={errors?.passingGrade || " "}
        name="passingGrade"
        label="Passing Grade / 20"
        value={exam.passingGrade}
        type="number"
        variant="standard"
        onChange={handleInput}
        className="w-100 pb-2"
      />

      <Button variant="contained" type="submit">
        {examToEdit?.id ? "Save" : "Add"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.main.status.submitExam.errors,
    isSubmited: state.main.status.submitExam.isSubmited,
  };
};

const mapDispatchToProps = {
  submitExam,
  resetSubmitExamStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddExamForm);