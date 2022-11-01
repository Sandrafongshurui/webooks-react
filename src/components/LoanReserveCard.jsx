import Image from 'mui-image'
import { useNavigate } from 'react-router-dom'
import {
  Grid,
  Box,
  ListItemText,
  ListItem,
  Typography,
  Divider,
  List,
} from '@mui/material'

export const LoanReserveCard = (props) => {
  const { book, id } = props.data
  const navigate = useNavigate()
  const handleOpenBook = () => {
    console.log('Open book')
    navigate(`/bookshelf/loans/${id}/book/${book.id}/read`)
  }

  const handleManageLoan = () => {
    console.log('Open bottom sheet')
    props.manageLoan()
  }

const styleForTimeline= {
  paddingRight: 2, 
}
const styleForLoans = {
  paddingRight: 2, 
  height: "186px"
}

  const listItemStyle = { padding: 0.5, color: '#4b4b4b' }
  return (
    <Grid item xs={2} sm={1} key={props.id} sx={{ height: '338px' }}>
      <Box sx={{ width: '100%', textAlign: 'left', maxWidth: '271px' }}>

          <Box>
            <Typography noWrap variant="h6" style={{ color: '#4b4b4b' }}>
              {book.title}{' '}
            </Typography>
            {/* <Typography noWrap variant="body1" style={{color:"#4b4b4b"}} gutterBottom>
              by {book.author}
            </Typography> */}
          </Box>

        <Box
          sx={{
            display: 'Flex',
            maxWidth: '271px',
            maxHeight: '186px',
            marginTop: '1.5em',
          }}
        >
          <Box sx={props.isTimeline? styleForTimeline : styleForLoans}>
            <Image
              src={`${book.bookImgUrl}`}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              {!props.isTimeline && (
                <div>
                  <Divider />
                  <ListItem
                    alignItems="flex-start"
                    sx={listItemStyle}
                    button
                    onClick={handleOpenBook}
                  >
                    <ListItemText primary="Open Book" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    alignItems="flex-start"
                    sx={listItemStyle}
                    button
                    onClick={handleManageLoan}
                  >
                    <ListItemText primary="Manage Loan" />
                  </ListItem>
                </div>
              )}

              <Divider />
              <ListItem alignItems="flex-start" sx={listItemStyle}>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body3"
                      color="text.secondary"
                    >
                      {props.isTimeline
                        ? 'Returned on due date'
                        : ' Due in 21 Days'}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start" sx={listItemStyle}>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body3"
                      color="text.secondary"
                    >
                      {props.isTimeline ? 'september 2022' : ' Borrowed tODAT'}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
            </List>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}
