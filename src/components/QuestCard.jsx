import { Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";

/**
 * Display component for quest information, including optionally buttons
 * to manipulate the quest.
 * @param {*} props "quest" prop is a Quest object to display in the
 * card. "buttons" prop is a list of 0..n buttons that will appear
 * in the card's action area 
 * @returns a Card component
 */
function QuestCard({ quest, buttons, sx }) {
  return (
    <Card sx={{ margin: 1, ...sx }}>
      <CardContent>
        <Stack>
          <Typography variant="h5">{quest.name}</Typography>
          <Divider />
          <Typography variant="body">{quest.description}</Typography>
          <Typography variant="caption">Reward: {quest.reward.toString()}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        {buttons.map(button => button)}
      </CardActions>
    </Card >
  )
}

export default QuestCard;