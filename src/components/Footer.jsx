import React from 'react'
import { Box, Button, Typography, Link } from '@mui/material'

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f3ffba', p: '2em' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb:"1em" }}>
        <Box>
          <Typography style={{ color: '#6a6a6a', fontWeight: 300,  }}>I like big books and I cannot lie!</Typography>
        </Box>

        <Button sx={{margin: 0, p:0, mx:"2em", color: "#3d3df4"}}> Register for free </Button>
      </Box>

      <Typography style={{ color: '#6a6a6a', fontWeight: 300 }}>
        © 2022 Copyright:
        <Link to={'https://w-ebooks.netlify.app'} sx={{ px: '2em' }}>
          https://w-ebooks.netlify.app
        </Link>
      </Typography>
    </Box>
  )
}
