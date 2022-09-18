import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Stack, Typography } from "@mui/material";

function AchievementDetails({ achievement, ...props }) {
  return <Box components={props.component} sx={props.sx}>
    <Stack direction="row">
      <EmojiEventsIcon fontSize="large" sx={{ color: 'gold' }} />
      <Stack>
        <Typography>{`${achievement.avatarName} earned an achievement!`}</Typography>
        <Typography>{achievement.description}</Typography>
      </Stack>
    </Stack>
  </Box>;
}

export default AchievementDetails;