import Image from "mui-image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faRegular, faClock } from '@fortawesome/fontawesome-free-solid'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton 
} from "@mui/material";
import {AccessTimeIcon} from '@mui/icons-material'
import style from "./SheetBody.module.css";

export const SheetBody = () => {
  const handleReturnLoan = () => {
    console.log("click manage loan");
  };

  const handleRenewLoan = () => {
    console.log("click return loan");
  };

  return (
    <Box sx={{ display: "Flex" }} justifyContent="center">
      <Box>
        <Box sx={{ display: "Flex" }}>
          <Box sx={{ width: "20%", paddingRight: 2 }}>
            <Image src="https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg" />
          </Box>
          <div>
            <Typography variant="h4">Title pf book</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Author of book
            </Typography>
          </div>
        </Box>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem alignItems="flex-start" sx={{ pl: 0, pt: 2, pb: 2 }} secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <AccessTimeIcon />
              </IconButton>
            }>
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
          <ListItem
            className={style.sheetBodyText}
            alignItems="flex-start"cd
            onClick={handleReturnLoan}
          >
            <ListItemText primary="Return Loan" />
          </ListItem>
          <Divider />
          <ListItem
            className={style.sheetBodyText}
            alignItems="flex-start"
            button
            onClick={handleRenewLoan}
          >
            <ListItemText primary="Renew Loan" />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Box>
  );
};
