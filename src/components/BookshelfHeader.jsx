import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

export const BookshelfHeader = (props) => {
  const [value, setValue] = useState("loans");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.selectedTab(newValue)
  };

  return (
    <div>
      <h2 className={style.listingImages}>Bookshelf</h2>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="loans" label="Loans" />
          <Tab value="reserves" label="Reserves" />
          <Tab value="favourites" label="Favourites" />
        </Tabs>
      </Box>

    </div>
  );
};
