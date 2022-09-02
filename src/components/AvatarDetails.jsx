import { Button } from "@mui/material";
import { useAvatar, useInventory } from "../util/hooks";

function AvatarDetails({ familyId, avatarId }) {
  const avatar = useAvatar(familyId, avatarId);
  const inventory = useInventory(familyId, avatarId);
  if (!avatar) return null;
  return (
    <>
      <p>{avatar.name}</p>
      <Button onClick={() => console.log(avatar)}>Log Avatar</Button>
      <Button onClick={() => console.log(inventory)}>Log Inventory</Button>
      {inventory ?
        inventory.map(item => <p key={item}>{item}</p>)
        : null}
    </>
  );
}

export default AvatarDetails;