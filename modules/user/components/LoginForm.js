import { useUser } from "../services/user/provider";
import { useState } from "react";
import { Validator } from "../../../common/util/validation";
import { Button, TextField } from "@material-ui/core";
import Link from "next/link";

const LoginForm = () => {
  const { login } = useUser();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //for the validation to work the name attribute of an input must match a rule name
  const rules = {
    username: "required|max:255",
    password: "required|max:255",
  };

  const handleInputChange = (event) => {
    const field = event.target;
    const { value, name } = field;

    setForm((oldState) => ({ ...oldState, [name]: value }));

    const { success, errors } = Validator.validateField(
      name,
      value,
      rules[name]
    );

    if (success) {
      // remove errors of field
      setError((oldErrors) => ({ ...oldErrors, [name]: "" }));
    } else {
      // if it has an error already update the error else dont show error
      setError((oldErrors) => {
        if (oldErrors[name]) {
          setError((oldErrors) => ({ ...oldErrors, [name]: errors }));
        }
        return oldErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const { success, errors } = Validator.validate(form, rules);

    if (success) {
      try {
        await login(form);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    } else {
      setIsLoading(false);
      setError(errors);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} noValidate>
        <p>
          Don't have an account? <Link href="/signup" passHref={true}><a style={{ textDecoration: "underline" }} href="" className="link">signup</a></Link>
        </p>

        <TextField
          disabled={isLoading}
          onChange={handleInputChange}
          label="Username"
          type="username"
          name="username"
          value={form.username}
          error={error.username ? error.username[0] : null}
          helperText={error.username ? error.username[0] : " "}
          className="w-100 pb-2"
        />

        <TextField
          disabled={isLoading}
          onChange={handleInputChange}
          label="Password"
          type="password"
          name="password"
          autoComplete="on"
          value={form.password}
          error={error.password ? error.password[0] : null}
          helperText={error.password ? error.password[0] : " "}
          className="w-100 pb-2"
        />

        <Button
          className="button button-primary w-100 mt-4"
          disabled={isLoading}
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
