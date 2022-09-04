import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { useState } from "react";
import { Quest, Reward } from "../util/dataclasses";
import { addQuest } from "../util/firestoreWrite";

function CreateQuest({ familyId, sx }) {
  const [questName, setQuestName] = useState("");
  const [questNameError, setQuestNameError] = useState("");
  const [questDescription, setQuestDescription] = useState("");
  const [questDescriptionError, setQuestDescriptionError] = useState("");
  const [questReward, setQuestReward] = useState(new Reward());
  function handleSubmit() {
    if (!questName)
      setQuestNameError("Enter a name for the quest.");
    if (!questDescription)
      setQuestDescriptionError("Enter a description for the quest.");
    if (questNameError || questDescriptionError) return;
    const quest = new Quest();
    quest.name = questName;
    quest.description = questDescription;
    quest.reward = questReward;
    addQuest(familyId, quest);
    console.log("Submitted quest form");
    setQuestName("");
    setQuestDescription("");
    setQuestReward(new Reward());
  }
  return (
    <Box sx={sx}>
      <Typography variant="h4">Create New Quest</Typography>
      <Stack>
        <TextField
          id="quest-name-field"
          label="Quest Name"
          error={!!questNameError}
          helperText={questNameError}
          value={questName}
          onChange={event => {
            setQuestName(event.target.value);
            setQuestNameError("");
          }}
        />
        <TextField
          id="quest-description-field"
          label="Quest Description"
          error={!!questDescriptionError}
          helperText={questDescriptionError}
          multiline
          value={questDescription}
          onChange={event => {
            setQuestDescription(event.target.value);
            setQuestDescriptionError("");
          }}
        />
        <Typography variant="body">Reward: {questReward.toString()}</Typography>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<CreateIcon />}
        >
          Create Quest
        </Button>
      </Stack>
    </Box>
  )
}

export default CreateQuest;