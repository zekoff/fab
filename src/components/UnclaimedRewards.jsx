import { LinearProgress, Typography } from "@mui/material";
import { useUnclaimedRewards } from "../util/hooks";

function UnclaimedRewards({ familyId, avatarId, sx }) {
  const unclaimedRewardList = useUnclaimedRewards(familyId, avatarId);
  if (!unclaimedRewardList) return <LinearProgress />
  if (unclaimedRewardList.length === 0) return null;
  // Show treasure chest for each unclaimed reward
  // Tap the treasure chest and all coins animate to coin piggy bank,
  // XP blobs animate to avatar level up bar, bar going over 100 causes
  // level to increase
  // When treasure chest is tapped, Firestore transaction executes
  return <Box sx={sx}>
    <Typography variant="h5">Rewards to Claim:</Typography>
  </Box>
}

export default UnclaimedRewards;