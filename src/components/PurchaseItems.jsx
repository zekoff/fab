import { Box, Button, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { updateAvatar, updateFamily } from "../util/firestoreWrite";
import ItemDetails from "../widgets/ItemDetails";

function PurchaseItems({ avatar, family, ...props }) {
  const { enqueueSnackbar } = useSnackbar();
  const purchaseItemHandler = (item) => {
    // Check that avatar can afford item
    if (avatar.coins < item.value) {
      // Create snackbar warning
      enqueueSnackbar(`Can't afford ${item.name}. It costs ${item.value}, but you only have ${avatar.coins}.`, { variant: "warning" });
      return;
    }
    // Move item from shop inventory to avatar inventory
    const index = family.shopInventory.indexOf(item);
    family.shopInventory.splice(index, 1);
    avatar.inventory.push(item);
    // Update avatar and family
    updateAvatar(avatar);
    updateFamily(family);
    enqueueSnackbar(`Purchased ${item.name} for ${item.value}!`, { variant: "success" });
  };
  return <Box sx={props.sx}>
    <Typography variant="h4">Purchase Items</Typography>
    {family.shopInventory.length === 0 ? <Typography variant="body">No items for sale.</Typography> :
      family.shopInventory.map(item => {
        return <Paper key={item.uuid} sx={{ m: 1 }}>
          <ItemDetails item={item} />
          <Button onClick={() => purchaseItemHandler(item)}>Purchase Item</Button>
        </Paper>
      })
    }
  </Box>;
}

export default PurchaseItems;