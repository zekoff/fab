# TODO

- Build admin functions to create FAB objects in Firebase
- Implement avatar inventory as subcollection of avatars
- Update security rules to allow write if familyAdmin or Account linked to Avatar
- Component to browse and accept quests
- Component to send Reward to another Avatar (coins/items only)
- Component to create Quest
- Component to complete Quest
- Component to display Avatar status and inventory

## Backlog

- Implement item tag options as enum-like
- If user is not logged in, redirect UI to sign-in page
- Build account creation screens
- Implement one-time sign-up codes for family admins to extend invitations
- Allow family admins to delete avatars
- Data validation for inputs (created quests, etc.)

## Potential item tags

 - duplicates_allowed
 - stackable
 - title (can be applied as a title)
 - consumable
 - transient (when purchased, does not go into inventory)
 