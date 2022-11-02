import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { BookshelfLoans } from "./pages/BookshelfLoans";
import { Login } from "./pages/Login";
import { EpubReader } from "./components/EpubReader";
// import { SiteHeader } from "./components/Headers";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { CreateBook } from "./pages/CreateBook";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
export const App = () => {
  return (
    <div className="App">
      
      {/* <SiteHeader /> */}
      <Routes>
        <Route path="/books/:bookId" element={<BookDetailsPage />} />
        <Route path="/books/add-book" element={<CreateBook />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/bookshelf/loans" element={<BookshelfLoans />} />
        <Route path="/bookshelf/loans/:loanId/book/:bookId/read" element={<EpubReader />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
