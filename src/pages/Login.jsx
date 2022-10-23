import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import style from "./LoginForm.module.css";
const eye = <FontAwesomeIcon icon={faEye} />;

const LoginForm = (props) => {
  // form validation rules
  const validationSchema = yup.object().shape({
    email: yup.string().email("Valid email is required").required(),
    password: yup.string().min(4, "Mininum 4 characters").required(),
  });
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true);
  };
  //actual input names
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onSubmit = async (data) => {
    // console.log("From loginform:", data);
    props.data(data);
  };

  return (
    <div>
      <div>
        <h1 className="text-center pb-3 m-0 mb-3">Login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Controller
            name="email" //actual input
            control={control} //take place of the register RHF
            render={({
              //takes a function and rturn a react element
              field, //this error will be displyed takes over form state errors
            }) => (
              <TextField
                label={"email"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="email"
                autoFocus
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box mb={3} className={style.passwordbox}>
          <Controller
            name="password" //actual input
            control={control} //take place of the register RHF
            render={({
              //takes a function and rturn a react element
              field, //this error will be displyed takes over form state errors
            }) => (
              <TextField
                label={"password"} //label in the box
                variant="outlined"
                fullWidth
                autoComplete="password"
                autoFocus
                placeholder="password"
                type={passwordShow ? "text" : "password"}
                // error={!!error} //convert obj into a bool
                // helperText={error ? error.message : null}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                {...field}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {/* <div className={style.eye}>
            <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
          </div>       */}
        </Box>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#FD5B61",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#FD5B61",
            },
          }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
