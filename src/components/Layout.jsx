import { Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserButton from "./UserButton";

function Layout(props) {
  return (
    <Container>
      <Typography variant="h3">Family Achievement Board</Typography>
      <UserButton />
      <Outlet />
    </Container>
  )
}

export default Layout;