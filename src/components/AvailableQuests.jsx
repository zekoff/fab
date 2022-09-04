import { Box, Button, Card, CardActions, CardContent, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { acceptQuest, deleteQuest } from "../util/firestoreWrite";
import { useAvailableQuests } from "../util/hooks";

/**
 * Component that shows all available family quests, and allows an Avatar to
 * accept them.
 * @param {*} param0 
 * @returns the family available quest component, or loading bar if the family
 * state has not loaded yet
 */
function AvailableQuests({ familyId, avatarId, sx }) {
  const availableQuests = useAvailableQuests(familyId);
  if (availableQuests === null || !avatarId) return <LinearProgress />;
  return (
    <Box sx={sx}>
      <Typography variant="h4">Available Quests</Typography>
      {availableQuests.length === 0 ?
        <Typography>There are no quests available.</Typography> :
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
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={() => acceptQuest(familyId, avatarId, quest)}
                >
                  Accept Quest
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteQuest(familyId, quest)}
                >
                  Delete Quest
                </Button>
              </CardActions>
            </Card>)
          })}
        </Stack>
      }
    </Box>
  );
}

export default AvailableQuests;