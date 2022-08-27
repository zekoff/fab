import { Button, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserButton from "./UserButton";
import { UserContext } from "./UserContext";

function Layout(props) {
  const user = useContext(UserContext);
  return (
    <Container>
      <Typography variant="h3">Family Achievement Board</Typography>
      <UserButton />
      <Button onClick={()=>console.log(user)}>Log User Info</Button>
      <Outlet />
    </Container>
  )
}

export default Layout;