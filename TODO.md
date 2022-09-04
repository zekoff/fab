# TODO

- Component to send Treasure to another Avatar (coins/items only)
- Component to create Reward
- Component to send Reward (includes component to create Reward)
- Component to receive rewards and open treasure boxes (add to Avatar screen)
- Shop component
- Add fanfare/juice for level-ups and opening treasure boxes
- Add summary of completed quest to recent family achievements
- Add avatar name and image to AppBar
- Allow direct addition of a family achievement
- Add toast or similar feedback when quest is created, completed, abandoned, etc.

## Backlog

- Implement item tag options as enum-like
- Add toggle to account menu to show screens as if a non-admin is logged in
- Disable create quest and certain quest buttons if not family admin
- If user is not logged in, redirect UI to sign-in page
- Build account creation screens
- Implement one-time sign-up codes for family admins to extend invitations
- Allow family admins to delete avatars
- Data validation for inputs (created quests, etc.)
- Include Family-specific Item definitions in addition to FAB-wide definitions
- Update security rules to allow write if familyAdmin or Account linked to Avatar
- Send messages to other family members
- Show loading indicator or null instead of brief broken image link
- Extact custom AppBar / Dialog from Layout into custom component
- Create email/password login form
- Add configurable themes (fantasy, sci-fi, western...) with different images and text (Quests vs Bounties, Coins vs Credits, Treasure Chest vs Reward Cache etc.)
- Disable buttons that cause server actions after they are used, until they disappear

## Potential item tags

- duplicates_allowed
- stackable
- is_title (can be applied as a title)
- consumable
- tradeable (can be sent to another as Treasure)
- transient (when purchased, does not go into inventory)
- family_defined (created by family admin, and applicable only to that family, contained in family item list vs. defined in top-level Firestore collection)
