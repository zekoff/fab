import { Box, Button, LinearProgress, List, ListItem, Typography } from "@mui/material";
import { useGenericItemDefinitions } from "../util/hooks";
import ItemDetails from "../widgets/ItemDetails";

/**
 * Component to browse a list of all items, with ability to select an item
 * from the list. Selected item will be passed to parent component via
 * callback.
 * @param {*} props accepts 'selectedItemCallback' prop. This function will be
 * called with the ID of the selcted item as a parameter if one is selected. 
 * @returns the item selection component
 */
function BrowseItems({ selectedItemCallback }) {
  const items = useGenericItemDefinitions();
  if (!items) return <LinearProgress />;
  return (
    <Box>
      <Typography variant="h5">Browse Items:</Typography>
      <List>
        {items.map(item =>
          <ListItem key={item.id}>
            <Box sx={{ flexGrow: 1 }}>
              <ItemDetails item={item} />
            </Box>
            <Button onClick={() => selectedItemCallback(item)}>Select Item</Button>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default BrowseItems;