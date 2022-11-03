import React, { useState } from 'react'
import { BookshelfHeader } from '../components/Headers'
import { BookshelfLoansContent } from '../components/BookshelfLoansContent'
import { BookshelfReservesContent } from '../components/BookshelfReservesContent'

export const BookshelfPage = (props) => {
  const [tab, setTab] = useState(props.tab)
  return (
    <div>
      <BookshelfHeader
        selectedTab={(value) => {
          setTab(value)
        }}
      currentTab={tab}
      />
      {props.tab === 'reserves' && <BookshelfReservesContent />}
      {props.tab === 'loans' && <BookshelfLoansContent />}
    </div>
  )
}