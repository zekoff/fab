import { Button, Card, CardActions, CardContent, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { useAvailableQuests, useFamily } from "../util/hooks";

/**
 * Component that shows all available family quests, and allows an Avatar to
 * accept them.
 * @param {*} param0 
 * @returns the family available quest component, or loading bar if the family
 * state has not loaded yet
 */
function AvailableQuests({ account }) {
  const family = useFamily(account);
  const availableQuests = useAvailableQuests(family?.id);
  if (availableQuests === null) return <LinearProgress />;
  return (
    <>
      <Typography variant="h4">Available Quests</Typography>
      <Stack>
        {availableQuests.map(quest => {
          return (<Card key={quest.id}>
            <CardContent>
              <Typography variant="h5">{quest.name}</Typography>
              <Divider />
              <Typography variant="body">{quest.description}</Typography>
              <br />
              <Typography variant="caption">Reward: {"[NYI]"}</Typography>
            </CardContent>
            <CardActions>
              <Button>Accept Quest</Button>
            </CardActions>
          </Card>)
        })}
      </Stack>
    </>
  );
}

export default AvailableQuests;