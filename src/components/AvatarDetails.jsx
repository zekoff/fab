import { Box, Typography } from "@mui/material";
import { useImageFromStorage } from "../util/hooks";

function AvatarDetails({ avatar }) {
  if (!avatar) return null;
  return (
    <>
      <Box component="img" sx={{ width: 48, height: 48 }} alt="Avatar" src={avatar.getImageUrl()} loading="lazy" />
      <Typography variant="h5">{avatar.name}</Typography>
    </>
  );
}

export default AvatarDetails;