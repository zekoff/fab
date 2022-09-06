import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { useState } from "react";
import { Quest, Reward } from "../util/dataclasses";
import { addQuest } from "../util/firestoreWrite";
import { useSnackbar } from "notistack";
import CreateReward from "./CreateReward";

function CreateQuest({ familyId, sx }) {
  const [questName, setQuestName] = useState("");
  const [questNameError, setQuestNameError] = useState("");
  const [questDescription, setQuestDescription] = useState("");
  const [questDescriptionError, setQuestDescriptionError] = useState("");
  const [questReward, setQuestReward] = useState(new Reward());
  const { enqueueSnackbar } = useSnackbar();
  function handleSubmit() {
    let error = false;
    if (!questName) {
      setQuestNameError("Enter a name for the quest.");
      error = true;
    }
    if (!questDescription) {
      setQuestDescriptionError("Enter a description for the quest.");
      error = true;
    }
    if (error) return;
    const quest = new Quest();
    quest.name = questName;
    quest.description = questDescription;
    quest.reward = questReward;
    addQuest(familyId, quest);
    enqueueSnackbar(`Created new quest "${quest.name}".`, { variant: "info" });
    setQuestName("");
    setQuestDescription("");
  }
  return (
    <Box sx={sx}>
      <Typography variant="h4">Create New Quest</Typography>
      <Stack>
        <TextField
          id="quest-name-field"
          label="Quest Name"
          autoComplete="off"
          error={!!questNameError}
          helperText={questNameError}
          value={questName}
          onChange={event => {
            setQuestName(event.target.value);
            setQuestNameError("");
          }} />
        <TextField
          id="quest-description-field"
          label="Quest Description"
          autoComplete="off"
          error={!!questDescriptionError}
          helperText={questDescriptionError}
          multiline
          value={questDescription}
          onChange={event => {
            setQuestDescription(event.target.value);
            setQuestDescriptionError("");
          }} />
        <Typography variant="body">Reward: {questReward.toString()}</Typography>
        <CreateReward rewardCallback={setQuestReward} />
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<CreateIcon />}
          sx={{ mt: 1 }}
        >Create Quest</Button>
      </Stack>
    </Box>
  )
}

export default CreateQuest;