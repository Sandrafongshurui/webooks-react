import React, { useState, useEffect, useContext } from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
} from '@mui/material'
import { BackArrow } from '../components/Headers'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import globalStyle from '../global.module.css'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../components/context/Context'

export const EditProfile = (props) => {
  const { editProfile } = useContext(UserContext)
  const navigate = useNavigate()
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => {
    setIsHovering(true)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }
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
    onDropAccepted: () => {
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
      )
    },
  )

  const imagefile = imageAcceptedFiles.map((file) => URL.createObjectURL(file))

  const backgroundImgStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundBlendMode: 'overlay',
  }

  const imageInputBackground = () => {
    //if fetch data, and has image profile and is not a new image input
    if (backgroundImg) {
      return { ...backgroundImgStyle, backgroundImage: `url(${imagefile})` }
    } else if (user.profileImgUrl !== null) {
      return {
        ...backgroundImgStyle,
        backgroundImage: `url(${user.profileImgUrl})`,
      }
    } else {
      return null
    }
  }

  const propertyField = {
    width: '100%',
  }
  const validationSchema = yup.object().shape({
    firstName: yup.string().min(2).required(),
    lastName: yup.string().min(2).required(),
    email: yup.string().email().required(),
  })

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    profileImgUrl: '',
  }

  const [user, setUser] = useState(null)
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        const data = await res.data
        setUser(data)
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          profileImgUrl: data.profileImgUrl,
        })
      } else if (res.status === 403) {
        navigate('/login')
      }
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data) => {
    // console.log("create book", data);
    const loading = toast.loading('Updating...')
    try {
      const formData = new FormData()
      Object.keys(data).forEach((element) => {
        formData.append(element, data[element])
      })
      formData.append('file', imageAcceptedFiles[0])

      const res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        console.log('Edited')
        console.log(data)
        if (res.data.profileImgUrl === ' ') {
          editProfile(data.firstName, data.lastName, data.profileImgUrl)
        } else {
          editProfile(data.firstName, data.lastName, res.data.profileImgUrl)
        }
        toast.update(loading, {
          render: 'Edited profile successfullly',
          type: 'success',
          isLoading: false,
          position: toast.POSITION.TOP_CENTER,
        })
        // toast.success('Edited profile successfullly', {
        //   position: toast.POSITION.TOP_CENTER,
        // })
        navigate('/profile')
      }
    } catch (error) {
      console.log(error)

      toast.update(loading, {
        render: error.response.data.error,
        type: error,
        isLoading: false,
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/')
    }
  }
  // const genres = [
  //   {
  //     value: '0',
  //     label: 'Select',
  //   },
  //   {
  //     value: '11',
  //     label: 'Mystery',
  //   },
  //   {
  //     value: '12',
  //     label: 'Crime',
  //   },
  //   {
  //     value: '13',
  //     label: 'Family',
  //   },
  //   {
  //     value: '14',
  //     label: 'Thriller',
  //   },
  //   {
  //     value: '15',
  //     label: 'Psychological',
  //   },
  //   {
  //     value: '16',
  //     label: 'Biographies',
  //   },
  //   {
  //     value: '17',
  //     label: 'Fantasy',
  //   },
  //   {
  //     value: '18',
  //     label: 'Young Adult',
  //   },
  //   {
  //     value: '19',
  //     label: 'Classic',
  //   },
  //   {
  //     value: '20',
  //     label: 'Fiction',
  //   },
  //   {
  //     value: '21',
  //     label: 'Romance',
  //   },
  //   {
  //     value: '22',
  //     label: 'Adventure',
  //   },
  // ]
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

  return (
    <div>
      {' '}
      <BackArrow />
      <Box
        sx={{
          margin: '0 auto',
          width: '400px',
          marginTop: '4em',
          marginBottom: '4em',
        }}
      >
        {user && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              mb={3}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '80%',
                gap: '23px',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Avatar
                  component={Paper}
                  onPointerOver={handleMouseOver}
                  onPointerOut={handleMouseOut}
                  mb={3}
                  elevation={2}
                  style={imageInputBackground()}
                  sx={{
                    width: '150px',
                    background: 'linear-gradient(to right, #3D3DF4, #9A37F2)',
                    fontSize: '50px',
                    fontWeight: '300',
                    height: '150px',
                    margin: '0 auto',
                    cursor: 'pointer',
                    '&:hover': {
                      // background: 'linear-gradient(to right, #161693, #531789)',
                      backgroundColor: '#140834',
                      backgroundBlendMode: 'overlay',
                    },
                  }}
                  {...imageGetRootProps({
                    className: 'dropzone',
                  })}
                >
                  <input {...imageGetInputProps()} />
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
                        flexDirection: 'column',
                        textAlign: 'center',
                      }}
                    >
                      {isHovering ? (
                        <div>
                          <EditIcon
                            style={{
                              fontSize: '1em',
                              color: 'white',
                              margin: '0',
                            }}
                          />
                          <Typography variant="subtitle2">
                            Choose Photo
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          {user.profileImgUrl !== null || backgroundImg ? (
                            ' '
                          ) : (
                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: '50px', fontWeight: '300' }}
                            >
                              {' '}
                              {user.firstName.charAt(0)}
                              {user.lastName.charAt(0)}{' '}
                            </Typography>
                          )}
                        </div>
                      )}
                    </ListItem>
                  </List>
                </Avatar>
                {imageFileRejectionItems.length > 0 && (
                  <List
                    sx={{
                      display: 'flex',
                      // flexWrap: "wrap",
                      gap: '10px',
                      width: '250px',
                      margin: '0 auto',
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
                )}
              </Box>
              {/* right side inputs */}

              {/* first name */}
              <Box sx={propertyField}>
                <Controller
                  name="firstName" //actual input
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
                {/* <Box width={'60%'}>
                <Controller
                  name="genreId" //actual input
                  control={control} //take place of the register RHF
                  defaultValue="11"
                  render={({
                    //takes a function and rturn a react element
                    field, //this error will be displyed takes over form state errors
                  }) => (
                    <ToggleButtonGroup
                      // value={alignment}
                      // exclusive
                      // onChange={handleAlignment}
                      aria-label="text alignment"
                      {...field}
                    >
                      <ToggleButton
                        value="11"
                        aria-label="left"
                        sx={genrePropertyField}
                      >
                        <Box sx={{borderRadius"50px"}}>genre</Box>
                      </ToggleButton>
                      <ToggleButton
                        value="12"
                        aria-label="left"
                        sx={genrePropertyField}
                      >
                        genre
                      </ToggleButton>
                      <ToggleButton
                        value="13"
                        aria-label="left"
                        sx={genrePropertyField}
                      >
                        genre
                      </ToggleButton>
                      <ToggleButton
                        value="14"
                        aria-label="left"
                        sx={genrePropertyField}
                      >
                        genre
                      </ToggleButton>
                      <ToggleButton
                        value="15"
                        aria-label="left"
                        sx={genrePropertyField}
                      >
                        genre
                      </ToggleButton>
                      <ToggleButton
                        value="16"
                        aria-label="left"
                        sx={genrePropertyField}
                      >
                        genre
                      </ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
              </Box> */}
              </Box>
            </Box>
            <button
              className={`${globalStyle.actionbutton} ${globalStyle.loginbutton}`}
              type="submit"
            >
              Save
            </button>
          </form>
        )}
      </Box>
    </div>
  )
}
