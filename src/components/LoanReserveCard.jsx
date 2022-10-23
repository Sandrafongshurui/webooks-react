import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Image from "mui-image";

export const LoanReserveCard = (props) => {
  //fetch api for loans
  const handleOpenBook = () => {
    console.log("Open book")
  }

  const handleManageLoan = () => {
    console.log("Open bottom sheet")
    props.manageLoan()
  }
  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      <Typography variant="h4">Title pf book</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Author of book
      </Typography>
      {/* <div>Title pf book</div> */}

      <Box sx={{ display: "Flex", maxWidth: 375 }}>
        <Box sx={{ width: "100%", paddingRight: 2 }}>
          <Image src="https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg" />
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
          <ListItem alignItems="flex-start" sx={{ padding: 2 }} button onClick={handleOpenBook} >
            <ListItemText primary="Open Book" />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start" sx={{ padding: 2 }} button onClick={handleManageLoan}>
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
            <ListItemText  primary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body3"
                  color="text.secondary"
                >
                  Borrowed Today
                </Typography>
              }/>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Box>
  );
};
