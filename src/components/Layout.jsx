import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, BottomNavigation, BottomNavigationAction, Container, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../index.css";
import { AccountContext } from "./AccountContext";
import AvatarDetails from './AvatarDetails';
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
      {account ? <>
        <AvatarDetails familyId={account.familyId} avatarId={account.avatarId} />
        <Outlet />
      </> : <p>Loading...</p>}
    </Container>
    <BottomNavigation showLabels sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} component={NavLink} to="/" />
      <BottomNavigationAction label="Family" icon={<FamilyRestroomIcon />} component={NavLink} to="family" />
    </BottomNavigation>
  </>
}

export default Layout;