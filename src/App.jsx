import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import {BookshelfLoans} from "./pages/BookshelfLoans";
import {Testing} from "./components/test";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/bookshelf/loans" element={<BookshelfLoans />} />
        <Route path="/test" element={<Testing />} />
      </Routes>
    </div>
  );
}

export default App;
