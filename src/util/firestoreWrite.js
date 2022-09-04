import {
  getFirestore, doc, setDoc, deleteDoc, addDoc, collection,
  updateDoc, arrayUnion
} from "firebase/firestore";
import { Avatar, Quest } from "./dataclasses";

function updateAvatar(familyId, avatar) {
  const ref = doc(getFirestore(), "families", familyId, "avatars", avatar.id)
    .withConverter(Avatar.converter);
  setDoc(ref, avatar);
}

function addQuest(familyId, quest) {
  // Create quest in family's "availableQuests" collection
  const availableQuests = collection(getFirestore(), "families", familyId,
    "availableQuests").withConverter(Quest.converter);
  const docRef = addDoc(availableQuests, quest);
  console.log(`Added quest with ID ${docRef.id} to family available quests`);
}

function acceptQuest(familyId, avatarId, quest) {
  // Remove quest document from family's "availableQuests" collection
  const availableQuest = doc(getFirestore(), "families", familyId,
    "availableQuests", quest.id);
  deleteDoc(availableQuest);
  console.log(`Deleted quest ID ${quest.id} from family available quests`);
  // Add quest document to avatar's "currentQuests" collection
  const currentQuests = collection(getFirestore(), "families", familyId, "avatars",
    avatarId, "currentQuests").withConverter(Quest.converter);
  const docRef = addDoc(currentQuests, quest);
  console.log(`Added quest ID ${docRef.id} to avatar quests`);
}

function completeQuest(familyId, avatarId, quest) {
  // Remove quest document from avatar's "currentQuests" collection
  const currentQuest = doc(getFirestore(), "families", familyId, "avatars",
    avatarId, "currentQuests", quest.id);
  deleteDoc(currentQuest);
  console.log(`Deleted quest ID ${quest.id} from avatar quest list`);
  // Add reward to avatar's "unclaimedRewards" array
  const avatarDoc = doc(getFirestore(), "families", familyId, "avatars", avatarId);
  updateDoc(avatarDoc, {
    unclaimedRewards: arrayUnion(quest.reward)
  });
  console.log(`Added reward ${quest.reward} to avatar's unclaimed rewards`);
  // Add summary of completed quest to family's recent achievements
}

function abandonQuest(familyId, avatarId, quest) {
  // Delete quest from avatar's "currentQuests" collection
  const currentQuest = doc(getFirestore(), "families", familyId, "avatars",
    avatarId, "currentQuests", quest.id);
  deleteDoc(currentQuest);
  console.log("Quest deleted from avatar currentQuest collection");
  // Add quest to family's "availableQuests" collection
  const availableQuests = collection(getFirestore(), "families", familyId,
    "availableQuests").withConverter(Quest.converter);
  addDoc(availableQuests, quest);
  console.log("Quest re-added to family available quests");
}

function deleteQuest(familyId, quest) {
  // Delete quest from family's "availableQuests" collection
  const questToDelete = doc(getFirestore(), "families", familyId,
    "availableQuests", quest.id);
  deleteDoc(questToDelete);
  console.log("Deleted quest");
}

function addItemToInventory(familyId, avatar, item) {
  // firestore add function
}

export {
  addQuest, acceptQuest, updateAvatar, completeQuest, abandonQuest, deleteQuest,
  addItemToInventory
};