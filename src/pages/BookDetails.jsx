import React, { useState, useEffect } from "react";
import { SiteHeader, CategoriesSubheading } from "../components/Headers";
import Image from "mui-image";
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
        `https://${process.env.REACT_APP_SERVER_URL}/api/v1/books/1`,
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
  const listItemStyle = { padding: 0.5, color: "#4b4b4b", display: "table" };
  return (
    <div>
      <SiteHeader />
      {book && (
        <Box sx={{ margin: "0 auto", width: "70%", marginTop: "4em" }}>
          <CategoriesSubheading categoryName={book.title} />
          <Grid>
            <Box sx={{ width: "100%", textAlign: "left", maxWidth: "244px" }}>
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
                      onClick={handleManageLoan}
                    >
                      <ListItemText primary="Details" />
                      <ListItemText>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{ display: "flex" }}
                            variant="body3"
                            color="text.secondary"
                          >
                            Title:
                          </Typography>
                          <Typography
                            sx={{}}
                            variant="body3"
                            color="text.secondary"
                          >
                            {book.title}
                          </Typography>
                        </Box>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ display: "inline" }}
                          variant="body3"
                          color="text.secondary"
                        >
                          Author: {book.author}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ display: "inline" }}
                          variant="body3"
                          color="text.secondary"
                        >
                          Genre: {book.genreId}
                        </Typography>
                      </ListItemText>
                      <ListItemText>
                        <Typography
                          sx={{ display: "inline" }}
                          variant="body3"
                          color="text.secondary"
                        >
                          Copies available: {book.copiesAvailable}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Box sx={{ textAlign: "start", my: "2em" }}>
            <Typography variant="body3" color="text.secondary" lineHeight= "2">
              {book.sypnosis}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};
