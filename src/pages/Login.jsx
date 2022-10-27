import React, { useState } from "react";
import {
  Container,
  Button,
  CardContent,
  Card,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import Image from "mui-image";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./BookAction.module.css";
// import Cookies from "universal-cookie";
import webooksLogo from "../assets/Group 1@2x.png";

// const axios = Axios.create({
//   withCredentials: true
// })
// const cookies = new Cookies();

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//     backgroundColor: "blue",
//     [theme.breakpoints.up("sm")]: {
//       backgroundColor: "red",
//     },
//     [theme.breakpoints.up("md")]: {
//       backgroundColor: "green",
//     },
//     [theme.breakpoints.up("lg")]: {
//       backgroundColor: "orange",
//     },
//     [theme.breakpoints.up("xl")]: {
//       backgroundColor: "cyan",
//     },
//   },
// }));

export const Login = (props) => {
  // const classes = useStyles();
  // const theme = useTheme();
  // form validation rules
  const eye = <FontAwesomeIcon icon={faEye} />;
  const validationSchema = yup.object().shape({
    email: yup.string().email("Valid email is required").required(),
    password: yup.string().min(4, "Mininum 4 characters").required(),
  });
  const [passwordShow, setPasswordShow] = useState(false);
  // const [catchError, setCatchError] = useState(null);
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
    console.log("from login:", data);
    // setCatchError(null);
    try {
      const res = await axios.post(
        `http://w-ebooks.herokuapp.com/api/v1/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200 || res.status === 201) {
        //set my cookie
        console.log(res.headers);
        console.log(res);
        // cookies.set("token", res.token, { path: "/" });
        console.log("Login successfullly");
      }
    } catch (error) {
      console.log(error);
      // setCatchError(error.response.data.error);
    }
  };
  return (
    <Box>
      <Box
        m={0} //margin
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Button variant="contained" color="primary" sx={{ height: 40 }}>
          <ArrowBackRoundedIcon />
        </Button>
      </Box>
      <Container sx={{ my: 0 }}>
        <Card
          sx={{
            width: "50%",
            margin: "0 auto",
            py: "4em",
            px: "1em",
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
          }}
        >
          <Box sx={{ width: "25%", m: "0 auto" }}>
            <Image src={webooksLogo} />
          </Box>
          <h2>WEBOOKS</h2>
          <CardContent sx={{ width: "100%", margin: "0 auto", p: "0" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={3} borderRadius="100%">
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
              <Box mb={3} className={style.inputbox}>
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
              </Box>
              <button className={style.actionbutton} type="submit">
                Login
              </button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
