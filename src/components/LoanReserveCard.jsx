import Image from "mui-image";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  ListItemText,
  ListItem,
  Typography,
  Divider,
  List,
} from "@mui/material";

export const LoanReserveCard = (props) => {
  const { book } = props.data;
  const navigate = useNavigate();
  const handleOpenBook = () => {
    console.log("Open book");
    navigate("/test");
  };

  const handleManageLoan = () => {
    console.log("Open bottom sheet");
    props.manageLoan();
  };
  return (
    <Grid item xs={2} sm={4} md={4} key={book.id}>
      
        <Box sx={{ width: "100%", textAlign: "left"}}>
          <Box>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              {book.author}
            </Typography>
          </Box>
          <Box sx={{ display: "Flex", maxWidth: 375 }}>
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
                <ListItemText primary="Open Book" />
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
                      Due in 21 Days
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
        </Box>
      
    </Grid>
  );
};
