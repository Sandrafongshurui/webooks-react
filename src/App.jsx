import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import {BookshelfLoans} from "./pages/BookshelfLoans";
import {Login} from "./pages/Login";
import {EpubReader} from "./components/EpubReader";
import SiteHeader from "./components/partials/SiteHeader";
import { BookDetails } from "./pages/BookDetails";


const App = () => {
  return (
    <div className="App">
      <Routes>
        <SiteHeader>
          <Route path="/bookshelf/loans" element={<BookshelfLoans />} />
          <Route path="/bookshelf/loans/:id/read/:page" element={<EpubReader />} />
        </SiteHeader>
        <Route path="/login" element={<Login />} />
        <Route path="/:Id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
