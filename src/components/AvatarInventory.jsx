import { List, Paper, Typography } from "@mui/material";
import ItemDetails from "../widgets/ItemDetails";

function AvatarInventory({ avatar }) {
  return (
    <>
      <Typography variant="h6">Inventory</Typography>
      <List>
        {
          avatar.inventory.map(item =>
            <ItemDetails key={item.uuid} item={item} sx={{ m: 1, p: 1 }}
              component={Paper} />)
        }
      </List>
    </>
  )
}

export default AvatarInventory;