import React from 'react'
import {
  Divider,
  Container,
  Typography,
  CardContent,
  CardActions,
  Card,
  Box,
} from '@mui/material'
import Image from 'mui-image'
import style from '../global.module.css'


export const BookActionCard = (props) => {
  const { title, bookImgUrl } = props.data
 //const {actionPresent , setActionPresent} = useState(`${props.action === "Borrow" ? "borrowing" : "reserving"}`)
  const handleClickAction = async () => {
    props.onSubmit(props.action)
  }
  let actionPresent = `${props.action === "Borrow" ? "borrowing" : "reserving"}`
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
                  src={bookImgUrl}
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
                <Box sx={{ width: '100%', margin: '0 auto' }}>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: 'left', m: '1em', }}
                  >
                    You are {actionPresent}
                    <Box sx={{ my: '0.5em' }}>{title}</Box>
                    for 21 days
                  </Typography>
                </Box>
                 {/* <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    m: '1em',
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Loans
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    2/10
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    m: '1em',
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Reserves
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    0/10
                  </Typography>
                </Box>  */}
                <Divider />
              </Box>
            </CardContent>
            <Box>
              <CardActions sx={{ justifyContent: 'center', my: '2em', p: '0' }}>
                <button
                  className={style.actionbutton}
                  onClick={handleClickAction}
                  type="submit"
                >
                  {props.action}
                </button>
              </CardActions>
            </Box>
          </Card>
        </Container>
      </Box>
    </div>
  )
}
