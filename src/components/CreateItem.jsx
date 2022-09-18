import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Item } from "../util/firestoreClasses";
import clone from "lodash.clonedeep";
import FirebaseImage from "../widgets/FirebaseImage";
import FirebaseImageBrowser from "../widgets/FirebaseImageBrowser";

function CreateItem({ itemCallback, ...props }) {
  const [item, setItem] = useState(new Item());
  const makeFieldUpdateHandler = (fieldName) => {
    return (event) => {
      const updatedItem = clone(item);
      updatedItem[fieldName] = event.target.value;
      setItem(updatedItem);
    }
  };

  return <Box sx={props.sx}>
    <Stack spacing={1}>
      <TextField label="Item Name" required value={item.name}
        onChange={makeFieldUpdateHandler("name")} />
      <TextField label="Description" required value={item.description}
        onChange={makeFieldUpdateHandler("description")} />
      <TextField label="Value" type="number" value={item.value}
        onChange={makeFieldUpdateHandler("value")} />
      <Typography>Image:</Typography><FirebaseImage image={item.image} />
      <FirebaseImageBrowser storagePrefix="oryx_16-bit_fantasy/items" imageCallback={image => {
        console.log("updating selected item");
        const updatedItem = clone(item);
        updatedItem.image = image;
        setItem(updatedItem);
      }} />
      <Button onClick={() => {
        itemCallback(item);
        setItem(new Item());
      }} >Create Item</Button>
    </Stack>
  </Box>;
}

export default CreateItem;