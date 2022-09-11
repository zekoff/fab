import { List, ListItem, ListItemText, Typography } from "@mui/material";

function FamilyAchievements({ family }) {
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