import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { BookshelfLoans } from "./pages/BookshelfLoans";
import { Login } from "./pages/Login";
import { EpubReader } from "./components/EpubReader";
// import { SiteHeader } from "./components/Headers";
import { BookDetails } from "./pages/BookDetails";
import { CreateBook } from "./pages/CreateBook";

export const App = () => {
  return (
    <div className="App">
      
      {/* <SiteHeader /> */}
      <Routes>
        <Route path="/books/1" element={<BookDetails />} />
        <Route path="/books/add-book" element={<CreateBook />} />
        
      </Routes>

      <Routes>
        <Route path="/bookshelf/loans" element={<BookshelfLoans />} />
        <Route path="/bookshelf/loans/1/read" element={<EpubReader />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
