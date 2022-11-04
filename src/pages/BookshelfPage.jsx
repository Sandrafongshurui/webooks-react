import React, { useState } from 'react'
import { BookshelfHeader } from '../components/Headers'
import { BookshelfLoansContent } from '../components/BookshelfLoansContent'
import { BookshelfReservesContent } from '../components/BookshelfReservesContent'
import { Footer } from '../components/Footer'
import globalStyle from '../global.module.css'
export const BookshelfPage = (props) => {
  const [tab, setTab] = useState(props.tab)
  return (
    <div className={globalStyle.flexwrapper }>
      <BookshelfHeader
        selectedTab={(value) => {
          setTab(value)
        }}
      currentTab={tab}
      />
      {props.tab === 'reserves' && <BookshelfReservesContent />}
      {props.tab === 'loans' && <BookshelfLoansContent />}
      <div className={globalStyle.footer}><Footer /></div>
    </div>
  )
}
