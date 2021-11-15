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
import { emptySemester } from "../constants";
import {
  submitSemester,
  resetSubmitSemesterStatus,
} from "../redux/actions/main";
import { KeyboardDatePicker } from "@material-ui/pickers";

const AddEditSemester = (props) => {
  const { submitSemester, errors, resetSubmitSemesterStatus, semesterToEdit } =
    props;
  const [semester, setSemester] = useState(semesterToEdit || emptySemester);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = ({ target: field }) => {
    const { name, value } = field;

    setSemester((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = submitSemester(semester);
    setIsLoading(false);
    if (id) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    resetSubmitSemesterStatus();
    return resetSubmitSemesterStatus();
  }, [resetSubmitSemesterStatus]);

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
        error={errors?.number}
        helperText={errors?.number || " "}
        name="number"
        label="Number*"
        value={semester.number}
        variant="standard"
        type="number"
        onChange={handleInput}
        className="w-100 pb-2"
      />
      <KeyboardDatePicker
        autoOk={true}
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        className="w-100 pb-2"
        value={semester.startDate}
        name="startDate"
        label="Start Date"
        onChange={(v) =>
          handleInput({ target: { name: "startDate", value: v } })
        }
        error={errors?.startDate}
        helperText={errors?.startDate || " "}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
      <KeyboardDatePicker
        autoOk={true}
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        className="w-100 pb-2"
        value={semester.endDate}
        name="endDate"
        label="End Date"
        onChange={(v) => handleInput({ target: { name: "endDate", value: v } })}
        error={errors?.endDate}
        helperText={errors?.endDate || " "}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
      <Button variant="contained" type="submit" disabled={isLoading}>
        {semesterToEdit?.id ? "Save" : "Add"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.main.status.submitSemester.errors,
    isSubmited: state.main.status.submitSemester.isSubmited,
  };
};

const mapDispatchToProps = {
  submitSemester,
  resetSubmitSemesterStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditSemester);
