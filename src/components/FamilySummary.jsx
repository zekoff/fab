import { Stack, Typography } from "@mui/material";
import AvatarSummary from "./AvatarSummary";

/**
 * Shows information about Family of signed-in user.
 */
function FamilySummary({ family, avatarList }) {
  return <>
    <Typography variant="h4">{family.name} Family Members</Typography>
    <Stack spacing={2}>
      {avatarList.map(avatar =>
        <AvatarSummary key={avatar.firestoreId} family={family} avatar={avatar} />)}
    </Stack>
  </>
}

export default FamilySummary;