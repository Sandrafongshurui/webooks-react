import { Box, Grid } from '@mui/material'
import style from '../global.module.css'
import { CategoriesSubheading } from '../components/Headers'
import { BookCard } from '../components/BookCard'

export const BookCategoriesList = (props) => {
  const { hasLimit, data, title, link } = props
  return (
    <Box className={style.contentsbody}>
      <CategoriesSubheading
        categoryName={title}
        hasViewMore={hasLimit}
        linkPage={link}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 2 }}
          columns={{ xs: 4, sm: 3, md: 4 }}
        >
          {data &&
            hasLimit &&
            data.map((booksData, idx) =>
              idx < 8 ? <BookCard data={booksData} key={booksData.id} /> : null,
            )}
          {data &&
            !hasLimit &&
            data.map((booksData) => (
              <BookCard data={booksData} key={booksData.id} />
            ))}
        </Grid>
      </Box>
    </Box>
  )
}
