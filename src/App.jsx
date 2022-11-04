import './App.css'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { EpubReader } from './components/EpubReader'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { CreateBook } from './pages/CreateBook'
import { Home } from './pages/Home'
import { ProfilePage } from './pages/ProfilePage'
import { EditProfile } from './pages/EditProfile'
import { BookshelfPage } from './pages/BookshelfPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PublicOutlet} from './components/OutletTemplate'


export const App = () => {
  return (
    <div className="App">
      {/* <SiteHeader /> */}
      <Routes>
        {/* <Route path="" element={<ProtectedOutlet />}> */}
          <Route path="/books/add-book" element={<CreateBook />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route
            path="/bookshelf/loans"
            element={<BookshelfPage tab={'loans'} />}
          />
          <Route
            path="/bookshelf/reserves"
            element={<BookshelfPage tab={'reserves'} />}
          />
        {/* </Route> */}
        <Route
          path="/bookshelf/loans/:loanId/book/:bookId/read"
          element={<EpubReader />}
        />
        <Route path="" element={<PublicOutlet />}>
          <Route path="/books/:bookId" element={<BookDetailsPage />} />
          <Route path="/" element={<Home hasLimit={true} />} />
          <Route path="/:category" element={<Home hasLimit={false} />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer />
    </div>
  )
}
