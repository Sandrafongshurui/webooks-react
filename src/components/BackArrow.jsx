import globalStyle from '../global.module.css'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import {
  Box,
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
const clickBackArrow = () => {
    navigate(-1)
  }
export const BackArrow = () => {
  return (
    <Link onClick={clickBackArrow}>
        <Box sx={{ display: 'flex' }}>
          <Box
            className={globalStyle.triangletopleft}
            sx={{
              background:
                'https://w7.pngwing.com/pngs/336/105/png-transparent-arrow-free-content-quiver-arrow-line-s-angle-text-bow-and-arrow.png',
            }}
          />
          <ArrowBackRoundedIcon
            sx={{ fontSize: 30 }}
            className={globalStyle.backArrow}
          />
        </Box>
      </Link>
  )
}
