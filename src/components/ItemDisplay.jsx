import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState } from "react";
import { useImageFromStorage } from "../util/hooks";

const IMG_SIZE = 24;

function ItemDisplay({ item }) {
  const [showDescription, setShowDescription] = useState(false);
  const imageSrc = useImageFromStorage(item.image);
  return <ListItem onClick={() => setShowDescription(!showDescription)}>
    <ListItemAvatar>
      <Avatar src={imageSrc} variant="square" sx={{ width: IMG_SIZE, height: IMG_SIZE }} />
    </ListItemAvatar>
    <ListItemText primary={item.name} secondary={showDescription ? item.description : null} />
  </ListItem>
}

export default ItemDisplay;