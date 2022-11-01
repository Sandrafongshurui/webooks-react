import React, { useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import UploadIcon from '@mui/icons-material/Upload'
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { SiteHeader, CategoriesSubheading } from '../components/Headers'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import globalStyle from '../global.module.css'

export const EditProfile = (props) => {
  const validationSchema = yup.object().shape({
    title: yup.string().min(1, 'Please include a title').required(),
    author: yup.string().min(4, 'Please include an author').required(),
    genreId: yup.number().min(1, 'Please select a genre').required(),
    copiesAvailable: yup
      .number()
      .min(1, 'Please state the number of copies available')
      .required(),
    sypnosis: yup.string().min(10, 'Please include a sypnosis').required(),
  })
  const [backgroundImg, setBackgroundImg] = useState(false)

  const {
    fileRejections: imageFileRejections,
    acceptedFiles: imageAcceptedFiles,
    getRootProps: imageGetRootProps,
    getInputProps: imageGetInputProps,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg'],
    },
    maxFiles: 1,
    onDrop: () => {
      setBackgroundImg(true)
    },
    multiple: false,
  })

  const imageFileRejectionItems = imageFileRejections.map(
    ({ file, errors }) => {
      return (
        <ListItem
          key={file.path}
          sx={{ display: 'flex', p: '0', flexWrap: 'wrap' }}
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
            sx={{ width: 'inherit', padding: '0', margin: '0' }}
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
      )
    },
  )

  const imagefile = imageAcceptedFiles.map((file) => URL.createObjectURL(file))

  const backgroundImgStyle = {
    backgroundImage: `url(${imagefile})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundBlendMode: 'overlay',
  }

  const propertyField = {
    width: '100%',
  }

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    genreId: 0,
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

  const onSubmit = async (data) => {
    // console.log("create book", data);
    try {
      const formData = new FormData()
      Object.keys(data).forEach((element) => {
        formData.append(element, data[element])
      })
      formData.append('file', imageAcceptedFiles[0])

      const res = await axios.patch(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        console.log('Edited Profile')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const genres = [
    {
      value: '0',
      label: 'Select',
    },
    {
      value: '11',
      label: 'Mystery',
    },
    {
      value: '12',
      label: 'Crime',
    },
    {
      value: '13',
      label: 'Family',
    },
    {
      value: '14',
      label: 'Thriller',
    },
    {
      value: '15',
      label: 'Psychological',
    },
    {
      value: '16',
      label: 'Biographies',
    },
    {
      value: '17',
      label: 'Fantasy',
    },
    {
      value: '18',
      label: 'Young Adult',
    },
    {
      value: '19',
      label: 'Classic',
    },
    {
      value: '20',
      label: 'Fiction',
    },
    {
      value: '21',
      label: 'Romance',
    },
    {
      value: '22',
      label: 'Adventure',
    },
  ]

  return (
    <div>
      <Box
        sx={{
          margin: '0 auto',
          width: '50%',
          marginTop: '4em',
          marginBottom: '4em',
        }}
      >
        <CategoriesSubheading categoryName={'Edit Profile'} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            mb={3}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '80%',
              gap: "23px"
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box
                mb={3}
                style={backgroundImg ? backgroundImgStyle : {}}
                sx={{
                  width: '150px',
                  color: '#3d3d3d',
                  border: '2px dashed #bdbdbd',
                  fontSize: '14px',
                  cursor: 'pointer',
                  flexWrap: 'wrap',
                  height: '150px',
                  borderRadius: '10%',
                  margin: '0',
                  '&:hover': {
                    backgroundColor: '#ffffff63',
                  },
                  margin: '0 auto',
                }}
                {...imageGetRootProps({ className: 'dropzone' })}
              >
                <input {...imageGetInputProps()} />
                {imageFileRejectionItems.length > 0 ? (
                  <List
                    sx={{
                      display: 'flex',
                      // flexWrap: "wrap",
                      gap: '10px',
                      width: '250px',
                    }}
                  >
                    {' '}
                    <ListItem
                      sx={{
                        display: 'flex',
                        // flexWrap: "wrap",
                        alignItems: 'baseline',
                        width: 'fit-content',
                        padding: '0',
                      }}
                    >
                      <ErrorIcon style={{ color: 'red' }} />
                    </ListItem>
                    {imageFileRejectionItems}
                  </List>
                ) : (
                  <List
                    sx={{
                      display: 'contents',
                      flexWrap: 'wrap',
                      width: '100%',
                      justifyContent: 'space-between',
                      padding: '1em',
                    }}
                  >
                    {' '}
                    <ListItem
                      sx={{
                        alignItems: 'center',
                        width: 'fit-content',
                        padding: '0',
                      }}
                    >
                      <Typography variant="subtitle1">
                        Upload book cover
                      </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        alignItems: 'center',
                        width: 'fit-content',
                        padding: '0',
                      }}
                    >
                      <UploadIcon
                        style={{ color: '#633bf6', marginLeft: '10px' }}
                      />
                    </ListItem>
                    {/* {epubFileRejectionItems} */}
                  </List>
                )}

                {/* <Typography variant="body2">
                  Drag 'n' drop book cover here, or click to select file
                </Typography> */}
              </Box>
            </Box>
            {/* right side inputs */}

            {/* first name */}
            <Box sx={propertyField}>
              <Controller
                name="firsteName" //actual input
                control={control} //take place of the register RHF
                render={({
                  //takes a function and rturn a react element
                  field, //this error will be displyed takes over form state errors
                }) => (
                  <TextField
                    label={'First Name'} //label in the box
                    variant="outlined"
                    fullWidth
                    // error={!!error} //convert obj into a bool
                    // helperText={error ? error.message : null}
                    error={errors.firsteName ? true : false}
                    helperText={errors.firsteName?.message}
                    {...field}
                  />
                )}
              />
            </Box>
            {/* last name */}
            <Box sx={propertyField}>
              <Controller
                name="lastName" //actual input
                control={control} //take place of the register RHF
                render={({
                  //takes a function and rturn a react element
                  field, //this error will be displyed takes over form state errors
                }) => (
                  <TextField
                    label={'Last Name'} //label in the box
                    variant="outlined"
                    fullWidth
                    // error={!!error} //convert obj into a bool
                    // helperText={error ? error.message : null}
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName?.message}
                    {...field}
                  />
                )}
              />
            </Box>
             {/* email */}
             <Box sx={propertyField}>
              <Controller
                name="email" //actual input
                control={control} //take place of the register RHF
                render={({
                  //takes a function and rturn a react element
                  field, //this error will be displyed takes over form state errors
                }) => (
                  <TextField
                    label={'Email'} //label in the box
                    variant="outlined"
                    fullWidth
                    // error={!!error} //convert obj into a bool
                    // helperText={error ? error.message : null}
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName?.message}
                    {...field}
                  />
                )}
              />
            </Box>
            {/* genres and copies */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box width={'60%'}>
                <Controller
                  name="genreId" //actual input
                  control={control} //take place of the register RHF
                  defaultValue="11"
                  render={({
                    //takes a function and rturn a react element
                    field, //this error will be displyed takes over form state errors
                  }) => (
                    <TextField
                      select
                      label="Genre"
                      variant="outlined"
                      fullWidth
                      error={errors.genreId ? true : false}
                      helperText={errors.genreId?.message}
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
            </Box>
          </Box>
          <button
            className={`${globalStyle.actionbutton} ${globalStyle.loginbutton}`}
            type="submit"
          >
            Edit
          </button>
        </form>
      </Box>
    </div>
  )
}
