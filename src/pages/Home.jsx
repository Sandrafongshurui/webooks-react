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
    const [books, setBooks] = useState(null);
  //fetch api for get loans
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/books`,
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
        setBooks(data);
      }
    };
    fetchApi();
  }, []);

  return (
    <Box>
      <CategoriesSubheading categoryName={"New Arrivals"} />
      {books && 
    </Box>
  );
};
