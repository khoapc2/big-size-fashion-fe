import { Grid } from "@material-ui/core";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Controls from "./controls/Controls";
import { Form } from "./useForm";

// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
//   { id: "other", title: "Other" },
// ];

export default function EmployeeForm() {
  const [values, setValues] = useState({
    fullName: "",
    account: "",
    password: "",
    phone: "",
    storeId: "",
    showPassword: false,
    // hireDate: new Date(),
    //   isPermanent: false,});
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues({
      fullName: "",
      account: "",
      password: "",
      phone: "",
      storeId: "",
      showPassword: false,
      // hireDate: new Date(),
      //   isPermanent: false,});
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Họ và tên"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Tài khoản"
            name="account"
            value={values.account}
            onChange={handleInputChange}
          />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="Mật khẩu"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {/* <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          /> */}
          <Controls.Input
            label="Số điện thoại"
            name="mobile"
            value={values.phone}
            onChange={handleInputChange}
          />
          <Controls.Select
            name="storeId"
            label="Store"
            value={values.storeId}
            onChange={handleInputChange}
            options={[]}
          />
          {/* <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          /> */}
          {/* <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
