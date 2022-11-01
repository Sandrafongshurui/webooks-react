import React, { useState, useEffect } from "react";

import { LoanReserveCard } from "./LoanReserveCard";
import { CategoriesSubheading } from "./Headers";
import axios from "axios";
import {
  Box,
  Grid,
} from "@mui/material";
//send the cookies along with each req, make sure BE cors is not *
// const axios = Axios.create({
//   withCredentials: true,
// });

export const BookshelfReservesContent = () => {
  // const [cardActions, setCardActions] = useState(null);
  // const [bottomSheetDetails, setBottomSheetDatails] = useState(null);
  const [reserves, setReserves] = useState(null);

  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_URL}/api/v1/reserves`,
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
        setReserves(data);
      }
    };
    fetchApi();
  }, []);

  return (
    <Box sx={{margin: "0 auto", width: "80%", marginTop: "4em"}}>
      <CategoriesSubheading categoryName={"Fully booked"} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 5, sm: 5, md:5  }} columns={{ xs: 1, sm: 2, md:3 }}>
          {reserves &&
            reserves.map((reservesData) => (
              <LoanReserveCard
                data={reservesData}
                // actions={cardActions}
                isReserve={true}
                key={reservesData.id}
              />
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
