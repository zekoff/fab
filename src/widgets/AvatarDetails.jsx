import { Typography } from "@mui/material";
import FirebaseImage from "./FirebaseImage";

function AvatarDetails({ avatar }) {
  if (!avatar) return null;
  return (
    <>
      <FirebaseImage sx={{ width: 48, height: 48 }} alt="Avatar" image={avatar.image} loading="lazy" />
      <Typography variant="h5">{avatar.name}</Typography>
      <Typography>Level: {avatar.level}</Typography>
      <Typography>XP: {avatar.xp}</Typography>
      <Typography>Coins: {avatar.coins}</Typography>
    </>
  );
}

export default AvatarDetails;