import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Formik, Form } from "formik";
import { loginValidation } from "../helpers/loginValidation";
import { useLogin } from "../hooks/useLogin";
const LoginForm = () => {
  const { login, error, isLoading } = useLogin();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidation}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {({ errors, touched, getFieldProps, isSubmitting }) => (
        <Form>
          <TextField
            size="small"
            {...getFieldProps("email")}
            label="Email"
            variant="outlined"
            fullWidth
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            size="small"
            {...getFieldProps("password")}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Login
          </Button>

          {error && <div>{error} </div>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
