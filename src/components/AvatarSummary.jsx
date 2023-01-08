import { Paper, Stack, Typography } from "@mui/material";
import FirebaseImage from "../widgets/FirebaseImage";

function AvatarSummary({ avatar, ...props }) {
  return (
    <Paper>
      <Stack direction="row" spacing={2} padding={2}>
        <FirebaseImage alt={avatar.name} image={avatar.image} />
        <Typography sx={{ flexGrow: 1 }}>{avatar.name}</Typography>
        <Typography>Level: {avatar.level}</Typography>
      </Stack>
    </Paper>
  );
}

export default AvatarSummary;