import { Paper, Typography } from "@mui/material";
import AchievementDetails from "../widgets/AchievementDetails";

function FamilyAchievements({ family }) {
  return (
    <>
      <Typography variant="h3">Recent {family.name} Achievements</Typography>
      {family.recentAchievements.map((achievement, index) => {
        return (
          <AchievementDetails key={index} achievement={achievement}
            component={Paper} sx={{ p: 1, m: 1 }} />
        )
      })}
    </>
  );
}

export default FamilyAchievements;