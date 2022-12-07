import { Box, Grid, Skeleton, Stack } from '@mui/material'
import style from '../global.module.css'
import { CategoriesSubheading } from '../components/Headers'
import { BookCard } from '../components/BookCard'

export const BookCategoriesList = (props) => {
  const { hasLimit, data, title, link } = props
  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, idx) => (
            // render your skeleton here
            <Box sx={{ marginBottom: '2em', marginRight:"5em" }}>
              <Skeleton
                key={idx}
                variant="rounded"
                width={126}
                height={180}
                sx={{ marginBottom: '10px'}}
              />
              <Skeleton width={126} variant="text" sx={{ fontSize: '1Rem' }} />
            </Box>
          ))}
      </>
    )
  }

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
          style={{ margin: 'auto 0', justifyContent: "space-evenly"}}
        >
          {!data && <ListSkeleton listsToRender={8} />}
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
