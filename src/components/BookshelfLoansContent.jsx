import React, { useState, useEffect } from "react";
import { SheetBody } from "./SheetBody";
// import { LoanReserveCard } from "./LoanReserveCard";
import style from "./BookshelfHeader.module.css";
import Sheet from "react-modal-sheet";
import Axios from "axios";
//send the cookies along with each req, make sure BE cors is not *
const axios = Axios.create({
  withCredentials: true
})


export const BookshelfLoansContent = () => {
  // const [cardActions, setCardActions] = useState(null);
  // const [bottomSheetDetails, setBottomSheetDatails] = useState(null);
  // const [loans, setLoans] = useState(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.get(
        `https://w-ebooks.herokuapp.com/api/v1/loans`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }      
      );
      const data = await response.data;
      console.log("data", data);
      // setLoans(data);
    };
    fetchApi();
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.category}>Yet to start</div>
        <div className={style.background}></div>
        <hr className={style.divider} />
      </div>

      {/* {loans.map((loanData) => (
        <LoanReserveCard
          data={loanData}
          actions={cardActions}
          manageLoan={() => setBottomSheetOpen(true)}
        />
      ))} */}

      <Sheet isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <SheetBody />
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};
