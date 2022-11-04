import {
  Box,
  IconButton,
  Menu,
  Tooltip,
  Divider,
  MenuItem,
  Tab,
  Tabs,
  Avatar,
  Typography,
} from '@mui/material'
import Image from 'mui-image'
import style from './Headers.module.css'
import globalStyle from '../global.module.css'
import React, { useState, useContext, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@mui/icons-material/Menu'
import webooksLogo from '../assets/webooks_logo.png'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from './context/Context'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'

export const Logo = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 })
  const navigate = useNavigate()
  const mobile = {
    font: { fontSize: 32, margin: 'auto 0' },
    logo: {
      width: '50%',
      objectFit: 'contain',
      alignItems: 'self-start',
      animation: 'none',
    },
    header: { width: '90%', margin: '0 auto' },
  }
  const desktop = {
    font: { fontSize: 40, margin: 'auto 0' },
    logo: {
      width: '80%',
      objectFit: 'contain',
      alignItems: 'self-start',
      animation: 'none',
    },
    header: { width: '70%', margin: '0 auto' },
  }
  let responsiveLayout = null
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop })
  return (
    <Box sx={{ width: '45px', alignItems: 'self-start' }}>
      <Image
        style={responsiveLayout.logo}
        sx={{ cursor: 'pointer' }}
        src={webooksLogo}
        onClick={() => navigate('/')}
      />
    </Box>
  )
}

