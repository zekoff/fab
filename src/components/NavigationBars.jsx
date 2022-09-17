import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PersonIcon from '@mui/icons-material/Person';

import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Dialog, DialogTitle, Divider, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import UserButton from "./UserButton";

import { Link, NavLink } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from '../util/hooks';
import FirebaseImage from './FirebaseImage';

function AvatarChangeDialog({ dialogOpen, avatarList, handleDialogClose, setAvatar }) {
  return (
    <Dialog onClose={handleDialogClose} open={dialogOpen}>
      <DialogTitle>Switch to Avatar:</DialogTitle>
      <List>
        {avatarList.map(avatar => {
          return (<Box key={avatar.firestoreId}>
            <Divider />
            <ListItem
              button
              onClick={() => {
                handleDialogClose();
                setAvatar(avatar);
              }}
            >
              <Stack direction="row" alignItems="center">
                <FirebaseImage image={avatar.image} sx={{ m: 1, width: 24, height: 24 }} />
                <ListItemText primary={avatar.name} />
              </Stack>
            </ListItem>
          </Box>)
        })}
      </List>
    </Dialog>
  )
}

function TopAppBar({ family, avatar, avatarList, setAvatar, ...props }) {
  const user = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleMenu = event => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);
  return <>
    <AvatarChangeDialog
      dialogOpen={dialogOpen}
      avatarList={avatarList}
      handleDialogClose={() => setDialogOpen(false)}
      setAvatar={setAvatar}
    />
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <FirebaseImage image={family.image} sx={{ flexGrow: 0, mr: 1 }} />
        <Typography component={Link} style={{ textDecoration: 'none', color: 'inherit' }}
          to="/" variant='h5' sx={{ flexGrow: 1 }}>
          {`${family.name} Achievement Board`}
        </Typography>
        {user === null ?
          <UserButton sx={{ flexGrow: 0 }} /> :
          <Button sx={{ flexGrow: 0 }} variant="contained" onClick={handleMenu}>
            {avatar.name}<FirebaseImage image={avatar.image} sx={{ ml: 1 }} />
          </Button>
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
          <MenuItem component={Link} to="/admin">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Tools" />
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
  </>
}

function BottomNavBar({ ...props }) {
  return <BottomNavigation showLabels sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
    <BottomNavigationAction label="Family" icon={<FamilyRestroomIcon />} component={NavLink} to="/" />
    <BottomNavigationAction label="Avatar" icon={<PersonIcon />} component={NavLink} to="avatar" />
    <BottomNavigationAction label="Quests" icon={<AssignmentLateIcon />} component={NavLink} to="quests" />
    <BottomNavigationAction label="Shop" icon={<MonetizationOnIcon />} component={NavLink} to="shop" />
  </BottomNavigation>
}

export { TopAppBar, BottomNavBar };