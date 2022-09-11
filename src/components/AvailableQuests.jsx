import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { acceptQuest, deleteQuest } from "../util/firestoreWrite";
import QuestCard from "./QuestCard";

/**
 * Component that shows all available family quests, and allows an Avatar to
 * accept them.
 * @returns the family available quest component, or loading bar if the family
 * state has not loaded yet
 */
function AvailableQuests({ family, avatar, sx }) {
  const availableQuests = family.availableQuests;
  const { enqueueSnackbar } = useSnackbar();
  return (<Box sx={sx}>
    <Typography variant="h4">Available Quests</Typography>

    {availableQuests.length === 0 ?
      <Typography>There are no quests available.</Typography> :
      <Stack>
        {availableQuests.map(quest => {
          const acceptQuestHandler = () => {
            acceptQuest(family, avatar, quest);
            enqueueSnackbar(`Accepted quest "${quest.name}".`, { variant: "info" });
          };
          const deleteQuestHandler = () => {
            deleteQuest(family, quest);
            enqueueSnackbar(`Deleted quest "${quest.name}".`, { variant: "error" });
          };
          return <QuestCard
            key={quest.id}
            quest={quest}
            buttons={[
              <Button
                key="accept-button"
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={acceptQuestHandler}
              >Accept Quest</Button>,
              <Button
                key="delete-button"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deleteQuestHandler}
              >Delete Quest</Button>
            ]} />
        })}
      </Stack>
    }
  </Box>);
}

export default AvailableQuests;