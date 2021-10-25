import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { emptyCourse } from "../constants";
import { addCourse, resetAddCourseStatus } from "../redux/actions/main";

const AddCourse = (props) => {
  const { addCourse, errors, resetAddCourseStatus } = props;
  const [course, setCourse] = useState(emptyCourse);
  const router = useRouter();

  const handleInput = ({ target: field }) => {
    const { name, value } = field;

    setCourse((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = addCourse(course);
    if (id) {
      router.push("/my-courses");
    }
  };

  useEffect(() => {
    resetAddCourseStatus();
    return resetAddCourseStatus();
  }, [resetAddCourseStatus]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        error={errors?.title}
        helperText={errors?.title || " "}
        name="title"
        label="Title*"
        value={course.title}
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
        error={errors?.professor}
        helperText={errors?.professor || " "}
        name="professor"
        label="Professor"
        value={course.professor}
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
        Add
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.main.status.addCourse.errors,
    isSubmited: state.main.status.addCourse.isSubmited,
  };
};

const mapDispatchToProps = {
  addCourse,
  resetAddCourseStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
