import { Button, Typography } from "@mui/material";
import { useAvatar, useGenericItemList, useImageFromStorage, useInventory } from "../util/hooks";
import AvatarInventory from "./AvatarInventory";

function AvatarDetails({ familyId, avatarId }) {
  const avatar = useAvatar(familyId, avatarId);
  const inventory = useInventory(familyId, avatarId);
  const genericItemList = useGenericItemList();
  const avatarImageSrc = useImageFromStorage(avatar?.image);
  if (!avatar) return null;
  return (
    <>
      <img src={avatarImageSrc} width={48} height={48} alt="Avatar" />
      <Typography variant="h5">{avatar.name}</Typography>
      <Button onClick={() => console.log(avatar)}>Log Avatar</Button>
      <Button onClick={() => console.log(inventory)}>Log Inventory</Button>
      <Button onClick={() => console.log(genericItemList)}>Log ItemList</Button>
      <AvatarInventory inventory={inventory} itemList={genericItemList} />
    </>
  );
}

export default AvatarDetails;