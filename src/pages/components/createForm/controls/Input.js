import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const {
    name,
    label,
    value,
    type,
    onChange,
    multiline,
    fullWidth,
    disable,
    error,
    helperText,
    required,
    inputProps,
  } = props;
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
      disabled={disable}
      inputProps={inputProps}
    />
  );
}
