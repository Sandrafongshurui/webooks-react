import Image from 'mui-image'
import { Grid, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom';

export const BookCard = (props) => {
  const { id, bookImgUrl, title } = props.data
  return (
    <Grid item xs={2} sm={1} key={id} sx={{ height: '250px' }}>
      <Box>
        <Box
          sx={{
            display: 'Flex',
            // maxWidth: '271px',
            maxHeight: '180px',
            width: '120px',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Link
              to={`/books/${id}`}
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              <Image src={`${bookImgUrl}`} style={{ objectFit: 'contain' }} />
              <Box>
                <Typography
                  noWrap
                  variant="subtitle2"
                  style={{ color: '#4b4b4b', textAlign: 'left' }}
                >
                  {title}{' '}
                </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}
