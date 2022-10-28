import React, { useState, useEffect } from "react";
import { SheetBody } from "./SheetBody";
import { LoanReserveCard } from "./LoanReserveCard";
import { CategoriesSubheading } from "./Headers";
import style from "./Headers.module.css";
import Sheet from "react-modal-sheet";
import axios from "axios";
import {
  Container,
  Button,
  CardContent,
  Card,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Divider,
  Link,
  Grid,
} from "@mui/material";
//send the cookies along with each req, make sure BE cors is not *
// const axios = Axios.create({
//   withCredentials: true,
// });

export const BookshelfLoansContent = () => {
  // const [cardActions, setCardActions] = useState(null);
  // const [bottomSheetDetails, setBottomSheetDatails] = useState(null);
  const [loans, setLoans] = useState(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_URL}/api/v1/loans`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200 || res.status === 201) {
        const data = await res.data;
        console.log("data", data);
        setLoans(data);
      }
    };
    fetchApi();
  }, []);

  return (
    <Box>
      <CategoriesSubheading title={"Yet to start"} />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 4, md: 12 }}>
        {loans &&
          loans.map((loanData) => (
            <LoanReserveCard
              data={loanData}
              // actions={cardActions}
              manageLoan={() => setBottomSheetOpen(true)}
              key={loanData.id}
            />
          ))}
      </Grid>

      <Sheet isOpen={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <SheetBody />
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </Box>
  );
};
