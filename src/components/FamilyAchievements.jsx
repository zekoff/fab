import { LinearProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useRecentAchievements } from "../util/hooks";

function FamilyAchievements({ family }) {
  const achievementList = useRecentAchievements(family?.id);
  if (!family || !achievementList) return <LinearProgress />
  return (
    <>
      <Typography variant="h3">Recent {family.name} Achievements</Typography>
      <List>
        {achievementList.map((achievement, index) => {
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