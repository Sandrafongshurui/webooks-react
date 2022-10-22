import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import {BookshelfLoans} from "./pages/BookshelfLoans";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/bookshelf/loans" element={<BookshelfLoans />} />
      </Routes>
    </div>
  );
}

export default App;
