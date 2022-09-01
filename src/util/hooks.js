import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Avatar, Family } from "./dataclasses";

/**
 * Create a FAB dataobject using a Firestore conversion, then add its Firestore ID.
 * @param {*} doc the Firestore doc object, returned by snapshot update or other 
 * @returns a dataobject with Firestore data including doc ID
 */
function getDataobjectWithId(doc) {
  const dataobject = doc.data();
  dataobject.id = doc.id;
  return dataobject;
}

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
 * @param {*} account FAB account object, from which familyId is retrieved
 * @returns family doc/object tied to Firebase family state associated with
 * signed-in user
 */
function useFamily(account) {
  const [family, setFamily] = useState({});
  useEffect(() => {
    if (!account?.familyId) return;
    console.log("Signing up for family snapshots");
    return onSnapshot(
      doc(getFirestore(), "families", account?.familyId).withConverter(Family.converter),
      doc => setFamily(getDataobjectWithId(doc)),
      doc => console.error(doc)
    );
  }, [account]);
  return family;
}

/**
 * Custom hook to get a list of Avatars associated with an Account's Family.
 * Each time this hook is called, a new subscription to the family's avatar
 * list will be created.
 * @param {*} account FAB account object, from which familyId is retrieved
 * @returns a list of avatar objects which include the Firestore key and and
 * any data associated with the avatar document
 */
function useAvatarList(account) {
  const [avatarList, setAvatarList] = useState([]);
  useEffect(() => {
    if (!account?.familyId) return;
    const query = collection(getFirestore(),
      "families", account.familyId, "avatars").withConverter(Avatar.converter);
    console.log("Signing up for avatar list updates");
    return onSnapshot(
      query,
      queryResult => setAvatarList(queryResult.docs.map(doc => getDataobjectWithId(doc))),
      queryResult => console.log(queryResult)
    );
  }, [account]);
  return avatarList;
}

export { useUser, useFamily, useAvatarList };
