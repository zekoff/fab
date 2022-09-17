import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import FirebaseImage from './FirebaseImage';

const IMG_SIZE = 36;

function ItemDetails({ item, sx }) {
  const [showDetail, setShowDetail] = useState(false);
  return <Paper onClick={() => setShowDetail(!showDetail)} sx={sx}
    component={Stack} direction="column">
    <Stack direction="row" alignItems="center">
      <FirebaseImage image={item.image}
        sx={{ width: IMG_SIZE, height: IMG_SIZE, flexGrow: 0, mr: 1 }} />
      <Typography sx={{ flexGrow: 1 }}>{item.name}</Typography>
      {showDetail ?
        <ArrowDropUpIcon sx={{ flexGrow: 0 }} /> :
        <ArrowDropDownIcon sx={{ flexGrow: 0 }} />
      }
    </Stack>
    {showDetail ? <Typography sx={{ mt: 1 }}>{item.description}</Typography> : null}
    {showDetail ? <Typography variant="body2">Value: {item.value}</Typography> : null}
  </Paper>
}

export default ItemDetails;