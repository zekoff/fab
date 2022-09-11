import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AvailableQuests from "./components/AvailableQuests";
import AvatarDetails from "./components/AvatarDetails";
import AvatarInventory from "./components/AvatarInventory";
import CreateQuest from "./components/CreateQuest";
import CurrentQuests from "./components/CurrentQuests";
import FamilyAchievements from "./components/FamilyAchievements";
import FamilySummary from "./components/FamilySummary";
import Layout from "./components/Layout";
import { useAccount, useAvatar, useFamily, useGenericItemDefinitions } from "./util/hooks";

function App() {
  const account = useAccount();
  console.log(account);
  const family = useFamily(account?.familyFirestoreId);
  console.log(family);
  const avatar = useAvatar(account?.avatarFirestoreId);
  console.log(avatar);
  const itemDefinitions = useGenericItemDefinitions();
  const setAvatar = () => {}; // NYI
  if (![account, family, avatar, itemDefinitions].every(Boolean)) return <CircularProgress />
  return (
    <Routes>
      <Route path="/" element={
        <Layout account={account} avatar={avatar} setAvatar={setAvatar} />
      }>
        <Route index element={
          <>
            <FamilyAchievements family={family} />
            <FamilySummary family={family} />
          </>
        } />
        <Route path="avatar" element={
          <>
            <AvatarDetails avatar={avatar} />
            <AvatarInventory avatar={avatar} />
          </>
        } />
        <Route path="quests" element={
          <>
            {/* <CurrentQuests avatar={avatar} sx={{ marginBottom: 2 }} />
            <AvailableQuests family={family} sx={{ marginBottom: 2 }} />
            <CreateQuest family={family} /> */}
          </>
        } />
      </Route>
    </Routes>
  );
}

export default App;
