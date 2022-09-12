import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Achievement } from '../util/firestoreClasses';
import { updateAvatar, updateFamily } from "../util/firestoreWrite";
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
            const index = avatar.currentQuests.indexOf(quest);
            avatar.currentQuests.splice(index, 1);
            avatar.unclaimedRewards.push(quest.reward);
            const achievement = new Achievement();
            achievement.avatarName = avatar.name;
            achievement.description = `Completed quest "${quest.name}"!`
            achievement.type = 'quest';
            family.recentAchievements.push(achievement);
            updateFamily(family);
            updateAvatar(avatar);
            enqueueSnackbar(`Completed quest "${quest.name}".`, { variant: "success" });
          };
          const abandonQuestHandler = () => {
            const index = avatar.currentQuests.indexOf(quest);
            avatar.currentQuests.splice(index, 1);
            family.availableQuests.push(quest);
            updateFamily(family);
            updateAvatar(avatar);
            enqueueSnackbar(`Abandoned quest "${quest.name}.`, { variant: "error" });
          };
          return <QuestCard
            key={quest.uuid}
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