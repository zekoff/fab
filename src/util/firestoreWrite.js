import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Avatar, Family } from "./firestoreClasses";

/**
 * Sync a Firestore family document with the content of a family object.
 * When invoked, this method will merge the provided Family object to the
 * Firestore family document at the object's associated Firestore ID.
 * @param {*} family the family object to sync
 */
function updateFamily(family) {
  const familyDoc = doc(getFirestore(), "families", family.firestoreId)
    .withConverter(Family.converter);
  setDoc(familyDoc, family, { merge: true });
  console.log("Sent family data update");
}

/**
 * Sync a Firestore avatar document with the content of a avatar object.
 * When invoked, this method will merge the provided avatar object to the
 * Firestore avatar document at the object's associated Firestore ID.
 * @param {*} family the family object to sync
 */
 function updateAvatar(avatar) {
  const avatarRef = doc(getFirestore(), "avatars", avatar.firestoreId)
    .withConverter(Avatar.converter);
  setDoc(avatarRef, avatar, { merge: true });
  console.log("Sent avatar data update");
}

export { updateAvatar, updateFamily };
