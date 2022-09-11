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
function CurrentQuests({ family, avatar, sx }) {
  const { enqueueSnackbar } = useSnackbar();
  const currentQuests = avatar.currentQuests;
  return (<Box sx={sx}>
    <Typography variant="h4">Current Quests</Typography>

    {currentQuests.length === 0 ?
      <Typography>You haven't accepted any quests.</Typography> :
      <Stack>
        {currentQuests.map(quest => {
          const completeQuestHandler = () => {
            completeQuest(family, avatar, quest);
            enqueueSnackbar(`Completed quest "${quest.name}".`, { variant: "success" });
          };
          const abandonQuestHandler = () => {
            abandonQuest(family, avatar, quest);
            enqueueSnackbar(`Abandoned quest "${quest.name}.`, { variant: "error" });
          };
          return <QuestCard
            key={quest.id}
            quest={quest}
            buttons={[
              <Button
                key="complete-button"
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={completeQuestHandler}
              >Complete Quest</Button>,
              <Button
                key="abandon-button"
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