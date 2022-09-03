import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Avatar } from "./dataclasses";

function updateAvatar(familyId, avatar) {
  const ref = doc(getFirestore(), "families", familyId, "avatars", avatar.id)
    .withConverter(Avatar.converter);
  setDoc(ref, avatar);
}

function addItemToInventory(familyId, avatar, item) {
  // firestore add function
}

export { updateAvatar, addItemToInventory };