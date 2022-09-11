import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Avatar, Family } from "./firestoreClasses";

function updateFamily(family) {
  const familyDoc = doc(getFirestore(), "families", family.firestoreId)
    .withConverter(Family.converter);
  setDoc(familyDoc, family, { merge: true });
  console.log("Sent family data update");
}

function updateAvatar(avatar) {
  const avatarRef = doc(getFirestore(), "avatars", avatar.firestoreId)
    .withConverter(Avatar.converter);
  setDoc(avatarRef, avatar, { merge: true });
  console.log("Sent avatar data update");
}

export { updateAvatar, updateFamily };
