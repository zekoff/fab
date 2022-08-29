import { Button, Container, List, ListItem, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import UserButton from "./UserButton";
import "../index.css"

/**
 * Defines top-level layout for UI, including Router Outlet for subcomponents.
 */
function Layout(props) {
  const account = useContext(AccountContext);
  return (
    <Container>
      <Typography variant="h3">Family Achievement Board</Typography>
      <UserButton />
      <Button onClick={() => console.log(account)}>Log Account Info</Button>
      <List>
        <ListItem>
          <Typography variant="button"><NavLink to="/">Home</NavLink></Typography>
        </ListItem>
        <ListItem>
          <Typography variant="button"><NavLink to="/family">Family Summary</NavLink></Typography>
        </ListItem>
      </List>
      <Outlet />
    </Container>
  )
}

export default Layout;