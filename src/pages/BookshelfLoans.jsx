import React, { useState } from "react";
import { BookshelfHeader } from "../components/BookshelfHeader";
import { BookshelfLoansContent } from "../components/BookshelfLoansContent";

export const BookshelfLoans = () => {
  const [selectedTab, setSelctedTab] = useState("loans");

  return (
    <div>
      <BookshelfHeader selectedTab={() => setSelctedTab}/>
      <BookshelfLoansContent content={selectedTab}/>
    </div>
  );
};

