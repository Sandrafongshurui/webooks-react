import React, { useState, useEffect } from "react";
import { CategoriesSubheading } from "../components/Headers";
import axios from "axios";
import {
  Grid,
  Box,
  ListItemText,
  ListItem,
  Typography,
  Divider,
  List,
} from "@mui/material";

export const BookshelfLoans = () => {
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
      <CategoriesSubheading categoryName={"New Arrivals"} />
    </Box>
  );
};
