import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FirebaseImage from "../widgets/FirebaseImage";

function AvatarSummary({ avatar, ...props }) {
  return (
    <Paper>
      <Grid container padding={2} spacing={10} alignItems={"center"} justifyContent="space-evenly">
        <Grid xs={2}>
          <FirebaseImage alt={avatar.name} image={avatar.image} />
        </Grid>
        <Grid xs={4}>
          <Typography>{avatar.name}</Typography>
        </Grid>
        <Grid xs={3}>
          <Typography>Level: {avatar.level}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AvatarSummary;