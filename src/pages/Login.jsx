import React, { useState } from "react";
import {
  Button,
  CardContent,
  Card,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import Image from "mui-image";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import globalStyle from "../global.module.css";
// import Cookies from "universal-cookie";
import webooksLogo from "../assets/Group 1@2x.png";
import { useMediaQuery } from "react-responsive";
// const axios = Axios.create({
//   withCredentials: true
// })

export const Login = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
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
        `http://${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login/`,
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
        console.log(res.cookie);
        // cookies.set("token", res.token, { path: "/" });
        console.log("Login successfullly");
      }
    } catch (error) {
      console.log(error);
      // setCatchError(error.response.data.error);
    }
  };
  const mobile = {
    card: {
      padding: "2em",
      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0)",
    },
    logo: { width: "80%", objectFit: "contain" },
    CardContent: {
      width: "100%",
      margin: "0 auto",
      p: "0",
      paddingTop : "2em"
    },
    image : {
      width: "20%", m: "0 auto"
    }
  };
  const desktop = {
    card: {
      width: "45%",
      margin: "0 auto",
      py: "4em",
      px: "1.5em",
      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
      display: "flex",
      gap: "40px",
      borderRadius : "30px",
      marginTop: "8em"

    },
    logo: { width: "80%", objectFit: "contain" },
    CardContent: {
      width: "400px",
      margin: "0 auto",
      pb:"0"
    },
    image : {
      width: "60%", m: "0 auto"
    }
  };

  let responsiveLayout = null;
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop });
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
      <Box>
        <Card sx={responsiveLayout.card}>
          <Box sx={{margin:"auto", width:"50%"}}>
            <Box sx={responsiveLayout.image}>
              <Image style={responsiveLayout.logo} src={webooksLogo} />
            </Box>
            <h2>
              <span style={{ fontWeight: "100" }}>w</span>ebooks
            </h2>
          </Box>
          <CardContent sx={responsiveLayout.CardContent}>
            <Typography variant="subtitle1" className="author-name" py={1}>
              Login to your account
            </Typography>
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
              <Box mb={3}>
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
              <Link >
                <button
                  className={`${globalStyle.actionbutton} ${globalStyle.loginbutton}`}
                  type="submit"
                >
                  Login
                </button>
              </Link>
            </form>
            <Divider
              sx={{
                width: "20px",
                margin: "0 auto",
                borderColor: "#6a6a6a",
                p: "1em",
              }}
            />
            <Typography variant="subtitle2" className="author-name" pt={3}>
              Don't have an account?{" "}
              <Link
                component="button"
                variant="subtitle2"
                color={"#FF8865"}
               
              >
                Register
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
