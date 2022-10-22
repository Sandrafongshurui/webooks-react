import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import style from "./BookshelfHeader.module.css";
import HeaderMenu from "./HeaderMenu";
import { useState } from "react";

export const BookshelfHeader = (props) => {
  const [value, setValue] = useState("loans");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.selectedTab(newValue);
  };

  return (
    <div className={style.header}>
      <div>
        <h2>Bookshelf</h2>
        <Box
          sx={{
            color: " #6238f2",
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "900",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#6238f2",
                fontWeight: "bold",
              },
            }}
            // indicatorColor="secondary"
            // aria-label="secondary tabs example"
          >
            <Tab value="loans" label="Loans" />
            <Tab value="reserves" label="Reserves" />
            <Tab value="favourites" label="Favourites" />
          </Tabs>
        </Box>
      </div>
      <HeaderMenu />
    </div>
  );
};
