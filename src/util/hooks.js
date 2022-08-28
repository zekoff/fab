import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 * Custom hook to track state of the currently signed-in user.
 * @returns the currently signed-in user
 */
function useUser() {
  const authUserObject = getAuth().currentUser;
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    getAuth().onAuthStateChanged((currentUser) => setUser(currentUser));
  }, [authUserObject]);
  return user;
}

/**
 * Custom hook to get family doc for current user. Each time this hook is
 * called, a new subscription to the family doc state will be created.
 * @returns family doc/object tied to Firebase family state associated with
 * signed-in user
 */
function useFamily(account) {
  const [family, setFamily] = useState({});
  useEffect(() => {
    if (!account?.familyId) return;
    console.log("Signing up for family snapshots");
    return onSnapshot(doc(getFirestore(), "families", account?.familyId), (doc) => {
      setFamily(doc.data());
    });
  }, [account]);
  return family;
}

function useAvatarList(account) {
  // TBD
  return [];
}

export { useUser, useFamily, useAvatarList };