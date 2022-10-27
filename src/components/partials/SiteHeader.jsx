import {Box,IconButton } from "@mui/material";
import Image from "mui-image";
import HeaderMenu from "./HeaderMenu";
import style from "./SiteHeader.module.css";


export const SiteHeader = () => {
    return(
    <div className={style.header}>        
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
        <Image src="../../assets/booksicon_2.png" />
        </IconButton>
        <h2>webooks</h2>      
        <HeaderMenu />
    </div>
    )
}