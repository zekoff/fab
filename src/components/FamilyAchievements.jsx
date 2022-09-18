import { Paper, Typography } from "@mui/material";
import AchievementDetails from "../widgets/AchievementDetails";

function timestampSort(a, b) {
  if (a.timestamp < b.timestamp) return -1;
  if (a.timestamp > b.timestamp) return 1;
  if (a.timestamp === b.timestamp) return 0;
}

function FamilyAchievements({ family }) {
  return (
    <>
      <Typography variant="h3">Recent {family.name} Achievements</Typography>
      {family.recentAchievements.length === 0 ? <Typography>No achievements. Get to work!</Typography> :
        family.recentAchievements.sort(timestampSort).reverse().map((achievement, index) => {
          return (
            <AchievementDetails key={index} achievement={achievement}
              component={Paper} sx={{ p: 1, m: 1 }} />
          )
        })}
    </>
  );
}

export default FamilyAchievements;