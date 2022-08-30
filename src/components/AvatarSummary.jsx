import { Avatar, Grid, Paper, Typography } from "@mui/material";

function AvatarSummary({ name, level }) {
  return (
    <Paper>
      <Grid container padding={2} spacing={10} alignItems={"center"} justifyContent="space-evenly">
        <Grid item xs={3}>
          <Avatar alt={name} >{Array.from(name)[0]}</Avatar>
        </Grid>
        <Grid item xs={5}>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Level: {level}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AvatarSummary;