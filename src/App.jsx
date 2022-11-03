import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { Bookshelf } from "./pages/Bookshelf";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EpubReader } from "./components/EpubReader";
// import { SiteHeader } from "./components/Headers";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { CreateBook } from "./pages/CreateBook";
import { Home } from "./pages/Home";
import { ProfilePage } from "./pages/ProfilePage";
import { EditProfile } from "./pages/EditProfile";


export const App = () => {
  return (
    <div className="App">
      
      {/* <SiteHeader /> */}
      <Routes>
        <Route path="/books/:bookId" element={<BookDetailsPage />} />
        <Route path="/books/add-book" element={<CreateBook />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Routes>
        <Route path="/bookshelf/loans" element={<Bookshelf tab={"loans"} />} />
        <Route path="/bookshelf/reserves" element={<Bookshelf tab={"reserves"}/>} />
        <Route path="/bookshelf/loans/:loanId/book/:bookId/read" element={<EpubReader />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
