import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./components/AccountContext";
import AvailableQuests from "./components/AvailableQuests";
import AvatarDetails from "./components/AvatarDetails";
import AvatarInventory from "./components/AvatarInventory";
import FamilyAchievements from "./components/FamilyAchievements";
import FamilyCard from "./components/FamilyCard";
import Layout from "./components/Layout";
import { useAvatar, useAvatarList, useFamily, useGenericItemList, useInventory } from "./util/hooks";

function App() {
  const account = useContext(AccountContext);
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
      <Route path="/" element={<Layout family={family} avatar={avatarId} setAvatarId={setAvatarId} avatarList={avatarList} />}>
        <Route index element={
          <>
            <FamilyAchievements account={account} />
            <FamilyCard account={account} />
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
            <AvailableQuests account={account} />
          </>
        } />
      </Route>
    </Routes>
  );
}

export default App;
