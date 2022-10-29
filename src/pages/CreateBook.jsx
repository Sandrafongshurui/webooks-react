import React, { useState} from "react";
import {
  Box,
  TextField,
  Typography,
  Link,
  MenuItem,
  List
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
    email: yup.string().email("Valid email is required").required(),
    password: yup.string().min(4, "Mininum 4 characters").required(),
  });
  const [backgroundImg, setBackgroundImg] = useState(false);
  const numOfFiles = () => {
    if (acceptedFiles.length > 1) {
      return {
        code: "Too many files",
        message: `Only 1 file is allowed`,
      };
    }
    return null;
  };

  const { fileRejections, acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/png": [".png", ".jpg"],
      },
      maxFiles: 1,
      onDrop: () => {
        setBackgroundImg(true);
      },
      validator: numOfFiles,
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  //   useEffect(() => {
  //     console.log("revoke url");
  //     URL.revokeObjectURL(imagePreview);
  //   }, [imagePreview]);
  //   const thumbs = files.map(file => (
  //     <div style={thumb} key={file.name}>
  //       <div style={thumbInner}>
  //         <img
  //           src={imagefile.preview}
  //           style={img}
  //           // Revoke data uri after image is loaded
  //           onLoad={() => { URL.revokeObjectURL(imagefile.preview) }}
  //         />
  //       </div>
  //     </div>
  //   ));

  const imagefile = acceptedFiles.map((file) => URL.createObjectURL(file));

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
      <Box sx={{ margin: "0 auto", width: "70%", marginTop: "4em" }}>
        <CategoriesSubheading categoryName={"Add a book"} />
        <Box
          mb={3}
          style={backgroundImg ? backgroundImgStyle : {}}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
            color: "#707070",
            border: "1px dashed #bdbdbd",
            fontSize: "14px",
            cursor: "pointer",
            flexWrap: "wrap",
            height: "305px",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <Typography variant="body2">
            Drag 'n' drop some files here, or click to select files
          </Typography>
          <List>{fileRejectionItems}</List>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Box mb={3}>
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
          <Box mb={3}>
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
      </Box>
    </div>
  );
};
