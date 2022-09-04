import { Box, Button, Card, CardActions, CardContent, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { useCurrentQuests } from "../util/hooks";

/**
 * Component to show avatar's current (accepted) quests. If user is a family
 * admin, allow the quests to be marked completed.
 * @param {*} props 
 */
function CurrentQuests({ familyId, avatarId, sx }) {
  const currentQuests = useCurrentQuests(familyId, avatarId);
  if (currentQuests === null) return <LinearProgress />
  return (<Box sx={sx}>
    <Typography variant="h4">Current Quests</Typography>
    <Stack>
      {currentQuests.map(quest => {
        return (<Card key={quest.id}>
          <CardContent>
            <Typography variant="h5">{quest.name}</Typography>
            <Divider />
            <Typography variant="body">{quest.description}</Typography>
            <br />
            <Typography variant="caption">Reward: {"[NYI]"}</Typography>
          </CardContent>
          <CardActions>
            <Button>Complete Quest</Button>
          </CardActions>
        </Card>)
      })}
    </Stack>

  </Box>
  );
}

export default CurrentQuests;