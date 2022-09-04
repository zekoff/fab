import { LinearProgress, Typography } from "@mui/material";
import { Quest } from "../util/dataclasses";
import { useCurrentQuests } from "../util/hooks";

/**
 * Component to show avatar's current (accepted) quests. If user is a family
 * admin, allow the quests to be marked completed.
 * @param {*} props 
 */
function CurrentQuests({ familyId, avatarId }) {
  const currentQuests = useCurrentQuests(familyId, avatarId);
  if (currentQuests === null) return <LinearProgress />
  return (
    <Typography variant="h4">Current Quests</Typography>
  );
}

export default CurrentQuests;