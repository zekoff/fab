import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import { BottomNavigation, BottomNavigationAction, Button, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../index.css";
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
      <BottomNavigation showLabels sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} component={NavLink} to="/" />
        <BottomNavigationAction label="Family" icon={<FamilyRestroomIcon />} component={NavLink} to="family" />
      </BottomNavigation>
    </Container>
  )
}

export default Layout;