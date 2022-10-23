import React,{ useState } from "react";
import { SheetBody } from "./SheetBody";
import { LoanReserveCard } from "./LoanReserveCard";
import style from "./BookshelfHeader.module.css";
import Sheet from 'react-modal-sheet';

export const BookshelfLoansContent = () => {
  const [cardActions, setCardActions] = useState(null);
  const [bottomSheetDatails, setBOttomSheetDatails] = useState(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <div>
      <div className={style.container}>
        <div className={style.category}>Yet to start</div>
        <div className={style.background}></div>
        <hr className={style.divider} />
      </div>

      <LoanReserveCard
        Actions={cardActions}
        manageLoan={() => setBottomSheetOpen(true)}
      />

      <Sheet isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content><SheetBody/></Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};
