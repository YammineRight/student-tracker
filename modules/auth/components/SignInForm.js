import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Validator } from "../../../common/util/validation";

const Login = () => {

  return (
    <form>
      <TextField name="username" label="Username"></TextField>
      <TextField name="password" label="Password"></TextField>
      <Button type="submit">Login</Button>
    </form>
  );
}