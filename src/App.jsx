import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { BookshelfLoans } from "./pages/BookshelfLoans";
import { Login } from "./pages/Login";
import { EpubReader } from "./components/EpubReader";
import { SiteHeader } from "./components/Headers";
import { BookDetails } from "./pages/BookDetails";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="bookshelf/loans" element={<BookshelfLoans />} />
        <Route path="bookshelf/loans/:id/read/:page" element={<EpubReader />} />

        <Route path="/login" element={<Login />} />
        <Route path="/books/1" element={<BookDetails />} />
        <Route path="/" element={<SiteHeader />}>
          <Route path="books/1" element={<BookDetails />} />
        </Route>
      </Routes>
    </div>
  );
};
