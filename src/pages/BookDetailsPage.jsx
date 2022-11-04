import React, { useState, useEffect, useContext } from 'react'
import { SiteHeader, CategoriesSubheading } from '../components/Headers'
import Image from 'mui-image'
import axios from 'axios'
import {
  Grid,
  Box,
  ListItemText,
  ListItem,
  Typography,
  Divider,
  List,
} from '@mui/material'
import style from '../global.module.css'
import { BookActionCard } from '../components/BookActionCard'
import Sheet from 'react-modal-sheet'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../components/context/Context'
import { type } from '@testing-library/user-event/dist/type'

export const BookDetailsPage = (props) => {
  const { user } = useContext(UserContext)
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [action, setAction] = useState('')
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const navigate = useNavigate()

  const handleBorrowBook = () => {
    setBottomSheetOpen(true)
  }
  const handleSubmit = (action) => {
    action === 'Borrow' ? handleBorrow() : handleReserve()
  }

  const handleBorrow = async () => {
    console.log('borrow book')
    //fetch the post loan api
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/loan/book/${bookId}`,
        { body: 'nodata' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        console.log('Borrowed sucessfully')
        toast.success('Borrowed sucessfully', {
          position: toast.POSITION.TOP_CENTER,
        })
        navigate('/bookshelf/loans')
      } else if (res.status === 403) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  const handleReserve = async () => {
    console.log('reserve book')
    //fetch the post loan api
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/reserve/book/${bookId}`,
        { body: 'nodata' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200 || res.status === 201) {
        if (res.data === 'Reserve already exists') {
          toast.error('You can only reserve a book once', {
            position: toast.POSITION.TOP_CENTER,
          })
          setBottomSheetOpen(false)
        } else {
          console.log('reserved sucessfully')
          toast.success('Reserved successfullly', {
            position: toast.POSITION.TOP_CENTER,
          })
          navigate('/bookshelf/reserves')
        }
      } else if (res.status === 403) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const handleManageLoan = () => {
    console.log('add to favourites')
  }
  //fetch api for show bool
  useEffect(() => {
    console.log('get book')
    const fetchApi = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/books/${bookId}`,
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
        setBook(data)
        setAction(getAction(data.copiesAvailable))
      } else if (res.status === 403) {
        navigate('/login')
      }
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getAction = (copiesAvailable) => {
    if (copiesAvailable > 0) {
      return 'Borrow'
    }
    return 'Reserve'
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const listItemStyle = { padding: 0.5, color: '#4b4b4b', display: 'table' }
  return (
    <div>
      <SiteHeader />
      {book && (
        <Box className={style.contentsbody}>
          <CategoriesSubheading categoryName={book.title} standard={true} />
          <Grid>
            <Box sx={{ width: '100%', textAlign: 'left', maxWidth: '244px' }}>
              <Box
                sx={{
                  display: 'Flex',
                  width: '577px',
                  maxHeight: '400px',
                  marginTop: '1.5em',
                }}
              >
                <Box sx={{ paddingRight: 2, height: '400px', width: '50%' }}>
                  <Image
                    src={`${book.bookImgUrl}`}
                    style={{ objectFit: 'cover', width: '100%' }}
                  />
                </Box>
                <Box sx={{ paddingRight: 2, height: '400px', width: '50%' }}>
                  <List
                    sx={{
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Divider />
                    {user.auth ? (
                      <ListItem
                        alignItems="flex-start"
                        sx={listItemStyle}
                        button
                        onClick={handleBorrowBook}
                      >
                        <ListItemText
                          primary={
                            book.copiesAvailable > 0 ? 'Borrow' : 'Reserve'
                          }
                        />
                      </ListItem>
                    ) : (
                      <ListItem
                        alignItems="flex-start"
                        sx={listItemStyle}
                        button
                        onClick={handleLogin}
                      >
                        <ListItemText primary={'Login to borrow'} />
                      </ListItem>
                    )}

                    <Divider />
                    <ListItem
                      alignItems="flex-start"
                      sx={listItemStyle}
                      button
                      onClick={handleManageLoan}
                    >
                      <ListItemText primary="Add to favourites" />
                    </ListItem>
                    <Divider />
                    <ListItem
                      alignItems="flex-start"
                      sx={listItemStyle}
                      onClick={handleManageLoan}
                    >
                      <ListItemText primary="Details" />
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          variant="body3"
                          color="text.secondary"
                        >
                          <strong>Title:</strong> {book.title}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          variant="body3"
                          color="text.secondary"
                        >
                          <strong>Author:</strong> {book.author}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          variant="body3"
                          color="text.secondary"
                        >
                          <strong>Genre:</strong> {book.genreId}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          variant="body3"
                          color="text.secondary"
                        >
                          <strong>Copies Available:</strong>{' '}
                          {book.copiesAvailable}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Box sx={{ textAlign: 'start', my: '2em' }}>
            <Typography variant="body3" color="text.secondary" lineHeight="2">
              {book.sypnosis}
            </Typography>
          </Box>
        </Box>
      )}
      <Sheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        snapPoints={[500, 0]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <BookActionCard
              data={book}
              action={action}
              onSubmit={handleSubmit}
            />
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onClick={() => setBottomSheetOpen(false)} />
      </Sheet>
    </div>
  )
}
