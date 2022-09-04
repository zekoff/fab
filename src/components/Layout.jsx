import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, BottomNavigation, BottomNavigationAction, Button, Container, Dialog, DialogTitle, Divider, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { getAuth, signOut } from 'firebase/auth';
import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../index.css";
import { useUser } from '../util/hooks';
import { AccountContext } from "./AccountContext";
import UserButton from "./UserButton";

function AvatarChangeDialog({ dialogOpen, avatarList, handleDialogClose, setAvatarId }) {
  return (
    <Dialog onClose={handleDialogClose} open={dialogOpen}>
      <DialogTitle>Switch to Avatar:</DialogTitle>
      <List>
        {avatarList.map(avatar => {
          return (<ListItem
            key={avatar.id}
            button
            onClick={() => {
              handleDialogClose();
              setAvatarId(avatar.id);
            }}
          >
            <ListItemText primary={avatar.name} />
          </ListItem>)
        })}
      </List>
    </Dialog>
  )
}

/**
 * Defines top-level layout for UI, including Router Outlet for subcomponents.
 */
function Layout({ family, avatarId, setAvatarId, avatarList }) {
  const user = useUser();
  const account = useContext(AccountContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleMenu = event => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);
  return <>
    <AvatarChangeDialog
      dialogOpen={dialogOpen}
      avatarList={avatarList}
      handleDialogClose={() => setDialogOpen(false)}
      setAvatarId={setAvatarId}
    />
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant='h5' sx={{ flexGrow: 1 }}>Family Achievement Board</Typography>
        {user === null ?
          <UserButton sx={{ flexGrow: 0 }} /> :
          <Button sx={{ flexGrow: 0 }} variant="contained" onClick={handleMenu}>Account Menu</Button>
        }

        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => {
            handleMenuClose();
            setDialogOpen(true);
          }}>
            <ListItemIcon>
              <ChangeCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Change Avatar" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin [NYI]" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => {
            handleMenuClose();
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
      <BottomNavigationAction label="Family" icon={<FamilyRestroomIcon />} component={NavLink} to="/" />
      <BottomNavigationAction label="Avatar" icon={<PersonIcon />} component={NavLink} to="avatar" />
      <BottomNavigationAction label="Quests" icon={<AssignmentLateIcon />} component={NavLink} to="quests" />
    </BottomNavigation>
  </>
}

export default Layout;