import { Box, Typography } from "@mui/material";
import { useImageFromStorage } from "../util/hooks";

function AvatarDetails({ avatar }) {
  const avatarImageSrc = useImageFromStorage(avatar?.image);
  if (!avatar) return null;
  return (
    <>
      <Box component="img" sx={{ width: 48, height: 48 }} alt="Avatar" src={avatarImageSrc} loading="lazy" />
      <Typography variant="h5">{avatar.name}</Typography>
    </>
  );
}

export default AvatarDetails;