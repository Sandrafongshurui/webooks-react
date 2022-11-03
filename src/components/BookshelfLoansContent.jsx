import React, { useState, useEffect } from 'react'
// import { SheetBody } from './SheetBody'
import { LoanReserveCard } from './LoanReserveCard'
import { ManageLoanCard } from './ManageLoanCard'
import { CategoriesSubheading } from './Headers'
import Sheet from 'react-modal-sheet'
import axios from 'axios'
import { Box, Grid } from '@mui/material'
//send the cookies along with each req, make sure BE cors is not *
// const axios = Axios.create({
//   withCredentials: true,
// });

export const BookshelfLoansContent = () => {
  const [returnLoan, setReturnLoan] = useState(false)
  const [loanData, setLoanData] = useState(null)
  const [loans, setLoans] = useState(null)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
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
    }
    fetchApi()
  }, [returnLoan])

  const handleBottomsheet = (loanData) => {
    setLoanData(loanData)
    setBottomSheetOpen(true)
  }

  return (
    <Box sx={{ margin: '0 auto', width: '80%', marginTop: '4em' }}>
      <CategoriesSubheading categoryName={'Yet to start'} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 5, sm: 5, md: 5 }}
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

      <Sheet isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
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
