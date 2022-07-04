/* eslint-disable */
import React from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
  const { name, label, value, onChange, required, error, helperText, InputProps} = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        inputVariant="standard"
        label={label}
        format="dd/MMM/yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        error={error}
        helperText={helperText}
        required={required}
        InputProps={InputProps}
        disablePast={true}
      />
    </MuiPickersUtilsProvider>
  );
}
