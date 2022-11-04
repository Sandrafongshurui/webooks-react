import React, { useState, useEffect } from 'react'
import { SiteHeader } from '../components/Headers'
import axios from 'axios'
import { Box } from '@mui/material'
import { BookCategoriesList } from '../components/BookCategoriesList'
import { useParams } from 'react-router-dom'

export const Home = (props) => {
  const { category } = useParams()
  const { hasLimit } = props
  const [popularBooks, setPopularBooks] = useState(null)
  const [latestBooks, setLatestBooks] = useState(null)

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/books`,
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
        setPopularBooks(data.popularBooks)
        setLatestBooks(data.latestBooks)
      }
    }
    fetchApi()
  }, [])

  return (
    <Box>
      <SiteHeader />
      {!category && (
        <>
          <BookCategoriesList
            title={'New Arrivals'}
            link={'/new-arrivals'}
            hasLimit={hasLimit}
            data={latestBooks}
          />
          <BookCategoriesList
            title={'Popular'}
            link={'/popular'}
            hasLimit={hasLimit}
            data={popularBooks}
          />
        </>
      )}
      {category === 'new-arrivals' && (
        <BookCategoriesList
          title={'New Arrivals'}
          link={'/new-arrivals'}
          hasLimit={hasLimit}
          data={latestBooks}
        />
      )}
      {category === 'popular' && (
        <BookCategoriesList
          title={'Popular'}
          link={'/popular'}
          hasLimit={hasLimit}
          data={popularBooks}
        />
      )}
    </Box>
  )
}
