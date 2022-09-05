/**
 * Creates a Firestore converter object that can be used by a FAB dataclass. Given a dataclass
 * definition as a parameter, return a converter object that can be passed to a Firestore
 * collection/doc reference as the parameter to withConverter.
 * @param {class} targetClass the dataclass to use for conversion
 * @returns a Firestore converter object for serializing data objects
 */
function makeConverter(targetClass) {
  return {
    toFirestore: (dataobject) => {
      const objectToSend = structuredClone(dataobject);
      delete objectToSend.id; // no impact on items without ID attributes
      return objectToSend;
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
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
  id; // ID string set by Firestore; same as user's Firebase Auth UID
  avatarId; // string
  familyAdmin; // boolean
  familyId; // string

  static converter = makeConverter(Account);
}

/**
 * Dataclass for FAB Firestore Avatar info.
 */
class Avatar {
  id; // ID string set by Firestore
  name = "Anonymous";
  level = 1;
  xp = 0;
  coins = 0;
  unclaimedRewards = []; // list of 0..n Reward objects
  activeQuests = []; // list of 0..n Quest objects
  image;
  // inventory items managed as a Firebase collection with Avatar as parent

  static converter = makeConverter(Avatar);
}

/**
 * Dataclass for FAB Firestore Family info.
 */
class Family {
  id; // ID string set by Firestore
  name = "Anon";
  availableQuests = []; // list of 0..n Quest objects
  recentAchievements = []; // list of 0..n Achievement objects

  static converter = makeConverter(Family);
}

/**
 * Datclass for FAB Firestore Items.
 */
class Item {
  id; // ID string set by Firestore
  name = "Mysterious Trinket";
  description = "An object of awe and wonder.";
  value = 100;
  tags = []; // list of 0..n item tags
  image;

  static converter = makeConverter(Item);
}

/**
 * Dataclass for FAB Firestore Quests.
 */
class Quest {
  id; // ID string set by Firestore
  name = "Important Task";
  description = "An undertaking of particular importance.";
  reward; // Reward object

  static converter = makeConverter(Quest);
}

/**
 * Dataclass for FAB Firestore Rewards.
 */
class Reward {
  id; // ID string set by Firestore (if pulled from data)
  xp = 20;
  coins = 100;
  items = []; // list of 0..n Item IDs

  static converter = makeConverter(Reward);

  static fromObject({ xp = 20, coins = 100, items = [] }) {
    const reward = new Reward();
    reward.xp = xp;
    reward.coins = coins;
    reward.items = items;
  }

  toString() {
    return `${this.xp} XP, ${this.coins} coins, and ${this.items.length} items`;
  }
}

/**
 * Dataclass for a FAB Firestore Achievement to display.
 */
class Achievement {
  id; // ID string set by Firestore
  timestamp = 0; // seconds since epoch
  avatar; // the person who accomplished this
  description = "Something the family can be proud of!";
  image;

  static converter = makeConverter(Achievement);

  toString() {
    return this.description;
  }
}

export { Account, Avatar, Family, Item, Quest, Reward, Achievement };
