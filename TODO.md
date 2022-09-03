# TODO

- Build admin functions to create/update FAB objects in Firebase
- Move some Layout elements to AppBar
- Component to browse and accept quests
- Component to send Reward to another Avatar (coins/items only)
- Component to create Quest
- Component to complete Quest

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

## Potential item tags

- duplicates_allowed
- stackable
- is_title (can be applied as a title)
- consumable
- tradeable
- transient (when purchased, does not go into inventory)
- family_defined (created by family admin, and applicable only to that family, contained in family item list vs. defined in top-level Firestore collection)
