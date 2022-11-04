import React, { useState, useEffect } from 'react'
import { CategoriesSubheading, SiteHeader } from '../components/Headers'
import axios from 'axios'
import { Grid, Box } from '@mui/material'
import style from '../global.module.css'
import { BookCard } from '../components/BookCard'

export const NewArrivals = () => {
//   const [popularBooks, setPopularBooks] = useState(null)
//   const [latestBooks, setLatestBooks] = useState(null)
//   //fetch api for get loans
//   useEffect(() => {

//     const fetchApi = async () => {
//       const res = await axios.get(
//         `${process.env.REACT_APP_SERVER_URL}/api/v1/books`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         },
//       )
//       if (res.status === 200 || res.status === 201) {
//         const data = await res.data
//         console.log('data', data)
//         setPopularBooks(data.popularBooks)
//         setLatestBooks(data.latestBooks)
//       }
//     }
//     fetchApi()
//   }, [])
//   const viewMoreBooks = () => {

// //   }

//   return (
//     <Box>
//         <Home hasLimit={true}/>
//     </Box>
//   )
// }
