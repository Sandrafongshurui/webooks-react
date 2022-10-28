import React, { useState } from "react";
import { BookshelfHeader } from "../components/Headers";
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

