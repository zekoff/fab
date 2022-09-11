import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { updateAvatar } from "../util/firestoreWrite";
import AvatarSummary from "./AvatarSummary";

/**
 * Shows information about Family of signed-in user.
 */
function FamilySummary({ family, avatarList }) {
  if (!avatarList) return <LinearProgress />;
  function testAvatarUpdate(avatar) {
    let n = Math.ceil(Math.random() * 40);
    if (n < 10) n = `0${n}`;
    const image = `oryx_16-bit_fantasy/avatars/oryx_16bit_fantasy_creatures_${n}.png`;
    avatar.image = image;
    updateAvatar(avatar);
  }
  return (
    <Box>
      <Typography variant="h4">{family.name} Family Members</Typography>
      <Stack spacing={2}>
        {avatarList.map(avatar =>
          <AvatarSummary key={avatar.firestoreId} family={family} avatar={avatar} testAvatarUpdateFunction={testAvatarUpdate} />)}
      </Stack>
    </Box>
  )
}

export default FamilySummary;