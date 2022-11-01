import React, { useState, useEffect } from 'react'

import { LoanReserveCard } from './LoanReserveCard'
import { CategoriesSubheading } from './Headers'
import axios from 'axios'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const BookshelfReservesContent = (props) => {
    const navigate = useNavigate()

  // const [cardActions, setCardActions] = useState(null);
  // const [bottomSheetDetails, setBottomSheetDatails] = useState(null);
  const [reserves, setReserves] = useState(null)

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/reserves`,
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
        setReserves(data)
      }
    }
    fetchApi()
  }, [])

  const handleCancelReserve = async (id) => {
    const res = await axios.delete(
      `https://${process.env.REACT_APP_SERVER_URL}/api/v1/reserve/${id}/cancel`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    if (res.status === 200 || res.status === 201) {
      console.log('cancelled reservation')
    //   props.tab("reserves")
      navigate("/bookshelf/loans")
    }
  }

  return (
    <Box sx={{ margin: '0 auto', width: '80%', marginTop: '4em' }}>
      <CategoriesSubheading categoryName={'Fully booked'} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 5, sm: 5, md: 5 }}
          columns={{ xs: 1, sm: 2, md: 3 }}
        >
          {reserves &&
            reserves.map((reservesData) => (
              <LoanReserveCard
                data={reservesData}
                // actions={cardActions}
                isReserve={true}
                // isTimeline={true}
                cancelReserve={(value) => handleCancelReserve(value)}
                key={reservesData.id}
              />
            ))}
        </Grid>
      </Box>
    </Box>
  )
}
