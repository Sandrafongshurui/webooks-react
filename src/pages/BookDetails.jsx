import React, { useState, useEffect } from "react";
import SiteHeader from "../components/partials/SiteHeader";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import axios from "axios";
import { Container } from "@mui/system";


export const BookDetails = (props) => {
  const [book, setBook] = useState(null);

  const handleOpenBook = () => {
    console.log("openbook");
  };

  const handleManageLoan = () => {
    console.log("openbook");
  };
  //fetch api for show bool
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/book/1`,
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
        setBook(data);
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      <SiteHeader />
      {book && (
        <Container>
          <Box sx={{ maxWidth: 800 }}>
            <h2>${book.title}</h2>
            <Box sx={{ display: "inline", maxWidth: 375 }}>
              <Box sx={{ width: "100%", paddingRight: 2 }}>
                <Image src={`${book.bookImgUrl}`} />
              </Box>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  padding: 0,
                }}
              >
                <Divider />
                <ListItem
                  alignItems="flex-start"
                  sx={{ padding: 2 }}
                  button
                  onClick={handleOpenBook}
                >
                  <ListItemText primary="borrow" />
                </ListItem>
                <Divider />
                <ListItem
                  alignItems="flex-start"
                  sx={{ padding: 2 }}
                  button
                  onClick={handleManageLoan}
                >
                  <ListItemText primary="Manage Loan" />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start" sx={{ padding: 2 }}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body3"
                        color="text.secondary"
                      >
                        Add to favourites
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start" sx={{ padding: 2 }}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body3"
                        color="text.secondary"
                      >
                        Borrowed Today
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
              F
            </Box>
            <p>${book.sypnopsis}</p>
          </Box>
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography variant="h4">{book.title}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              {book.author}
            </Typography>
            {/* <div>Title pf book</div> */}
          </Box>
        </Container>
      )}
    </div>
  );
};
