import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { AppBar, BottomNavigation, BottomNavigationAction, Button, Container, Divider, LinearProgress, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../index.css";
import { AccountContext } from "./AccountContext";
import UserButton from "./UserButton";
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from '../util/hooks';

/**
 * Defines top-level layout for UI, including Router Outlet for subcomponents.
 */
function Layout({ family, avatarId, setAvatarId }) {
  const user = useUser();
  const account = useContext(AccountContext);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleMenu = event => setMenuAnchorEl(event.currentTarget);
  const handleClose = () => setMenuAnchorEl(null);
  return <>
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant='h5' sx={{ flexGrow: 1 }}>Family Achivement Board</Typography>
        {user === null ?
          <UserButton sx={{ flexGrow: 0 }} /> :
          <Button sx={{ flexGrow: 0 }} variant="contained" onClick={handleMenu}>Account Menu</Button>
        }

        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <ChangeCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Change Avatar" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => {
            handleClose();
            signOut(getAuth());
          }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
    <Container sx={{ paddingBottom: 8 }}>
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