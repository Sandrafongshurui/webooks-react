import React, { useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import {
  Divider,
  Container,
  Typography,
  CardContent,
  CardActions,
  Card,
  Box,
  Icon,
} from '@mui/material'
import Image from 'mui-image'
import globalStyle from '../global.module.css'
import { AccessTime } from '@mui/icons-material'
import datesBetween from 'dates-between'
import { toast } from 'react-toastify'


export const ManageLoanCard = (props) => {
  // const navigate = useNavigate()
  const { book, dueDate, id, bookId } = props.loanData
  const [renewMsg, setRenewMsg] = useState(null)

  const handleReturnLoan = async () => {
    console.log('Return loan')
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/loan/${id}/book/${bookId}/return`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        console.log('return loan sucessfully')
        toast.success('Return loan successfullly', {
          position: toast.POSITION.TOP_CENTER,
        })
        // window.location.reload(false)
        // navigate("/bookshelf/loans")
        props.returnLoan(true)
        props.bottomSheetOpen(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  
  }
  const getDatesInRange = (startDate, endDate) => {
    const arrayOfDates = []
    for (const date of datesBetween(startDate, endDate)) {
      arrayOfDates.push(date)
    }
    return arrayOfDates
  }

  const handleRenewLoan = async () => {
    //check the days b
    const arrayOfDates = getDatesInRange(new Date(), new Date(dueDate))
    const daysToRenewal = arrayOfDates.length - 4

    //only less than 3 days then can renew
    if (arrayOfDates.length > 4) {
      setRenewMsg(
        `It's too early for renewal! You will be able to renew it in ${daysToRenewal} days`,
      )
    } else {
      console.log('renew loan')
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/loan/${id}/renew`,
          { loanId: `${id}` },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )
        if (res.status === 200 || res.status === 201) {
          console.log(res.data)
          console.log('sucessfully renew loan')
          toast.success('Renew successfullly', {
            position: toast.POSITION.TOP_CENTER,
          })
          window.location.reload(false)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
    }
  }

  const getDateString = () => {
    const date = new Date(dueDate)
    return date.toLocaleDateString()
  }

  return (
    <div>
      <Box>
        <Container sx={{ my: 0 }}>
          <Card
            sx={{
              width: '450px',
              margin: '0 auto',
              py: '4em',
              px: '1em',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0)',
            }}
          >
            <CardContent
              sx={{
                width: '100%',
                height: '240px',
                margin: '0 auto',
                p: '0',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Image
                  showLoading={true}
                  sx={{
                    my: '2em',
                    borderRadius: '5%',
                    width: '100%',
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                  }}
                  src={book.bookImgUrl}
                />
              </Box>

              <Box
                sx={{
                  width: '60%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Divider />
                {/* insert  content here */}
                <Box sx={{ width: '100%', margin: '0 auto' }}>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    by {book.author}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Due on : {getDateString()}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <Icon edge="end" aria-label="comments">
                      <AccessTime />
                    </Icon>
                  </Typography>
                </Box>

                <Divider />
              </Box>
            </CardContent>
            <Box>
              <CardActions sx={{ justifyContent: 'center', my: '2em', p: '0' }}>
                <button
                  className={globalStyle.actionbutton}
                  onClick={handleReturnLoan}
                  type="submit"
                >
                  Return Loan
                </button>
              </CardActions>
              <CardActions sx={{ justifyContent: 'center', my: '2em', p: '0' }}>
                {renewMsg ? (
                  <button
                    className={globalStyle.actionbuttonDisabled}
                    //   onClick={handleClickAction}
                    sx={{}}
                  >
                    {renewMsg}
                  </button>
                ) : (
                  <button
                    className={globalStyle.actionbuttonOutline}
                    //   onClick={handleClickAction}
                    type="submit"
                    onClick={handleRenewLoan}
                  >
                    Renew Loan
                  </button>
                )}
              </CardActions>
            </Box>
          </Card>
        </Container>
      </Box>
    </div>
  )
}
