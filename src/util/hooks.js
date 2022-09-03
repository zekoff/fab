import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Avatar, Family, Item } from "./dataclasses";

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
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    getAuth().onAuthStateChanged(currentUser => setUser(currentUser));
  }, []);
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
  const familyDefault = null;
  const [family, setFamily] = useState(familyDefault);
  useEffect(() => {
    if (!account?.familyId) {
      setFamily(familyDefault);
      return
    };
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
 * Custom hook to get state of an Avatar based on family/avatar IDs.
 * @param {*} familyId the Firestore ID for avatar's family
 * @param {*} avatarId the Firestore ID for avatar doc
 * @returns an Avatar object synced to Firestore state
 */
function useAvatar(familyId, avatarId) {
  const avatarDefault = null;
  const [avatar, setAvatar] = useState(avatarDefault);
  useEffect(() => {
    if (!familyId || !avatarId) {
      setAvatar(avatarDefault);
      return;
    };
    console.log(`Signing up for avatar updates: ${avatarId}`);
    return onSnapshot(
      doc(getFirestore(), "families", familyId, "avatars", avatarId)
        .withConverter(Avatar.converter),
      doc => setAvatar(getDataobjectWithId(doc)),
      doc => console.error(doc)
    );
  }, [familyId, avatarId]);
  return avatar;
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
    if (!account?.familyId) {
      setAvatarList([]);
      return;
    };
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

/**
 * Custom hook to get a FAB Avatar's Inventory. Each time this hook is called,
 * a new subscription to the avatar's inventory will be created. The returned
 * list will be a list of Firestore IDs for documents in the item collection.
 * @param {*} familyId Firestore ID for family
 * @param {*} avatarId Firestore ID for avatar
 * @returns the avatar's inventory as a list
 */
function useInventory(familyId, avatarId) {
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    if (!familyId || !avatarId) {
      setInventory([]);
      return
    };
    const query = collection(getFirestore(), "families", familyId, "avatars", avatarId, "inventory");
    console.log(`Signing up for inventory updates on avatar ${avatarId}`);
    return onSnapshot(
      query,
      queryResult => setInventory(queryResult.docs.map(doc => doc.data().itemId)),
      queryResult => console.error(queryResult)
    );
  }, [familyId, avatarId]);
  return inventory;
}

/**
 * Query and return the list of items defined in the FAB Firestore. This hook
 * performs a one-time query and returns the list. It does not maintain sync
 * with the firestore.
 * @returns the list of Items
 */
function useGenericItemList() {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    (async () => {
      const query = collection(getFirestore(), "items").withConverter(Item.converter);
      console.log("Retrieving item list from Firestore");
      const queryResult = await getDocs(query);
      const itemListData = queryResult.docs.map(doc => getDataobjectWithId(doc));
      setItemList(itemListData);
    })();
  }, []);
  return itemList;
}

function useImageFromStorage(imagePath) {
  const user = useUser();
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    if (!user) return;
    if (!imagePath) return;
    const imageRef = ref(getStorage(), imagePath);
    (async () => {
      console.log(`downloading image ${imagePath}`);
      const downloadUrl = await getDownloadURL(imageRef);
      setImageSrc(downloadUrl);
    })();
  }, [imagePath, user]);
  return imageSrc;
}

export {
  useUser, useFamily, useAvatar, useAvatarList, useInventory, useGenericItemList,
  useImageFromStorage
};
