import { List, Typography } from "@mui/material";
import { Item } from "../util/dataclasses";
import ItemDisplay from "./ItemDisplay";

function populateInventoryList(inventory, itemList) {
  return inventory.map(itemId => {
    return itemList.find(element => element.id === itemId) || new Item();
  });
}

function AvatarInventory({ inventory, itemList }) {
  return (
    <>
      <Typography variant="h6">Inventory</Typography>
      <List>
        {
          inventory && itemList ?
            populateInventoryList(inventory, itemList).map(
              item => <ItemDisplay key={item.id} item={item} />
            ) : null
        }
      </List>
    </>
  )
}

export default AvatarInventory;