import React, { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Box,
  TextField,
  Typography,
  Link,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { SiteHeader, CategoriesSubheading } from "../components/Headers";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import globalStyle from "../global.module.css";

export const Test = (props) => {
  // const validationSchema = yup.object().shape({
  //   title: yup.string().min(1, "Please include a title").required(),
  //   author: yup.string().min(4, "Please include an author").required(),
  //   genre: yup.number().required(),
  //   copiesAvailable: yup.number().required(),
  //   sypnopsis: yup.string().min(10, "Please include a sypnosis").required(),
  // });
  const [backgroundImg, setBackgroundImg] = useState(false);
  const [epubFile, setEpubFile] = useState(false);
  const defaultValues = {
    email: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    console.log("create book", data);
    // try {
    //   const res = await axios.post(
    //     `http://${process.env.REACT_APP_SERVER_URL}/api/v1/book`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   if (res.status === 200 || res.status === 201) {
    //     console.log("Created book");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div>
      <SiteHeader />
      {/* <div>
        <input type="file" onChange={previewImage}/>
        <img src={this.state.file}/>
      </div> */}
      <Box
        sx={{
          margin: "0 auto",
          width: "50%",
          marginTop: "4em",
          marginBottom: "4em",
        }}
      >
        <CategoriesSubheading categoryName={"Add a book"} />
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

          <Link>
            <button
              className={`${globalStyle.actionbutton} ${globalStyle.loginbutton}`}
              type="submit"
            >
              Login
            </button>
          </Link>
        </form>
      </Box>
    </div>
  );
};
