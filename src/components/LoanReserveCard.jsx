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
  const { book, id, dueDate, createdAt } = props.data
  const navigate = useNavigate()

  const handleCancel = () => {
    console.log('cancel reservation')
    props.cancelReserve(id)
  }
  const handleOpenBook = () => {
    console.log('Open book')
    navigate(`/bookshelf/loans/${id}/book/${book.id}/read`)
  }

  const handleManageLoan = () => {
    console.log('Open bottom sheet')
    props.manageLoan()
  }

  const styleForTimeline = {
    paddingRight: 2,
  }
  const styleForLoans = {
    paddingRight: 2,
    height: '186px',
  }
  const getDateString = (value) => {
    const date = new Date(value)
    return date.toLocaleDateString()
  }

  const loanDueDate = (value) => {
    if (props.isTimeline) {
      return 'Returned on due date'
    } else if (props.isReserve) {
      return `Placed on ${getDateString(createdAt)}`
    } else {
      return `Due: ${getDateString(value)}`
    }
  }

  const listItemStyle = { padding: 0.5, color: '#4b4b4b' }
  return (
    <Grid item xs={2} sm={1} key={props.id} sx={{ height: '338px' }}>
      <Box sx={{ textAlign: 'left', maxWidth: '400px' }}>
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
          <Box sx={props.isTimeline ? styleForTimeline : styleForLoans}>
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
                    onClick={props.isReserve ? handleCancel : handleOpenBook}
                  >
                    <ListItemText
                      primary={props.isReserve ? 'Cancel' : 'Open Book'}
                    />
                  </ListItem>
                </div>
              )}
              {!props.isTimeline && !props.isReserve && (
                <div>
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
                      {loanDueDate(dueDate)}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
              {!props.isReserve && (
                <div>
                  <ListItem alignItems="flex-start" sx={listItemStyle}>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body3"
                          color="text.secondary"
                        >
                          Borrowed:<></>
                          {props.isTimeline
                            ? 'september 2021'
                            : getDateString(createdAt)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </div>
              )}
            </List>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}
