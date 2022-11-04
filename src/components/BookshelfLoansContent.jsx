import React, { useState, useEffect } from 'react'
// import { SheetBody } from './SheetBody'
import { LoanReserveCard } from './LoanReserveCard'
import { ManageLoanCard } from './ManageLoanCard'
import { CategoriesSubheading } from './Headers'
import Sheet from 'react-modal-sheet'
import axios from 'axios'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import globalStyle from '../global.module.css'
//send the cookies along with each req, make sure BE cors is not *
// const axios = Axios.create({
//   withCredentials: true,
// });

export const BookshelfLoansContent = () => {
  const navigate = useNavigate()
  const [returnLoan, setReturnLoan] = useState(false)
  const [loanData, setLoanData] = useState(null)
  const [loans, setLoans] = useState(null)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/loans`,
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
          setLoans(data)
        }
      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }

    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnLoan])

  const handleBottomsheet = (loanData) => {
    setLoanData(loanData)
    setBottomSheetOpen(true)
  }

  return (
    <Box className={globalStyle.contentsbody}>
      <CategoriesSubheading categoryName={'Continue Reading'} standard={true} />
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 1 }}
          columns={{ xs: 1, sm: 2, md: 3 }}
        >
          {loans &&
            loans.map((loanData) => (
              <LoanReserveCard
                data={loanData}
                // actions={cardActions}
                manageLoan={() => handleBottomsheet(loanData)}
                key={loanData.id}
                isTimeline={false}
              />
            ))}
        </Grid>
      </Box>

      <Sheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        snapPoints={[600, 0]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <ManageLoanCard
              loanData={loanData}
              returnLoan={(value) => setReturnLoan(value)}
              bottomSheetOpen={(value) => setBottomSheetOpen(value)}
            />
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </Box>
  )
}
