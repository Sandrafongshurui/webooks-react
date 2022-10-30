import React, { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Box,
  TextField,
  Typography,
  Link,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Icon,
} from "@mui/material";
import { SiteHeader, CategoriesSubheading } from "../components/Headers";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import globalStyle from "../global.module.css";

export const CreateBook = (props) => {
  const validationSchema = yup.object().shape({
    title: yup.string().min(1, "Please include a title").required(),
    author: yup.string().min(4, "Please include an author").required(),
    genre: yup.number().required(),
    copiesAvailable: yup.number().required(),
    sypnopsis: yup.string().min(10, "Please include a sypnosis").required(),
  });
  const [backgroundImg, setBackgroundImg] = useState(false);

  // const numOfFiles = (file) => {
  //   if (imageAcceptedFiles.length > 1) {
  //     return {
  //       code: "Too many files",
  //       message: `Only 1 file is allowed`,
  //     };
  //   }
  //   return null;
  // };

  const {
    fileRejections: imageFileRejections,
    acceptedFiles: imageAcceptedFiles,
    getRootProps: imageGetRootProps,
    getInputProps: imageGetInputProps,
  } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg"],
    },
    maxFiles: 1,
    onDrop: () => {
      setBackgroundImg(true);
    },
    multiple: false,
  });

  const imageFileRejectionItems = imageFileRejections.map(
    ({ file, errors }) => {
      return (
        <ListItem
          key={file.path}
          sx={{ display: "flex", p: "0", flexWrap: "wrap" }}
        >
          {/* //   <ListItemText
        //     sx={{ width: "inherit" }}
        //     primary={
        //       <Typography
        //         sx={{ width: "inherit" }}
        //         component="span"
        //         variant="subtitle2"
        //         color="text.secondary"
        //       >
        //         {file.path}
        //       </Typography>
        //     }
        //   /> */}
          <ListItemText
            sx={{ width: "inherit", padding: "0",  margin: "0", }}
            primary={
              <Typography
                component="span"
                variant="subtitle2"
                color="text.secondary"
              >
                {errors[0].message}
              </Typography>
            }
          />
        </ListItem>
        // <li key={file.path}>
        //   {file.path} - {file.size} bytes
        //   <ul>
        //     {errors.map((e) => (
        //       <li key={e.code}>{e.message}</li>
        //     ))}
        //   </ul>
        // </li>
      );
    }
  );

  const imagefile = imageAcceptedFiles.map((file) => URL.createObjectURL(file));

  const {
    fileRejections: epubFileRejections,
    acceptedFiles: epubAcceptedFiles,
    getRootProps: epubGetRootProps,
    getInputProps: epubGetInputProps,
  } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg"],
    },
    maxFiles: 1,
    onDrop: () => {
      setBackgroundImg(true);
    },
    // validator: numOfFiles,
  });

  const epubFileRejectionItems = epubFileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  const epubfile = epubAcceptedFiles.map((file) => URL.createObjectURL(file));

  const defaultValues = {
    title: "",
    author: "",
    genre: "",
    copiesAvailable: "",
    sypnopsis: "",
    files: [],
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues });

  const onSubmit = async (data) => {
    console.log("create book", data);
    try {
      const res = await axios.post(
        `http://${process.env.REACT_APP_SERVER_URL}/api/v1/book`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200 || res.status === 201) {
        console.log("Created book");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const uplaodBookImg = () => {
  //     console.log("upload book cover img");
  //   };

  //   const uplaodEpub = () => {
  //     console.log("upload epub");
  //   };

  //   const listItemStyle = { padding: 0.5, color: "#4b4b4b", display: "table" };
  const genres = [
    {
      value: "Adventure",
      label: "Adventure",
    },
    {
      value: "Romance",
      label: "Romance",
    },
  ];

  const backgroundImgStyle = {
    backgroundImage: `url(${imagefile})`,
    backgroundRepeat: "no-repeat",
  };
  return (
    <div>
      <SiteHeader />
      {/* <div>
        <input type="file" onChange={previewImage}/>
        <img src={this.state.file}/>
      </div> */}
      <Box sx={{ margin: "0 auto", width: "50%", marginTop: "4em" }}>
        <CategoriesSubheading categoryName={"Add a book"} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "45%" }}>
              <Box
                mb={3}
                style={backgroundImg ? backgroundImgStyle : {}}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  color: "#707070",
                  border: "1px dashed #bdbdbd",
                  fontSize: "14px",
                  cursor: "pointer",
                  flexWrap: "wrap",
                  height: "400px",
                  borderRadius: "25px",
                  margin: "0",
                }}
                {...imageGetRootProps({ className: "dropzone" })}
              >
                <input {...imageGetInputProps()} />
                <Typography variant="body2">
                  Drag 'n' drop book cover here, or click to select file
                </Typography>
              </Box>
              <Box>
                {imageFileRejectionItems.length > 0 ? (
                  <List
                    sx={{
                      display: "flex",
                      // flexWrap: "wrap",
                      gap: "10px",
                      width: "250px",
                    }}
                  >
                    {" "}
                    <ListItem
                      sx={{
                        display: "flex",
                        // flexWrap: "wrap",
                        alignItems: "baseline",
                        width: "fit-content",
                        padding: "0",
                      }}
                    >
                      <ErrorIcon style={{ color: "red" }} />
                    </ListItem>
                    {imageFileRejectionItems}
                  </List>
                ) : null}
              </Box>
            </Box>
            {/* right side inputs */}
            <Box sx={{ width: "50%" }}>
              {/* Title */}
              <Box mb={3}>
                <Controller
                  name="title" //actual input
                  control={control} //take place of the register RHF
                  render={({
                    //takes a function and rturn a react element
                    field, //this error will be displyed takes over form state errors
                  }) => (
                    <TextField
                      label={"Title"} //label in the box
                      variant="outlined"
                      fullWidth
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
              {/* Author */}
              <Box mb={3}>
                <Controller
                  name="author" //actual input
                  control={control} //take place of the register RHF
                  render={({
                    //takes a function and rturn a react element
                    field, //this error will be displyed takes over form state errors
                  }) => (
                    <TextField
                      label={"Author"} //label in the box
                      variant="outlined"
                      fullWidth
                      autoFocus
                      // error={!!error} //convert obj into a bool
                      // helperText={error ? error.message : null}
                      error={errors.password ? true : false}
                      helperText={errors.password?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
              {/* genres and copies */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Box mb={3} width={"60%"}>
                  <Controller
                    name="genre" //actual input
                    control={control} //take place of the register RHF
                    render={({
                      //takes a function and rturn a react element
                      field, //this error will be displyed takes over form state errors
                    }) => (
                      <TextField
                        select
                        label="Genre"
                        variant="outlined"
                        fullWidth
                        autoFocus
                        error={errors.genres ? true : false}
                        helperText={errors.genres?.message}
                        {...field}
                      >
                        {genres.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>
                <Box mb={3} width={"35%"}>
                  <Controller
                    name="copies" //actual input
                    control={control} //take place of the register RHF
                    render={({
                      //takes a function and rturn a react element
                      field, //this error will be displyed takes over form state errors
                    }) => (
                      <TextField
                        label="Copies Available"
                        variant="outlined"
                        fullWidth
                        type="number"
                        autoComplete="email"
                        autoFocus
                        error={errors.copies ? true : false}
                        helperText={errors.copies?.message}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mb={3}>
            <Controller
              name="sypnopsis" //actual input
              control={control} //take place of the register RHF
              render={({
                //takes a function and rturn a react element
                field, //this error will be displyed takes over form state errors
              }) => (
                <TextField
                  label={"Sypnopsis"} //label in the box
                  variant="outlined"
                  fullWidth
                  multiline
                  autoComplete="sypnopsis"
                  autoFocus
                  //   height="400px"
                  rows="3"
                  // error={!!error} //convert obj into a bool
                  // helperText={error ? error.message : null}
                  error={errors.sypnopsis ? true : false}
                  helperText={errors.sypnopsis?.message}
                  {...field}
                  inputProps={{
                    style: {
                      height: "300px",
                    },
                  }}
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
        <Box
          mb={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            color: "#707070",
            border: "1px dashed #bdbdbd",
            fontSize: "14px",
            cursor: "pointer",
            flexWrap: "wrap",
            height: "85px",
          }}
          {...epubGetRootProps({ className: "dropzone" })}
        >
          <input {...epubGetInputProps()} />
          <Typography variant="body2">
            Drag 'n' drop ypur epub file here, or click to select file
          </Typography>
          <List>{epubFileRejectionItems}</List>
        </Box>
      </Box>
    </div>
  );
};
