import style from "./BookshelfHeader.module.css";
import React, { useState, useEffect } from "react";

import { Container } from "@mui/system";


export const CategoriesSubheading = (props) => {
  return (
    <Container>
      <div className={style.category}>props,category</div>
      <div className={style.background}></div>
      <hr className={style.divider} />
    </Container>
  );
};
