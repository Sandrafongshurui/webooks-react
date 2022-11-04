import React, { useState, useEffect } from 'react'

import { LoanReserveCard } from './LoanReserveCard'
import { CategoriesSubheading } from './Headers'
import axios from 'axios'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import globalStyle from '../global.module.css'


export const BookshelfReservesContent = (props) => {
  const navigate = useNavigate()

  // const [cardActions, setCardActions] = useState(null);
  // const [bottomSheetDetails, setBottomSheetDatails] = useState(null);
  const [reserves, setReserves] = useState(null)

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/reserves`,
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
      }else if (res.status === 403){
        navigate("/login")
      }
    }
    fetchApi()
  }, [])

  const handleCancelReserve = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/reserve/${id}/cancel`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        console.log('cancelled reservation')
        toast.success('Cancelled successfullly', {
          position: toast.POSITION.TOP_CENTER,
        })
        window.location.reload(false)
      }else if (res.status === 403){
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  return (
    <Box className={globalStyle.contentsbody}>
      <CategoriesSubheading categoryName={'Fully booked'} standard={true}/>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 1 }}
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
