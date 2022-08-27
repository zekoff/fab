import { Card, CardContent, List, ListItem, Typography } from "@mui/material";

/**
 * Shows information about Family of signed-in user.
 */
function FamilyCard({ familyInfo }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{familyInfo?.name} Family</Typography>
        <Typography variant="h5">Family Members:</Typography>
        <List>
          <ListItem>TBD</ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default FamilyCard;