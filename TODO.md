# TODO

- Add Avatar name, image, coins, level, and XP to appbar or otherwise pinned to top
- Component to receive rewards and open treasure boxes (add to Avatar screen)
- Shop component
- Add fanfare/juice for level-ups and opening treasure boxes. Show coins going into a piggy bank.
- Allow direct addition of a family achievement
- Improve achievement recording and display
- Component to show available images from Storage
- Component to show available Items, populated with images
- Component to allow user to set their avatar image
- Restrict avatar data access to correct family

## Backlog

- Implement item tag options as enum-like
- Add back in ability to add item(s) as Quest Rewards
- Refactor CreateQuest and CreateReward for better integration with item browser and reward creation in general. When selecting item for quest creation, consider using Dialog
- Add toggle to account menu to show screens as if a non-admin is logged in
- Disable create quest and certain quest buttons if not family admin
- If user is not logged in, redirect UI to sign-in page
- Build account creation screens
- Implement one-time sign-up codes for family admins to extend invitations
- Component to send Treasure to another Avatar (coins/items only)
- Allow family admins to delete avatars
- Data validation for inputs (created quests, etc.)
- Include Family-specific Item definitions in addition to FAB-wide definitions
- Update security rules to allow write if familyAdmin or Account linked to Avatar
- Send messages to other family members
- Show loading indicator or null instead of brief broken image link
- Extact custom AppBar / Dialog from Layout into custom component, refactor Layout and AppBar state
- Create email/password login form
- Add configurable themes (fantasy, sci-fi, western...) with different images and text (Quests vs Bounties, Coins vs Credits, Treasure Chest vs Reward Cache etc.)
- Disable buttons that cause server actions after they are used, until they disappear
- Add a display-only screen for family status and recent achievements (kiosk mode)
- Add filtering/searching for inventory list

## Potential item tags

- duplicates_allowed
- stackable
- is_title (can be applied as a title)
- consumable
- tradeable (can be sent to another as Treasure)
- transient (when purchased, does not go into inventory)
- family_defined (created by family admin, and applicable only to that family, contained in family item list vs. defined in top-level Firestore collection)
