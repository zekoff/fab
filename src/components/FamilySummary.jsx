import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { updateAvatar } from "../util/firestoreWrite";
import { useAvatarList, useFamily } from "../util/hooks";
import AvatarSummary from "./AvatarSummary";

/**
 * Shows information about Family of signed-in user.
 */
function FamilySummary({ account }) {
  const family = useFamily(account);
  const avatarList = useAvatarList(account);
  if (![account, family, avatarList].every(Boolean)) return <LinearProgress />;
  function testAvatarUpdate(family, avatar) {
    const n = Math.ceil(Math.random() * 8);
    const image = `heroes/oryx_16bit_fantasy_creatures_0${n}.png`;
    avatar.image = image;
    updateAvatar(family?.id, avatar);
  }
  return (
    <Box>
      <Typography variant="h4">{family.name} Family Members</Typography>
      <Stack spacing={2}>
        {avatarList?.map(avatar =>
          <AvatarSummary key={avatar.id} family={family} avatar={avatar} testAvatarUpdateFunction={testAvatarUpdate} />)}
      </Stack>
    </Box>
  )
}

export default FamilySummary;