import {
  Box,
  IconButton,
  Menu,
  Tooltip,
  Divider,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import style from "./Headers.module.css";
import globalStyle from "../global.module.css";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import webooksLogo from "../assets/webooks_logo.png";

export const SiteHeader = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 });

  const mobile = {
    font: { fontSize: 32, margin: "auto 0" },
    logo: { width: "50%", objectFit: "contain" },
  };

  const desktop = {
    font: { fontSize: 40, margin: "auto 0" },
    logo: { width: "80%", objectFit: "contain" },
  };
  let responsiveLayout = null;
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop });
  return (
    <Box
      className={style.siteheader}
      sx={{ boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)", py: "0.5em" }}
    >
      <Box sx={{ width: "45px", alignItems: "self-start" }}>
        <Image style={responsiveLayout.logo} src={webooksLogo} />
      </Box>
      <Box style={responsiveLayout.font} className={globalStyle.h2}>
        <span style={{ fontWeight: "100" }}>w</span>ebooks
      </Box>
      <SiteHeaderDropDownMenu />
    </Box>
  );
};

export const SiteHeaderDropDownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const logoMobile = {
    fontSize: 25,
    alignItems: "self-start",
  };
  const logoDesktop = {
    fontSize: 40,
    alignItems: "self-start",
  };
  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", alignItems: "self-start", textAlign: "center" }}
      >
        <Tooltip title="Login">
          <IconButton
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon
              sx={isMobile ? logoMobile : logoDesktop}
              style={{ fill: "#633bf6" }}
            />
          </IconButton>
          {/* <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            Login
          </IconButton> */}
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "6px",
            width: "150px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 18,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Bookshelf</MenuItem>
        <MenuItem>Search</MenuItem>

        <MenuItem>Profile</MenuItem>
        <MenuItem>Notifications</MenuItem>
        <Divider />
        <MenuItem>
          {/* <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon> */}
          Add a book
        </MenuItem>
        <Divider />
        <MenuItem>
          {/* <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon> */}
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export const CategoriesSubheading = (props) => {
  return (
    <Box className={style.container}>
      <Box className={style.category}>{props.title}</Box>
      <Box className={style.background}></Box>
      <Divider className={style.divider} />
    </Box>
  );
};

export const BookshelfHeader = (props) => {
  const [value, setValue] = useState("loans");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.selectedTab(newValue);
  };

  const isMobile = useMediaQuery({ maxWidth: 900 });

  const mobile = {
    font: { fontSize: 32, margin: "auto 0" },
    logo: { width: "50%", objectFit: "contain", alignItems: "self-start" },
  };
  const desktop = {
    font: { fontSize: 40, margin: "auto 0" },
    logo: { width: "80%", objectFit: "contain", alignItems: "self-start" },
  };
  let responsiveLayout = null;
  isMobile
    ? (responsiveLayout = { ...mobile })
    : (responsiveLayout = { ...desktop });
  return (
    <Box
      className={style.bookshelfheader}
      sx={{ boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)", py: "0.5em" }}
    >
      {/* <Box sx={{ width: "45px",  alignItems: "self-start" }}>
        <Image style={responsiveLayout.logo} src={webooksLogo} />
      </Box> */}
      <Box>
        <Box style={responsiveLayout.font} className={globalStyle.h2}>
          <span style={{ fontWeight: "100" }}>Book</span>shelf
        </Box>
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
      </Box>
      <SiteHeaderDropDownMenu />
    </Box>
  );
};
