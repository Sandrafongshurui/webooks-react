import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Avatar, IconButton } from '@mui/material'
import { CategoriesSubheading } from './Headers'
import globalStyle from '../global.module.css'
import axios from 'axios'
import { LoanReserveCard } from './LoanReserveCard'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

export const Profile = (props) => {
  const navigate = useNavigate()
  //   const [backgroundImg, setBackgroundImg] = useState(false)
  const [loans, setLoans] = useState(null)
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
        console.log('data', data)
        setUser(data)
      } else if (res.status === 403) {
        navigate('/login')
      }
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/loans`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        const data = await res.data
        console.log('data', data)
        setLoans(data)
      } else if (res.status === 403) {
        navigate('/login')
      }
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //   const backgroundImgStyle = {
  //     // backgroundImage: `url(${imagefile})`,
  //     backgroundRepeat: 'no-repeat',
  //     backgroundSize: 'cover',
  //     backgroundBlendMode: 'overlay',
  //   }

  // const genrePropertyField = {
  //   width: '80px',
  //   color: '#3d3d3d',
  //   border: '2px dashed #bdbdbd',
  //   height: '80px',
  //   borderRadius: '100%',
  // }

  //   const genres = [
  //     {
  //       value: '0',
  //       label: 'Select',
  //     },
  //     {
  //       value: '11',
  //       label: 'Mystery',
  //     },
  //     {
  //       value: '12',
  //       label: 'Crime',
  //     },
  //     {
  //       value: '13',
  //       label: 'Family',
  //     },
  //     {
  //       value: '14',
  //       label: 'Thriller',
  //     },
  //     {
  //       value: '15',
  //       label: 'Psychological',
  //     },
  //     {
  //       value: '16',
  //       label: 'Biographies',
  //     },
  //     {
  //       value: '17',
  //       label: 'Fantasy',
  //     },
  //     {
  //       value: '18',
  //       label: 'Young Adult',
  //     },
  //     {
  //       value: '19',
  //       label: 'Classic',
  //     },
  //     {
  //       value: '20',
  //       label: 'Fiction',
  //     },
  //     {
  //       value: '21',
  //       label: 'Romance',
  //     },
  //     {
  //       value: '22',
  //       label: 'Adventure',
  //     },
  //   ]

  const clickEditProfile = () => {
    navigate('/profile/edit')
  }

  return (
    <Box className={globalStyle.contentsbody}>
      {user && (
        <Box
          mb={3}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flexDirection: 'column',
            height: '80%',
            gap: '56px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              flexDirection: 'row',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Avatar
              sx={{
                width: '120px',
                background: 'linear-gradient(to right, #3D3DF4, #9A37F2)',
                fontSize: '50px',
                fontWeight: '300',
                height: '120px',
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
            <Box
              sx={{
                width: '80%',
                flexDirection: 'row',
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ textAlign: 'left', color: '#633bf6' }}>
                <Typography noWrap variant="h4" sx={{ color: '#633bf6' }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography noWrap variant="subtitle1" gutterBottom>
                  {user.email}
                </Typography>
              </Box>

              <IconButton color="primary" onClick={clickEditProfile}>
                <EditIcon
                  sx={{
                    color: '#633bf6',
                    fontSize: 40,
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <CategoriesSubheading categoryName={'Total Loans'} standard={true}/>
            <Typography noWrap variant="h6" sx={{textAlign:"left"}}>
              Total Loans: {user.loans.length}
            </Typography>
          </Box>
          <CategoriesSubheading categoryName={'Timeline'} standard={true}/>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 5, sm: 5, md: 5 }}
              columns={{ xs: 1, sm: 2, md: 3 }}
            >
              {loans &&
                loans.map((loanData) => (
                  <LoanReserveCard
                    data={loanData}
                    // actions={cardActions}
                    key={loanData.id}
                    isTimeline={true}
                  />
                ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}
