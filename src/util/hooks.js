import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Account, Avatar, Family, Item } from "./firestoreClasses";

/**
 * Create a FAB dataobject using a Firestore conversion, then add its Firestore ID.
 * @param {*} doc the Firestore doc object, returned by snapshot update or other 
 * @returns a dataobject with Firestore data including doc ID
 */
function getDataobjectWithId(doc) {
  const dataobject = doc.data();
  dataobject.firestoreId = doc.id;
  return dataobject;
}

/**
 * Custom hook to track state of the currently signed-in user.
 * @returns tri-state value: null (user not signed in), undefined (sign-in
 * unknown, which is typical in first update after refresh), or object for
 * the currently signed-in user
 */
function useUser() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    getAuth().onAuthStateChanged(currentUser => setUser(currentUser));
  }, []);
  return user;
}

/**
 * Custom hook to get a FAB Account object linked to the currently signed-in
 * user.
 * @returns the FAB account object for the current user, or null if no user
 */
function useAccount() {
  const user = useUser();
  const [account, setAccount] = useState(null);
  useEffect(() => {
    if (!user) {
      setAccount(null);
      return;
    };
    console.log("Signing up for account snapshots");
    return onSnapshot(
      doc(getFirestore(), "accounts", user.uid).withConverter(Account.converter),
      doc => setAccount(getDataobjectWithId(doc)),
      doc => console.log(doc)
    );
  }, [user]);
  return account;
}

/**
 * Custom hook to get family doc for current user. Each time this hook is
 * called, a new subscription to the family doc state will be created.
 * @param {*} firestoreId Firestore ID for family doc
 * @returns Family object tied to Firebase family state associated with
 * signed-in user (or null if the provided ID is null); will update/sync
 * as underlying family data updates
 */
function useFamily(firestoreId) {
  const [family, setFamily] = useState(null);
  useEffect(() => {
    if (!firestoreId) {
      setFamily(null);
      return
    };
    console.log("Signing up for family snapshots");
    return onSnapshot(
      doc(getFirestore(), "families", firestoreId).withConverter(Family.converter),
      doc => setFamily(getDataobjectWithId(doc)),
      doc => console.error(doc)
    );
  }, [firestoreId]);
  return family;
}

/**
 * Custom hook to get state of an Avatar based on avatar ID.
 * @param {*} firestoreId Firestore ID for avatar doc
 * @returns an Avatar object synced to Firestore state, or null if provided ID
 * is null
 */
function useAvatar(firestoreId) {
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (!firestoreId) {
      setAvatar(null);
      return;
    };
    console.log(`Signing up for avatar updates: ${firestoreId}`);
    return onSnapshot(
      doc(getFirestore(), "avatars", firestoreId)
        .withConverter(Avatar.converter),
      doc => setAvatar(getDataobjectWithId(doc)),
      doc => console.error(doc)
    );
  }, [firestoreId]);
  return [avatar, setAvatar];
}

/**
 * Get a list of synced avatar data.
 * @param {*} firestoreIdList a list with one avatar Firestore ID as each item in the list
 * @returns a list containing one avatar object for each key in the parameter list. The resulting
 * avatar objects are backed by and synced to the Firestore data.
 */
function useAvatarList(firestoreIdList) {
  const [avatarList, setAvatarList] = useState(null);
  useEffect(() => {
    if (!firestoreIdList) {
      setAvatarList(null);
      return;
    }
    console.log("Signing up for updates on all avatars");
    const collectionRef = collection(getFirestore(), "avatars").withConverter(Avatar.converter);
    const queryRef = query(collectionRef, where("__name__", "in", firestoreIdList));
    return onSnapshot(
      queryRef,
      queryResult => {
        const results = [];
        queryResult.forEach(result => results.push(getDataobjectWithId(result)));
        setAvatarList(results);
      },
      queryResult => console.error(queryResult)
    );
  }, [firestoreIdList]);
  return avatarList;
}

/**
 * Query and return the list of items defined in the FAB Firestore. This hook
 * performs a one-time query and returns the list. It does not maintain sync
 * with the firestore.
 * @returns the list of Items
 */
function useGenericItemDefinitions() {
  const [itemList, setItemList] = useState(null);
  useEffect(() => {
    (async () => {
      const query = collection(getFirestore(), "itemDefinitions").withConverter(Item.converter);
      console.log("Retrieving item list from Firestore");
      const queryResult = await getDocs(query);
      setItemList(queryResult);
    })();
  }, []);
  return itemList;
}

export { useUser, useAccount, useFamily, useAvatar, useAvatarList, useGenericItemDefinitions };
