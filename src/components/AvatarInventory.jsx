import { List, Typography } from "@mui/material";
import ItemDetails from "./ItemDetails";

function AvatarInventory({ avatar }) {
  return (
    <>
      <Typography variant="h6">Inventory</Typography>
      <List>
        {
          avatar.inventory.map(item =>
            <ItemDetails key={item.id} item={item} sx={{ m: 1, p: 1 }} />)
        }
      </List>
    </>
  )
}

export default AvatarInventory;