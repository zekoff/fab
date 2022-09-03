import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { useImageFromStorage } from "../util/hooks";

function AvatarSummary({ avatar }) {
  const avatarImage = useImageFromStorage(avatar.image);
  return (
    <Paper>
      <Grid container padding={2} spacing={10} alignItems={"center"} justifyContent="space-evenly">
        <Grid item xs={2}>
          <Avatar alt={avatar.name} src={avatarImage} />
        </Grid>
        <Grid item xs={4}>
          <Typography>{avatar.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Level: {avatar.level}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => console.log(avatar)}>Log Avatar</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AvatarSummary;