import React, { useState } from 'react'
import {
  Divider,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  CardContent,
  CardActions,
  Card,
  Box,
  Icon,
} from '@mui/material'
import Image from 'mui-image'
import style from '../global.module.css'
import { AccessTime } from '@mui/icons-material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

export const ManageLoanCard = (props) => {
  const { book, dueDate } = props.loanData
  const handleReturnLoan = () => {
    console.log('click manage loan')
  }

  const handleRenewLoan = () => {
    console.log('click return loan')
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
                  className={style.actionbutton}
                  onClick={handleReturnLoan}
                  type="submit"
                >
                  Return Loan
                </button>
              </CardActions>
              <CardActions sx={{ justifyContent: 'center', my: '2em', p: '0' }}>
                <button
                  className={style.actionbuttonDisabled}
                  //   onClick={handleClickAction}
                  type="submit"
                  onClick={handleRenewLoan}
                >
                  Renew Loan
                </button>
              </CardActions>
            </Box>
          </Card>
        </Container>
      </Box>
    </div>
  )
}
