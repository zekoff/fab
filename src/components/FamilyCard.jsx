import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import AvatarSummary from "./AvatarSummary";

/**
 * Shows information about Family of signed-in user.
 */
function FamilyCard({ family, avatarList }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{family?.name} Family</Typography>
        <Stack spacing={2}>
          {avatarList?.map(avatar =>
            <AvatarSummary key={avatar.id} name={avatar.name} level={avatar.level} />)}
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={() => console.log(family)}>Log Family Info</Button>
      </CardActions>
    </Card>
  )
}

export default FamilyCard;