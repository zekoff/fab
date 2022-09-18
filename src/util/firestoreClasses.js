import { v4 as generateUuid } from "uuid";

/**
 * Creates a Firestore converter object that can be used by a FAB dataclass. Given a dataclass
 * definition as a parameter, return a converter object that can be passed to a Firestore
 * collection/doc reference as the parameter to withConverter. Assumes that the Firestore
 * data object will have the same fields as the dataclass definition. When converting from
 * Firestore doc to dataclass, will add the document's ID in the class's "firestoreId" field.
 * @param {class} targetClass the dataclass to use for conversion
 * @returns a Firestore converter object for serializing data objects
 */
function makeConverter(targetClass) {
  return {
    toFirestore: (dataobject) => {
      const objectToSend = structuredClone(dataobject);
      delete objectToSend.firestoreId; // no impact on items without ID attributes
      return objectToSend;
    },
    fromFirestore: (doc, options) => {
      const data = doc.data(options);
      const dataobject = new targetClass();
      Object.keys(data).forEach(key => dataobject[key] = data[key]);
      return dataobject;
    }
  }
}

/**
 * Dataclass for FAB Firestore Account info.
 */
class Account {
  firestoreId; // ID string set by Firestore; same as user's Firebase Auth UID
  avatarFirestoreId; // string
  familyAdmin; // boolean
  familyFirestoreId; // string

  static converter = makeConverter(Account);
}

/**
 * Dataclass for FAB Firestore Family info.
 */
class Family {
  firestoreId;
  name = "Anon";
  theme = "fantasy";
  avatarFirestoreIds = []; // list of 1..n strings
  availableQuests = []; // list of 0..n Quest objects
  recentAchievements = []; // list of 0..n Achievement objects
  shopInventory = []; // list of 0..n Item objects
  image = null; // location of image in Firebase Storage

  static converter = {
    toFirestore: function (familyObject) {
      const objectToSend = structuredClone(familyObject);
      delete objectToSend.firestoreId;
      return objectToSend;
    },
    fromFirestore: function (doc, options) {
      return Family.createFromFirestoreDoc(doc);
    }
  }

  /**
   * Create a fully-populated Family object from the document returned by a
   * Firestore document.
   * @param {*} doc the document object from Firestore
   * @returns a new Family object from the doc
   */
  static createFromFirestoreDoc(doc) {
    const family = new Family();
    const data = doc.data();
    ["name", "theme", "avatarFirestoreIds", "image"].forEach(
      field => family[field] = data[field]);
    data.availableQuests?.forEach(quest =>
      family.availableQuests.push(Quest.createFromData(quest)));
    data.recentAchievements?.forEach(achievement =>
      family.recentAchievements.push(Achievement.createFromData(achievement)));
    data.shopInventory?.forEach(item =>
      family.shopInventory.push(Item.createFromData(item)));
    return family;
  }
}

/**
 * Datclass for FAB Firestore Item definitions. Item copies reference these
 * definitions by Firestore ID.
 */
class ItemDefinition {
  firestoreId;
  name = "Mysterious Trinket";
  description = "An object of awe and wonder.";
  value = 100;
  tags = []; // list of 0..n item tags
  theme = null; // null if generic (usable by any theme)
  image = null; // location of the image in Firebase Storage
  familyFirestoreId; // null if generic (not custom family item)

  static converter = makeConverter(ItemDefinition);

  /**
   * Create an Item from this definition. The created Item is suitable for
   * storing in an inventory or including in a Reward.
   * @returns a copy of the Item described by this ItemDefinition
   */
  makeItem() {
    const item = Item();
    ["name", "description", "value", "tags", "image"].forEach(
      field => item[field] = this[field]);
    return item;
  }
}

/**
 * Dataclass for Items as stored in inventory, or created from ItemDefinitions.
 */
class Item {
  uuid = generateUuid();
  name = "Mysterious Item";
  description = "An item of awe and wonder.";
  value = 100;
  tags = []; // list of 0..n item tags
  image = null; // location of the image in Firebase Storage

  static createFromData(data) {
    const item = new Item();
    ["uuid", "name", "description", "value", "tags", "image"].forEach(
      field => item[field] = data[field]);
    return item;
  }
}

/**
 * Dataclass for FAB Firestore Avatar info.
 */
class Avatar {
  firestoreId;
  accountFirestoreId;
  familyFirestoreId;
  name = "Anonymous";
  level = 1;
  xp = 0;
  coins = 0;
  inventory = []; // list of 0..n Item objects
  unclaimedRewards = []; // list of 0..n Reward objects
  currentQuests = []; // list of 0..n Quest objects
  image = null; // location of the image in Firebase Storage

  static converter = {
    toFirestore: function (avatar) {
      const objectToSend = structuredClone(avatar);
      delete objectToSend.firestoreId; // no impact on items without ID attributes
      return objectToSend;
    },
    fromFirestore: function (doc, options) {
      return Avatar.createFromFirestoreDoc(doc);
    }
  }

  static createFromFirestoreDoc(doc) {
    const avatar = new Avatar();
    const data = doc.data();
    ["accountFirestoreId", "familyFirestoreId", "name", "level", "xp", "coins", "image"].forEach(
      field => avatar[field] = data[field]);
    data.inventory?.forEach(item => avatar.inventory.push(Item.createFromData(item)));
    data.unclaimedRewards?.forEach(reward => avatar.unclaimedRewards.push(
      Reward.createFromData(reward)));
    data.currentQuests?.forEach(quest => avatar.currentQuests.push(Quest.createFromData(quest)));
    return avatar;
  }
}

/**
 * Dataclass for Quests.
 */
class Quest {
  uuid = generateUuid();
  name = "Important Task";
  description = "An undertaking of particular importance.";
  reward = null; // Reward object

  static createFromData(data) {
    const quest = new Quest();
    ["uuid", "name", "description"].forEach(field => quest[field] = data[field]);
    if (data.reward) quest.reward = Reward.createFromData(data.reward);
    return quest;
  }
}

/**
 * Dataclass for FAB Firestore Rewards.
 */
class Reward {
  uuid = generateUuid();
  xp = 20;
  coins = 100;
  items = []; // list of 0..n items

  static createFromData(data) {
    const reward = new Reward();
    ["uuid", "xp", "coins"].forEach(field => reward[field] = data[field]);
    data.items?.forEach(item => reward.items.push(Item.createFromData(item)));
    return reward
  }

  static fromObject({ xp = 20, coins = 100, items = [] }) {
    const reward = new Reward();
    reward.xp = xp;
    reward.coins = coins;
    reward.items = items;
    return reward;
  }

  toString() {
    const infoList = [];
    if (this.xp) infoList.push(`${this.xp} XP`);
    if (this.coins) infoList.push(`${this.coins} coins`);
    if (this.items.length > 0)
      infoList.push(`${this.items.length} item${this.items.length === 1 ? '' : 's'}`)
    return infoList.join(", ");
  }
}

/**
 * Dataclass for a FAB Firestore Achievement to display.
 */
class Achievement {
  uuid = generateUuid();
  timestamp = 0; // seconds since epoch
  avatarName = null; // the person who accomplished this
  description = "Something the family can be proud of!";
  type = null; // string enum -- quest, custom

  toString() {
    return this.description;
  }

  static createFromData(data) {
    const achievement = new Achievement();
    ["uuid", "timestamp", "avatarName", "description", "type"].forEach(
      field => achievement[field] = data[field]);
    return achievement;
  }
}

export { Account, Family, ItemDefinition, Item, Avatar, Quest, Reward, Achievement };
