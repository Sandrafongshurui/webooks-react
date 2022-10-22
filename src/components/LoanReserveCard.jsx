import Box from "@mui/material/Box";

export const LoanReserveCard = () => {
  //fetch api for loans
  return (
    <Box>
      <div>Title pf book</div>
      <Box sx={{display:"Flex"}}>
        <div>book img</div>
        <div>
          <ul>
            <li>Open Book</li>
            <li>Manage Loan</li>
            <li>Due on this date</li>
            <li>Borrwed on this date</li>
          </ul>
        </div>
      </Box>
    </Box>
  );
};
