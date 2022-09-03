import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, BottomNavigation, BottomNavigationAction, Container, LinearProgress, Toolbar, Typography } from "@mui/material";
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
  return <>
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant='h5' sx={{ flexGrow: 1 }}>Family Achivement Board</Typography>
        <UserButton sx={{ flexGrow: 0 }} />
      </Toolbar>
    </AppBar>
    <Container>
      {account ? <Outlet /> : <LinearProgress />}
    </Container>
    <BottomNavigation showLabels sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} component={NavLink} to="/" />
      <BottomNavigationAction label="Avatar" icon={<PersonIcon />} component={NavLink} to="avatar" />
      <BottomNavigationAction label="Family" icon={<FamilyRestroomIcon />} component={NavLink} to="family" />
    </BottomNavigation>
  </>
}

export default Layout;