// import React from 'react'
// import {
//   Divider,
//   Container,
//   Button,
//   Typography,
//   CardContent,
//   CardActions,
//   Card,
//   Box,
// } from '@mui/material'
// import Image from 'mui-image'
// import style from '../global.module.css'
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
// import { Navigate, useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
// import { LoanReserveCard } from './LoanReserveCard'

// export const BookActionCard = (props) => {
//   const { bookId } = useParams()
//   const handleClickBorrow = async (data) => {
//     console.log('Borrow!')
//     //fetch the post loasn aip
//     try {
//       const res = await axios.post(
//         `https://${process.env.REACT_APP_SERVER_URL}/api/v1/loan/book/${bookId}`,
//         data,
//       )
//       if (res.status === 200 || res.status === 201) {
//         console.log('Borrowed sucessfully')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <div>
//       <Box>
//         <Box
//           m={0} //margin
//           display="flex"
//           justifyContent="flex-start"
//           alignItems="flex-start"
//         >
//           <Button variant="contained" color="primary" sx={{ height: 40 }}>
//             <ArrowBackRoundedIcon />
//           </Button>
//         </Box>
//         <Container sx={{ my: 0 }}>
//           <Card
//             sx={{
//               width: '50%',
//               margin: '0 auto',
//               py: '4em',
//               px: '1em',
//               boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
//             }}
//           >
//             <Box sx={{ width: '80%', margin: '0 auto' }}>
//               <Typography
//                 variant="h5"
//                 sx={{ textAlign: 'center', margin: '0', fontWeight: 100 }}
//               >
//                 You are borrowing
//                 <Box sx={{ fontSize: 35, fontWeight: 600, margin: '0' }}>
//                   Little Women
//                 </Box>
//                 for 21 days
//               </Typography>
//             </Box>
//             <CardContent sx={{ width: '50%', margin: '0 auto', p: '0' }}>
//               <Image
//                 showLoading={true}
//                 sx={{ my: '2em', borderRadius: '5%' }}
//                 src="https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg"
//               />
//               <Divider />
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   m: '1em',
//                 }}
//               >
//                 <Typography
//                   sx={{ fontSize: 14 }}
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   Loans
//                 </Typography>
//                 <Typography
//                   sx={{ fontSize: 14 }}
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   2/10
//                 </Typography>
//               </Box>
//               <Divider />
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   m: '1em',
//                 }}
//               >
//                 <Typography
//                   sx={{ fontSize: 14 }}
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   Reserves
//                 </Typography>
//                 <Typography
//                   sx={{ fontSize: 14 }}
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   0/10
//                 </Typography>
//               </Box>

//               <Divider />
//             </CardContent>
//             <form>
//               <CardActions sx={{ justifyContent: 'center', my: '1em' }}>
//                 <button
//                   className={style.actionbutton}
//                   onClick={handleClickBorrow}
//                   type="submit"
//                 >
//                   Borrow
//                 </button>
//               </CardActions>
//             </form>
//           </Card>
//         </Container>
//       </Box>
//     </div>
//   )
// }
