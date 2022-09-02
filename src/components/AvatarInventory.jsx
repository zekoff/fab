import { List, ListItem } from "@mui/material";
import { Item } from "../util/dataclasses";

function populateInventoryList(inventory, itemList) {
  return inventory.map(itemId => {
    return itemList.find(element => element.id === itemId) || Item();
  });
}

function AvatarInventory({ inventory, itemList }) {
  return (
    <List>
      {
        inventory && itemList ?
          populateInventoryList(inventory, itemList).map(
            item => <ListItem key={item.id}>{item.name}</ListItem>
          ) : null
      }
    </List>
  )
}

export default AvatarInventory;