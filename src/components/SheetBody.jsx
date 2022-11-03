import Image from "mui-image";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Icon
} from "@mui/material";
import {AccessTime} from '@mui/icons-material'
import style from "./SheetBody.module.css";

export const SheetBody = (props) => {
  
  const {book, dueDate} = props.loanData
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
            <Image src={book.bookImgUrl} />
          </Box>
          <div>
            <Typography variant="h4">{book.title}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              {book.author}
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
              <Icon edge="end" aria-label="comments">
                <AccessTime />
              </Icon>
            }>
            <ListItemText
              primary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body3"
                  color="text.secondary"
                >
                  {dueDate}
                </Typography>
              }
            />
           
          </ListItem>
          <Divider />
          <ListItem
            className={style.sheetBodyText}
            sx={{pt:1, pb:1, pl: 0}}
            alignItems="flex-start"
            button
            onClick={handleReturnLoan}
          >
            <ListItemText primary="Return Loan" />
          </ListItem>
          <Divider />
          <ListItem
            className={style.sheetBodyText}
            sx={{pt:1, pb:1, pl: 0}}
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
