import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { CategoriesSubheading } from '../components/Headers'
import globalStyle from '../global.module.css'
import UploadIcon from '@mui/icons-material/Upload'
import axios from 'axios'
import { LoanReserveCard } from '../components/LoanReserveCard'

export const Profile = (props) => {
//   const [backgroundImg, setBackgroundImg] = useState(false)
  const [loans, setLoans] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/profile`,
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
      }
    }
    fetchApi()
  }, [])
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/loans`,
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
      }
    }
    fetchApi()
  }, [])
//   const backgroundImgStyle = {
//     // backgroundImage: `url(${imagefile})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundBlendMode: 'overlay',
//   }

  const genrePropertyField = {
    width: '80px',
    color: '#3d3d3d',
    border: '2px dashed #bdbdbd',
    height: '80px',
    borderRadius: '100%',
  }

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
            <Box
            //   style={backgroundImg ? backgroundImgStyle : {}}
              sx={{
                width: '150px',
                color: '#3d3d3d',
                border: '2px dashed #bdbdbd',
                fontSize: '14px',
                cursor: 'pointer',
                height: '150px',
                borderRadius: '100%',
                margin: '0',
                '&:hover': {
                  backgroundColor: '#ffffff63',
                },
              }}
            ></Box>
            <Box
              sx={{
                width: '75%',
                flexDirection: 'row',
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ textAlign: 'left', color: '#4b4b4b' }}>
                <Typography noWrap variant="h6">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography noWrap variant="body1" gutterBottom>
                  {user.email}
                </Typography>
              </Box>
              <Box>
                <UploadIcon style={{ color: '#633bf6', marginLeft: '10px' }} />
              </Box>
            </Box>
          </Box>
          <Box>
            <CategoriesSubheading categoryName={'Interests'} />
            <Box sx={genrePropertyField}>
              <Typography noWrap variant="h6">
                {user.genreId}
              </Typography>
            </Box>
          </Box>
          <CategoriesSubheading categoryName={'Timeline'} />
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
