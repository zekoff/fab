import { LinearProgress, List, ListItem, ListItemText, Typography } from "@mui/material";

function FamilyAchievements({ family }) {
  if (!family) return <LinearProgress />
  return (
    <>
      <Typography variant="h3">Recent {family.name} Achievements</Typography>
      <List>
        {family.recentAchievements.map((achievement, index) => {
          return (
            <ListItem key={index}>
              <ListItemText primary={achievement.description} />
            </ListItem>
          )
        })}
      </List>
    </>
  );
}

export default FamilyAchievements;