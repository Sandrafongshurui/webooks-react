import { useState } from "react";
import { BottomSheet} from "./BottomSheet";
import { LoanReserveCard } from "./LoanReserveCard";


export const BookshelfLoansContent = () => {
  const [cardActions, setCardActions] = useState(null)
  const [bottomSheetDatails, setBOttomSheetDatails] = useState(null)
  return (
    <div>
      <LoanReserveCard Actions={cardActions}/> 
      <BottomSheet selectedDetails= {bottomSheetDatails} />
     
    </div>
  );
};
