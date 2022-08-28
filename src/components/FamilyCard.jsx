import { Button, Card, CardActions, CardContent, List, ListItem, Typography } from "@mui/material";

/**
 * Shows information about Family of signed-in user.
 */
function FamilyCard({ family }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{family?.name} Family</Typography>
        <Typography variant="body1">Family Members:</Typography>
        <List>
          <ListItem>TBD</ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button onClick={() => console.log(family)}>Log Family Info</Button>
      </CardActions>
    </Card>
  )
}

export default FamilyCard;