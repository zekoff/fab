import { Button, Card, CardActions, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import { updateAvatar } from "../util/firestoreWrite";
import { useAvatarList, useFamily } from "../util/hooks";
import AvatarSummary from "./AvatarSummary";

/**
 * Shows information about Family of signed-in user.
 */
function FamilyCard({ account }) {
  const family = useFamily(account);
  const avatarList = useAvatarList(account);
  function testAvatarUpdate(family, avatar) {
    const n = Math.ceil(Math.random() * 8);
    const image = `heroes/oryx_16bit_fantasy_creatures_0${n}.png`;
    avatar.image = image;
    updateAvatar(family?.id, avatar);
  }
  if (![account, family, avatarList].every(Boolean)) return <LinearProgress />; else
    return (
      <Card>
        <CardContent>
          <Typography variant="h4">{family.name} Family</Typography>
          <Stack spacing={2}>
            {avatarList?.map(avatar =>
              <AvatarSummary key={avatar.id} avatar={avatar} testAvatarUpdateFunction={testAvatarUpdate} />)}
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={() => console.log(family)}>Log Family Info</Button>
        </CardActions>
      </Card>
    )
}

export default FamilyCard;