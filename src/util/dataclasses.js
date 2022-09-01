/**
 * Dataclass for FAB Account info.
 */
class Account {
  avatarId;     // string
  familyAdmin;  // boolean
  familyId;     // string
}

/**
 * Dataclass for FAB Avatar info.
 */
class Avatar {
  name;             // string
  level;            // number
  xp;               // number
  coins;            // number
  inventory;        // Firebase collection of Item objects
  unclaimedRewards; // list of Reward objects
  activeQuests;     // list of Quest objects
  image;
}

/**
 * Dataclass for FAB Family info.
 */
class Family {
  name;               // string
  availableQuests;    // list of Quest objects
  recentAchivements;  // list of strings
}

/**
 * Datclass for items.
 */
class Item {
  name;         // string
  description;  // string
  value;        // number
  tags;         // list of strings
  image;
}

/**
 * Dataclass for quests.
 */
class Quest {
  name;         // string
  description;  // string
  reward;       // Reward object
}

/** Dataclass for rewards. */
class Reward {
  xp;     // number
  coins;  // number
  items;  // list of Item objects
}

export { Account, Avatar, Family, Item, Quest, Reward };