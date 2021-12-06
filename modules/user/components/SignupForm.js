import { useUser } from "../services/user/provider";
import { useState } from "react";
import { Validator } from "../../../common/util/validation";
import {
  Button,
  TextField,
} from "@material-ui/core";
import Link from "next/link";

const SignupForm = () => {
  const { signup } = useUser();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //for the validation to work the name attribute of an input must match a rule name
  const rules = {
    fullName: "required|max:255",
    email: "required|email|max:255",
    password:
      "required|contains:capital|min:8|contains:special|contains:number|max:255",
    confirmPassword: `equals:${form.password}`,
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
        await signup(form);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    } else {
      setIsLoading(false);
      setError(errors);
    }
  };

  const handleUserAgreement = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} noValidate>
        <p>
          Don't have an account? <Link href="/login" passHref={true}><a style={{ textDecoration: "underline" }} href="" className="link">login</a></Link>
        </p>

        <TextField
          disabled={isLoading}
          onChange={handleInputChange}
          label="Full Name"
          type="fullName"
          name="fullName"
          value={form.fullName}
          error={error.fullName ? error.fullName[0] : null}
          helperText={error.fullName ? error.fullName[0] : " "}
          className="w-100 pb-2"
        />

        <TextField
          disabled={isLoading}
          onChange={handleInputChange}
          label="Email"
          type="email"
          name="email"
          value={form.email}
          error={error.email ? error.email[0] : null}
          className="w-100 pb-2"
        />

        <TextField
          disabled={isLoading}
          autoComplete="on"
          onChange={handleInputChange}
          label="Password"
          type="password"
          name="password"
          value={form.password}
          error={error.password ? error.password[0] : null}
          helperText={error.password ? error.password[0] : " "}
          className="w-100 pb-2"
        />

        <TextField
          disabled={isLoading}
          autoComplete="on"
          onChange={handleInputChange}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          className="w-100 pb-2"
          value={form.confirmPassword}
          error={error?.confirmPassword ? error?.confirmPassword : null}
          helperText={error?.confirmPassword ? error?.confirmPassword : " "}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="mt-3"
        >
          <input
            style={{
              marginRight: 5,
            }}
            type="checkbox"
            onChange={handleUserAgreement}
          />
          <a>
            I agree to the terms and conditions
          </a>
        </div>

        <Button
          className="button button-primary w-100 mt-4"
          disabled={isLoading || !isChecked}
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
