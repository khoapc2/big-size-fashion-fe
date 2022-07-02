import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, error, type, onChange, multiline, fullWidth, helperText, required } =
    props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      multiline={multiline}
      fullWidth={fullWidth}
      helperText={helperText}
      required={required}
      error={error}
    />
  );
}
