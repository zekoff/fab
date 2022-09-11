import { CircularProgress, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AvailableQuests from "./components/AvailableQuests";
import AvatarDetails from "./components/AvatarDetails";
import AvatarInventory from "./components/AvatarInventory";
import CreateQuest from "./components/CreateQuest";
import CurrentQuests from "./components/CurrentQuests";
import FamilyAchievements from "./components/FamilyAchievements";
import FamilySummary from "./components/FamilySummary";
import Layout from "./components/Layout";
import { useAccount, useAvatar, useAvatarList, useFamily, useGenericItemDefinitions } from "./util/hooks";

function App() {
  const account = useAccount();
  const family = useFamily(account?.familyFirestoreId);
  const [avatar, setAvatar] = useAvatar(account?.avatarFirestoreId);
  const avatarList = useAvatarList(family?.avatarFirestoreIds)
  const itemDefinitions = useGenericItemDefinitions();
  if (![account, family, avatar, avatarList, itemDefinitions].every(Boolean)) return <CircularProgress />
  return (<>
    <Typography variant="h2">FAB</Typography>
    <Routes>
      <Route path="/" element={
        <Layout account={account} avatar={avatar} setAvatar={setAvatar} />
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
            <AvatarInventory avatar={avatar} />
          </>
        } />
        <Route path="quests" element={
          <>
            <CurrentQuests family={family} avatar={avatar} sx={{ marginBottom: 2 }} />
            <AvailableQuests family={family} avatar={avatar} sx={{ marginBottom: 2 }} />
            <CreateQuest family={family} />
          </>
        } />
      </Route>
      <Route path="/admin" element={
        <>
          <Typography variant="h2">Admin Area NYI</Typography>
        </>
      } />
    </Routes>
  </>);
}

export default App;
