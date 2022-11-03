import React, { useState } from 'react'
import {
  CardContent,
  Card,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Divider,
  Link,
} from '@mui/material'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import globalStyle from '../global.module.css'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { BackArrow } from '../components/Headers'
import { toast } from 'react-toastify'

export const Register = (props) => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const eye = <FontAwesomeIcon icon={faEye} />
  // form validation rules
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(4, 'Mininum 4 characters')
      .required()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    lastName: yup
      .string()
      .min(2, 'Mininum 2 characters')
      .required()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    email: yup.string().email('Valid email is required').required(),
    password: yup
      .string()
      .required('Password is required')
      .min(4, 'Mininum 4 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)
  // const [catchError, setCatchError] = useState(null)
  const togglePasswordVisiblity = () => {
    setPasswordShow(passwordShow ? false : true)
  }
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShow(confirmPasswordShow ? false : true)
  }
  //actual input names
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

  const onSubmit = async (data) => {
    console.log('from register:', data)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        //set my cookie
        console.log(res.headers)
        console.log(res.cookie)
        // cookies.set("token", res.token, { path: "/" });
        console.log('Registered successfullly')
        toast.success('Registered successfully', {
          position: toast.POSITION.TOP_CENTER,
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  const mobile = {
    card: {
      padding: '2em',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0)',
      paddingTop: '0em',
    },
    logo: { width: '80%', objectFit: 'contain' },
    CardContent: {
      width: '100%',
      margin: '0 auto',
      p: '0 !important',
      paddingTop: '0em',
    },
    image: {
      width: '20%',
      m: '0 auto',
    },
  }
  const desktop = {
    card: {
      //   width: '45%',
      margin: '0 auto',
      padding: '2em',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
      display: 'flex',
      gap: '40px',
      borderRadius: '30px',
      marginTop: '6em',
      maxWidth: '400px',
    },
    logo: { width: '80%', objectFit: 'contain' },
    CardContent: {
      width: '400px',
      margin: '0 auto',
      pb: '0',
    },
    image: {
      width: '60%',
      m: '0 auto',
    },
  }

  let responsiveLayout = null
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop })
  return (
    <Box>
      <BackArrow />
      <Box>
        <Card sx={responsiveLayout.card}>
          <CardContent sx={responsiveLayout.CardContent}>
            {/* {catchError && (
              <Typography
                variant="subtitle1"
                className="author-name"
                sx={{ color: 'red' }}
                py={1}
              >
                {catchError}
              </Typography>
            )} */}
            <Typography variant="subtitle1" className="author-name" py={1}>
              Sign up for an account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={3}>
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
                      error={errors.firstName ? true : false}
                      helperText={errors.firstName?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box mb={3}>
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
              <Box mb={3}>
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
                      label={'Password'} //label in the box
                      variant="outlined"
                      fullWidth
                      placeholder="password"
                      type={passwordShow ? 'text' : 'password'}
                      // error={!!error} //convert obj into a bool
                      // helperText={error ? error.message : null}
                      error={errors.password ? true : false}
                      helperText={errors.password?.message}
                      {...field}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <i onClick={togglePasswordVisiblity}>{eye}</i>{' '}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="confirmPassword" //actual input
                  control={control} //take place of the register RHF
                  render={({
                    //takes a function and rturn a react element
                    field, //this error will be displyed takes over form state errors
                  }) => (
                    <TextField
                      label={'Confirm Psssword'} //label in the box
                      variant="outlined"
                      fullWidth
                      placeholder="password"
                      type={confirmPasswordShow ? 'text' : 'Password'}
                      // error={!!error} //convert obj into a bool
                      // helperText={error ? error.message : null}
                      error={errors.confirmPassword ? true : false}
                      helperText={errors.confirmPassword?.message}
                      {...field}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <i onClick={toggleConfirmPasswordVisiblity}>
                              {eye}
                            </i>{' '}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>

              <Link to="/bookshelf/loans">
                <button
                  className={`${globalStyle.actionbutton} ${globalStyle.loginbutton}`}
                  type="submit"
                >
                  Register
                </button>
              </Link>
            </form>
            <Divider
              sx={{
                width: '20px',
                margin: '0 auto',
                borderColor: '#6a6a6a',
                p: '1em',
              }}
            />
            <Typography variant="subtitle2" className="author-name" pt={3}>
              Already have an account?{' '}
              <Link component="button" variant="subtitle2" color={'#FF8865'}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
