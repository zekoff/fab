import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Quest, Reward } from "../util/dataclasses";
import { addQuest } from "../util/firestoreWrite";

function CreateQuest({ familyId, sx }) {
  const [questName, setQuestName] = useState("");
  const [questDescription, setQuestDescription] = useState("");
  const [questReward, setQuestReward] = useState(new Reward());
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted quest form");
    const quest = new Quest();
    quest.name = questName;
    quest.description = questDescription;
    quest.reward = questReward;
    addQuest(familyId, quest);
    setQuestName("");
    setQuestDescription("");
    setQuestReward(new Reward());
  }
  return (
    <Box sx={sx}>
      <Typography variant="h4">Create New Quest</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="quest-name-field"
          label="Quest Name"
          value={questName}
          onChange={event => setQuestName(event.target.value)}
        />
        <br />
        <TextField
          id="quest-description-field"
          label="Quest Description"
          value={questDescription}
          onChange={event => setQuestDescription(event.target.value)}
        />
        <br />
        <Typography variant="body">Reward: {questReward.toString()}</Typography>
        <br />
        <Button variant="contained" onClick={handleSubmit}>Create Quest</Button>
      </form>
    </Box>
  )
}

export default CreateQuest;