import React, { useState } from 'react'
import { BookshelfHeader } from '../components/Headers'
import { BookshelfLoansContent } from '../components/BookshelfLoansContent'
import { BookshelfReservesContent } from '../components/BookshelfReservesContent'
export const BookshelfLoans = () => {
  const [selectedTab, setSelctedTab] = useState('loans')
  return (
    <div>
      <BookshelfHeader selectedTab={() => setSelctedTab} />
      {selectedTab === 'loans' && <BookshelfLoansContent />}
      {selectedTab === 'reserves' && <BookshelfReservesContent />}
    </div>
  )
}
