import React, { useState, useEffect } from "react";
import { SiteHeader } from "../components/Headers";
import Image from "mui-image";
import axios from "axios";
import { Container } from "@mui/system";
import {
  Grid,
  Box,
  ListItemText,
  ListItem,
  Typography,
  Divider,
  List,
} from "@mui/material";

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
    console.log("get book");
    const fetchApi = async () => {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_URL}/api/v1/books/1`,
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
  const listItemStyle = { padding: 0.5, color: "#4b4b4b", display : "table" };
  return (
    <div>
      <SiteHeader />
      {book && (
        <Container>
          {/* <Box sx={{ maxWidth: 800 }}>
            <h2>{book.title}</h2>
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
            </Box>
            <p>{book.sypnopsis}</p>
          </Box> */}
          <Grid>
            <Box sx={{ width: "100%", textAlign: "left", maxWidth: "244px" }}>
              <Box>
                <Typography noWrap variant="h6" style={{ color: "#4b4b4b" }}>
                  {book.title}{" "}
                </Typography>
                {/* <Typography noWrap variant="body1" style={{color:"#4b4b4b"}} gutterBottom>
              by {book.author}
            </Typography> */}
              </Box>
              <Box
                sx={{
                  display: "Flex",
                  width: "577px",
                  maxHeight: "400px",
                  marginTop: "1.5em",
                }}
              >
                <Box sx={{ paddingRight: 2, height: "400px", width: "50%" }}>
                  <Image
                    src={`${book.bookImgUrl}`}
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                </Box>
                <Box sx={{ paddingRight: 2, height: "400px", width: "50%" }}>
                  <List
                    sx={{
                      maxWidth: 360,
                      bgcolor: "background.paper",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Divider />
                    <ListItem
                      alignItems="flex-start"
                      sx={listItemStyle}
                      button
                      onClick={handleOpenBook}
                    >
                      <ListItemText primary="Borrow" />
                    </ListItem>
                    <Divider />
                    <ListItem
                      alignItems="flex-start"
                      sx={listItemStyle}
                      button
                      onClick={handleManageLoan}
                    >
                      <ListItemText primary="Add to favourites" />
                    </ListItem>
                    <Divider />
                    <ListItem
                      alignItems="flex-start"
                      sx={listItemStyle}
                      button
                      onClick={handleManageLoan}

                    >
                      <ListItemText primary="Details"/>
                      <ListItemText>
                        <Typography
                          sx={{ display: "inline" }}
                   
                          variant="body3"
                          color="text.secondary"
                        >
                          Due in 21 Days
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem alignItems="flex-start" sx={listItemStyle}>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body3"
                            color="text.secondary"
                          >
                            Due in 21 Days
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                    <ListItem alignItems="flex-start" sx={listItemStyle}>
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
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      )}
    </div>
  );
};
