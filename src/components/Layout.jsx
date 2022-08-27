import { Button, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import UserButton from "./UserButton";

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
      <Outlet />
    </Container>
  )
}

export default Layout;