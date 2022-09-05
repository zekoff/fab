import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { abandonQuest, completeQuest } from "../util/firestoreWrite";
import { useCurrentQuests } from "../util/hooks";
import QuestCard from "./QuestCard";

/**
 * Component to show avatar's current (accepted) quests. If user is a family
 * admin, allow the quests to be marked completed.
 * @param {*} props 
 */
function CurrentQuests({ familyId, avatarId, sx }) {
  const currentQuests = useCurrentQuests(familyId, avatarId);
  const { enqueueSnackbar } = useSnackbar();
  if (currentQuests === null) return <LinearProgress />
  return (<Box sx={sx}>
    <Typography variant="h4">Current Quests</Typography>

    {currentQuests.length === 0 ?
      <Typography>You haven't accepted any quests.</Typography> :
      <Stack>
        {currentQuests.map(quest => {
          const completeQuestHandler = () => {
            completeQuest(familyId, avatarId, quest);
            enqueueSnackbar(`Completed quest "${quest.name}".`, { variant: "success" });
          };
          const abandonQuestHandler = () => {
            abandonQuest(familyId, avatarId, quest);
            enqueueSnackbar(`Abandoned quest "${quest.name}.`, { variant: "error" });
          };
          return <QuestCard
            quest={quest}
            buttons={[
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={completeQuestHandler}
              >Complete Quest</Button>,
              <Button
                variant="outlined"
                color="error"
                startIcon={<RemoveCircleIcon />}
                onClick={abandonQuestHandler}
              >Abandon Quest</Button>
            ]}
          />
        })}
      </Stack>
    }
  </Box>);
}

export default CurrentQuests;