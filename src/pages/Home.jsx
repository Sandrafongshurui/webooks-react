import React, { useState, useEffect } from 'react'
import { CategoriesSubheading, SiteHeader } from '../components/Headers'
import axios from 'axios'
import { Grid, Box } from '@mui/material'
import style from '../global.module.css'
import { BookCard } from '../components/BookCard'

export const Home = () => {
  const [popularBooks, setPopularBooks] = useState(null)
  const [latestBooks, setLatestBooks] = useState(null)
  //fetch api for get loans
  useEffect(() => {
    let url = ''
    url = `http://${process.env.REACT_APP_SERVER_URL}/api/v1/books`

    const fetchApi = async () => {
      const res = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      if (res.status === 200 || res.status === 201) {
        const data = await res.data
        console.log('data', data)
        setPopularBooks(data.popularBooks)
        setLatestBooks(data.latestBooks)
      }
    }
    fetchApi()
  }, [])

  return (
    <Box>
      <SiteHeader />
      <Box className={style.contentsbody}>
        <CategoriesSubheading categoryName={'New Arrivals'} />
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 2 }}
            columns={{ xs: 4, sm: 3, md: 4 }}
          >
            {latestBooks &&
              latestBooks.map((booksData, idx) => 
                idx < 8 ? (
                  <BookCard data={booksData} key={booksData.id} />
                ) : null,
              )}
          </Grid>
        </Box>
      </Box>
      <Box className={style.contentsbody}>
        <CategoriesSubheading categoryName={'Popular'} />
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 2 }}
            columns={{ xs: 4, sm: 3, md: 4 }}
          >
            {popularBooks &&
              popularBooks.map((booksData, idx) =>
                idx < 8 ? (
                  <BookCard data={booksData} key={booksData.id} />
                ) : null,
              )}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
