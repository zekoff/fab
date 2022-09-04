# TODO

- Build admin functions to create/update FAB objects in Firebase
- Component to send Treasure to another Avatar (coins/items only)
- Component to create Quest
- Component to review and accept Quests
- Component to review and approve accepted/completed quests (when admin marks complete, recent achievement is generated and the associated reward goes to Avatar's unclaimed rewards)
- Component to create Reward
- Component to send Reward (includes component to create Reward)
- Component to receive rewards and open treasure boxes
- Shop component
- Add fanfare/juice for level-ups and opening treasure boxes

## Backlog

- Implement item tag options as enum-like
- If user is not logged in, redirect UI to sign-in page
- Build account creation screens
- Implement one-time sign-up codes for family admins to extend invitations
- Allow family admins to delete avatars
- Data validation for inputs (created quests, etc.)
- Include Family-specific Item definitions in addition to FAB-wide definitions
- Update security rules to allow write if familyAdmin or Account linked to Avatar
- Send messages to other family members
- Show loading indicator or null instead of brief broken image link

## Potential item tags

- duplicates_allowed
- stackable
- is_title (can be applied as a title)
- consumable
- tradeable (can be sent to another as Treasure)
- transient (when purchased, does not go into inventory)
- family_defined (created by family admin, and applicable only to that family, contained in family item list vs. defined in top-level Firestore collection)
