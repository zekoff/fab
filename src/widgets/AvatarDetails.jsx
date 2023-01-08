import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { updateAvatar } from "../util/firestoreWrite";
import FirebaseImage from "./FirebaseImage";
import FirebaseImageBrowser from "./FirebaseImageBrowser";

function AvatarImageSelectDialog({ avatar, isOpen, imageSelectionCallback,
  handleDialogClose, ...props }) {
  return <Dialog onClose={handleDialogClose} open={isOpen} sx={{ p: 1, m: 1 }}>
    <DialogTitle>Select Avatar Image:</DialogTitle>
    <DialogContent>
      <FirebaseImageBrowser imageCallback={image => {
        imageSelectionCallback(image);
        handleDialogClose();
      }} storagePrefix="oryx_16-bit_fantasy/avatars" />
    </DialogContent>
  </Dialog>;
}

function AvatarDetails({ avatar }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const imageSelectionCallback = (image) => {
    avatar.image = image;
    updateAvatar(avatar);
  };
  return (
    <>
      <AvatarImageSelectDialog avatar={avatar} isOpen={dialogOpen}
        imageSelectionCallback={imageSelectionCallback}
        handleDialogClose={() => setDialogOpen(false)} />
      <FirebaseImage sx={{ width: 48, height: 48 }} alt="Avatar" image={avatar.image}
        onClick={() => setDialogOpen(true)} />
      <Typography variant="h5">{avatar.name}</Typography>
      <Typography>Level: {avatar.level}</Typography>
      <Typography>XP: {avatar.xp} ({100-avatar.xp} XP to next level)</Typography>
      <Typography>Coins: {avatar.coins}</Typography>
    </>
  );
}

export default AvatarDetails;