export const SiteHeader = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 })

  const mobile = {
    font: { fontSize: 32, margin: 'auto 0' },
    logo: { width: '50%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '90%', margin: '0 auto' },
  }
  const desktop = {
    font: { fontSize: 40, margin: 'auto 0' },
    logo: { width: '80%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '70%', margin: '0 auto' },
  }
  let responsiveLayout = null
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop })
  return (
    <div>
      <Box sx={{ boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', py: '0.5em' }}>
        <Box className={style.bookshelfheader} sx={responsiveLayout.header}>
          <Box>
            <Box sx={{ display: 'flex' }}>
              <Logo />

              <Box style={responsiveLayout.font} className={globalStyle.h2}>
                <span style={{ fontWeight: '100' }}>w</span>ebooks
              </Box>
            </Box>
          </Box>

          <SiteHeaderDropDownMenu />
        </Box>
      </Box>
    </div>
  )
}

export const SiteHeaderDropDownMenu = () => {
  const cookies = new Cookies()
  const { user, logout, login } = useContext(UserContext)
  console.log(user)
  const [anchorEl, setAnchorEl] = useState(null)
  // const [authUser] = useState(true)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  useEffect(() => {
    const setUserInContext = () => {
      const token = cookies.get('user_token')
      if (!token) {
        return navigate('/')
      }

      const user = jwt_decode(token)
      console.log(user)
      login(
        user.data.firstName,
        user.data.lastName,
        user.data.profileImgUrl,
        user.data.isLibrarian,
      )
    }
    setUserInContext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    logout()
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/logout/`,
        { data: 'nodata' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        //remove my cookie
        cookies.remove('user_token', res.data.token, {
          path: '/',
        })
        console.log('Logout successfullly')
        toast.success('Logout successfullly', {
          position: toast.POSITION.TOP_CENTER,
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/')
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }
  const mobile = {
    logo: {
      fontSize: 25,
      alignItems: 'self-start',
    },
  }
  const desktop = {
    logo: {
      fontSize: 40,
      alignItems: 'self-start',
    },
  }
  const isMobile = useMediaQuery({ maxWidth: 900 })

  let responsiveLayout = null
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop })
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Login">
          <IconButton
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user.auth ? (
              <Box sx={{ display: 'flex', p: 0 }}>
                <Typography sx={{ margin: 'auto 0', pr: '1em' }}>
                  {user.firstName}
                </Typography>
                <Avatar
                  sx={{
                    width: '40px',
                    background: 'linear-gradient(to right, #3D3DF4, #9A37F2)',
                    fontSize: '18px',
                    fontWeight: '300',
                    height: '40px',
                    margin: '0',
                  }}
                  src={user.profileImgUrl}
                >
                  {user.profileImgUrl === null ? (
                    <div>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </div>
                  ) : (
                    ''
                  )}
                </Avatar>
              </Box>
            ) : (
              <MenuIcon
                sx={responsiveLayout.logo}
                style={{ fill: '#633bf6' }}
              />
            )}
          </IconButton>
          {/* <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            Login
          </IconButton> */}
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '6px',
            width: '150px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 18,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user.auth && (
          <div>
            <MenuItem
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/bookshelf/loans')}
            >
              Bookshelf
            </MenuItem>
            <MenuItem
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/profile')}
            >
              Profile
            </MenuItem>
            <MenuItem disabled sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              Search
            </MenuItem>

            <MenuItem  disabled sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              Notifications
            </MenuItem>
            <Divider />
            {user.isLibrarian && (
              <div>
                <MenuItem
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate('/books/add-book')}
                >
                  Add a book
                </MenuItem>
                <Divider />
              </div>
            )}

            <MenuItem sx={{ cursor: 'pointer' }} onClick={handleLogout}>
              Logout
            </MenuItem>
          </div>
        )}
        {!user.auth && (
          <MenuItem sx={{ cursor: 'pointer' }} onClick={handleLogin}>
            Login
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  )
}

export const CategoriesSubheading = (props) => {
  const navigate = useNavigate()
  return (
    <Box className={style.container}>
      <Box className={style.category}>
        {!props.hasViewMore && !props.standard && (
          <Link
            sx={{
              fontSize: 30,
              color: '#5c3ae9',
              cursor: 'pointer',
            }}
            onClick={() => navigate(-1)}
          >
            {' '}
            {'<'}{' '}
          </Link>
        )}
        {props.categoryName}
      </Box>

      {props.hasViewMore && !props.standard && (
        <Link to={`${props.linkPage}`}>
          <Box className={style.viewmore}>View More</Box>
        </Link>
      )}

      <Box className={style.background}></Box>
      <Divider className={style.divider} />
    </Box>
  )
}

export const BookshelfHeader = (props) => {
  const navigate = useNavigate()
  const [value, setValue] = useState(props.currentTab)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    props.selectedTab(newValue)
    navigate(`/bookshelf/${newValue}`)
  }

  const isMobile = useMediaQuery({ maxWidth: 900 })

  const mobile = {
    font: { fontSize: 32, margin: 'auto 0' },
    logo: { width: '50%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '90%', margin: '0 auto' },
  }
  const desktop = {
    font: { fontSize: 40, margin: 'auto 0' },
    logo: { width: '80%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '70%', margin: '0 auto' },
  }
  let responsiveLayout = null
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop })
  return (
    <div>
      <Box sx={{ boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', py: '0.5em' }}>
        <Box className={style.bookshelfheader} sx={responsiveLayout.header}>
          <Box>
            <Box sx={{ display: 'flex' }}>
              <Logo />

              <Box style={responsiveLayout.font} className={globalStyle.h2}>
                <span style={{ fontWeight: '100' }}>Book</span>shelf
              </Box>
            </Box>

            <Box
              sx={{
                color: ' #6238f2',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: '900',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#6238f2',
                    fontWeight: 'bold',
                  },
                }}
                // indicatorColor="secondary"
                // aria-label="secondary tabs example"
              >
                <Tab value="loans" label="Loans" />
                <Tab value="reserves" label="Reserves" />
                {/* <Tab value="favourites" label="Favourites" /> */}
              </Tabs>
            </Box>
          </Box>

          <SiteHeaderDropDownMenu />
        </Box>
      </Box>
    </div>
  )
}

export const ProfileHeader = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 900 })

  const mobile = {
    font: { fontSize: 32, margin: 'auto 0' },
    logo: { width: '50%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '90%', margin: '0 auto' },
  }
  const desktop = {
    font: { fontSize: 40, margin: 'auto 0' },
    logo: { width: '80%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '70%', margin: '0 auto' },
  }
  let responsiveLayout = null
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop })
  return (
    <div>
      <Box sx={{ boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', py: '0.5em' }}>
        <Box className={style.bookshelfheader} sx={responsiveLayout.header}>
          <Box>
            <Box sx={{ display: 'flex' }}>
              <Logo />

              <Box style={responsiveLayout.font} className={globalStyle.h2}>
                <span style={{ fontWeight: '100' }}>Pro</span>file
              </Box>
            </Box>
          </Box>

          <SiteHeaderDropDownMenu />
        </Box>
      </Box>
    </div>
  )
}

export const BackArrow = () => {
  const navigate = useNavigate()
  return (
    <Link onClick={() => navigate(-1)}>
      <Box sx={{ display: 'flex' }}>
        <Box
          className={globalStyle.triangletopleft}
          sx={{
            background:
              'https://w7.pngwing.com/pngs/336/105/png-transparent-arrow-free-content-quiver-arrow-line-s-angle-text-bow-and-arrow.png',
          }}
        />
        <ArrowBackRoundedIcon
          sx={{ fontSize: 30 }}
          className={globalStyle.backArrow}
        />
      </Box>
    </Link>
  )
}

export const AddBookHeader = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 900 })

  const mobile = {
    font: { fontSize: 32, margin: 'auto 0' },
    logo: { width: '50%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '90%', margin: '0 auto' },
  }
  const desktop = {
    font: { fontSize: 40, margin: 'auto 0' },
    logo: { width: '80%', objectFit: 'contain', alignItems: 'self-start' },
    header: { width: '70%', margin: '0 auto' },
  }
  let responsiveLayout = null
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop })
  return (
    <div>
      <Box sx={{ boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', py: '0.5em' }}>
        <Box className={style.bookshelfheader} sx={responsiveLayout.header}>
          <Box>
            <Box sx={{ display: 'flex' }}>
              <Logo />

              <Box style={responsiveLayout.font} className={globalStyle.h2}>
                <span style={{ fontWeight: '100' }}>Add a</span> book
              </Box>
            </Box>
          </Box>

          <SiteHeaderDropDownMenu />
        </Box>
      </Box>
    </div>
  )
}
