import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AvailableQuests from "./components/AvailableQuests";
import AvatarDetails from "./components/AvatarDetails";
import AvatarInventory from "./components/AvatarInventory";
import CreateQuest from "./components/CreateQuest";
import CurrentQuests from "./components/CurrentQuests";
import FamilyAchievements from "./components/FamilyAchievements";
import FamilySummary from "./components/FamilySummary";
import Layout from "./components/Layout";
import { useAccount, useAvatar, useAvatarList, useFamily, useGenericItemList, useInventory } from "./util/hooks";

function App() {
  const account = useAccount();
  const family = useFamily(account);
  const [avatarId, setAvatarId] = useState(account?.avatarId);
  const avatar = useAvatar(family?.id, avatarId);
  const avatarList = useAvatarList(account);
  const inventory = useInventory(family?.id, avatarId);
  const itemList = useGenericItemList();
  useEffect(() => {
    // Set avatar to user's primary avatar after first logging in
    if (account?.avatarId && !avatarId) setAvatarId(account.avatarId); else return;
  }, [account, avatarId]);
  return (
    <Routes>
      <Route path="/" element={
        <Layout account={account} setAvatarId={setAvatarId} avatarList={avatarList} />
      }>
        <Route index element={
          <>
            <FamilyAchievements family={family} />
            <FamilySummary family={family} avatarList={avatarList} />
          </>
        } />
        <Route path="avatar" element={
          <>
            <AvatarDetails avatar={avatar} />
            <AvatarInventory inventory={inventory} itemList={itemList} />
          </>
        } />
        <Route path="quests" element={
          <>
            <CurrentQuests familyId={family?.id} avatarId={avatarId} sx={{ marginBottom: 2 }} />
            <AvailableQuests familyId={family?.id} avatarId={avatarId} sx={{ marginBottom: 2 }} />
            <CreateQuest familyId={family?.id} />
          </>
        } />
      </Route>
    </Routes>
  );
}

export default App;
