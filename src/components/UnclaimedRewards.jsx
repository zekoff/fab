import { Box, Button, Paper, Typography } from "@mui/material";
import { updateAvatar } from "../util/firestoreWrite";

function UnclaimedRewards({ avatar, ...props }) {
  if (avatar.unclaimedRewards.length === 0) return null;
  // Show treasure chest for each unclaimed reward
  // Tap the treasure chest and all coins animate to coin piggy bank,
  // XP blobs animate to avatar level up bar, bar going over 100 causes
  // level to increase
  // When treasure chest is tapped, Firestore transaction executes
  const claimRewardHandler = (reward) => {
    if (reward.coins) avatar.coins += reward.coins;
    if (reward.xp) avatar.xp += reward.xp;
    if (reward.items) reward.items.forEach(item => avatar.items.push(item));
    while (avatar.xp >= 100) {
      avatar.level++;
      avatar.xp -= 100;
    }
    const index = avatar.unclaimedRewards.indexOf(reward);
    avatar.unclaimedRewards.splice(index, 1);
    updateAvatar(avatar);
  }
  return <Box sx={props.sx}>
    <Typography variant="h5">Rewards to Claim:</Typography>
    {avatar.unclaimedRewards.map(reward => {
      return <Paper key={reward.uuid} sx={{ p: 1, m: 1 }}>
        <Typography>{reward.toString()}</Typography>
        <Button onClick={() => claimRewardHandler(reward)}>Claim Reward</Button>
      </Paper>
    })}
  </Box>
}

export default UnclaimedRewards;