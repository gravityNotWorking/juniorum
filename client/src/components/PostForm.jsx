import React from "react";

//mui componenets
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";

import { options } from "../helpers/citiesAndCountries";
import { Formik, Field, Form } from "formik";

import { usePost } from "../hooks/usePost";
import { postValidation } from "../helpers/postValidation";
const PostForm = () => {
  const { post, isLoading } = usePost();

  const company = JSON.parse(sessionStorage.getItem("company"));
  const salaryOptions = [
    { value: "1000-2000", label: "1000-2000" },
    { value: "2000-3000", label: "2000-3000" },
    { value: "3000-4000", label: "3000-4000" },
    { value: "4000-5000", label: "4000-5000" },
  ];
  const typeOptions = [
    { value: "Full-time", label: "Full-Time" },
    { value: "Part-time", label: "Part-Time" },
    { value: "Internship", label: "Internship" },
  ];
  return (
    <Formik
      initialValues={{
        contactEmail: company.email || "",
        position: "",
        type: "",
        requirements: "",
        salary: "",
        location: "",
        company: company,
      }}
      validationSchema={postValidation}
      onSubmit={(values, { resetForm }) => {
        post(values);
        resetForm();
      }}
    >
      {({ errors, touched, getFieldProps, values, setFieldValue }) => (
        <Form>
          <TextField
            {...getFieldProps("contactEmail")}
            disabled={values.useSessionEmail}
            label="Contact Email"
            variant="outlined"
            fullWidth
            error={touched.contactEmail && Boolean(errors.contactEmail)}
            helperText={touched.contactEmail && errors.contactEmail}
          />

          <TextField
            {...getFieldProps("position")}
            label="Position"
            variant="outlined"
            fullWidth
            error={touched.position && Boolean(errors.position)}
            helperText={touched.position && errors.position}
          />

          <Field
            name="type"
            as={Select}
            fullWidth
            variant="outlined"
            error={touched.type && Boolean(errors.type)}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>

          <TextField
            {...getFieldProps("requirements")}
            multiline
            minRows={6}
            maxRows={10}
            label="Requirements"
            variant="outlined"
            fullWidth
            error={touched.requirements && Boolean(errors.requirements)}
            helperText={touched.requirements && errors.requirements}
          />

          <Field
            name="salary"
            as={Select}
            fullWidth
            variant="outlined"
            error={touched.salary && Boolean(errors.salary)}
          >
            <MenuItem value="" disabled>
              Select a salary range
            </MenuItem>
            {salaryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                ${option.label}
              </MenuItem>
            ))}
          </Field>

          <Autocomplete
            freeSolo
            options={options}
            onChange={(event, value) => {
              setFieldValue("location", value?.value || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Job location"
                variant="outlined"
                fullWidth
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Create job
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
