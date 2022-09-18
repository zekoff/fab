import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import FirebaseImage from "../widgets/FirebaseImage";

function AvatarSummary({ avatar, testAvatarUpdateFunction }) {
  return (
    <Paper>
      <Grid container padding={2} spacing={10} alignItems={"center"} justifyContent="space-evenly">
        <Grid item xs={2}>
          <Avatar component={FirebaseImage} alt={avatar.name} image={avatar.image} variant="square" />
        </Grid>
        <Grid item xs={4}>
          <Typography>{avatar.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Level: {avatar.level}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => {
            avatar.coins = Math.floor(Math.random() * 100);
            avatar.level = Math.ceil(Math.random() * 10);
            console.log(avatar);
            testAvatarUpdateFunction(avatar);
          }}>Test Avatar</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AvatarSummary;