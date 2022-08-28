import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 * Custom hook to track state of the currently signed-in user.
 * @returns tri-state value: null (user not signed in), undefined (sign-in
 * unknown, which is typical in first update after refresh), or object for
 * the currently signed-in user
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
 * @param {*} account FAV account object, from which familyId is retrieved
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

/**
 * Custom hook to get a list of Avatars associated with an Account's Family.
 * The returned data is a one-time get of avatar data, and does not stay
 * in sync with updates to Firestore.
 * @param {*} account FAB account object, from which familyId is retrieved
 * @returns a list of avatar objects which include the Firestore key and and
 * any data associated with the avatar document
 */
function useAvatarList(account) {
  const [avatarList, setAvatarList] = useState([]);
  useEffect(() => {
    if (!account?.familyId) return;
    async function queryAvatars() {
      const query = collection(getFirestore(),
        "families", account.familyId, "avatars");
      const avatarSnapshot = await getDocs(query);
      setAvatarList(avatarSnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } }));
    }
    queryAvatars();
    // No return value; nothing to unsubscribe
  }, [account]);
  return avatarList;
}

export { useUser, useFamily, useAvatarList };
