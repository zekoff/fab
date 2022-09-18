import { CircularProgress, Container, Divider, Typography } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";
import AvailableQuests from "./components/AvailableQuests";
import AvatarDetails from "./components/AvatarDetails";
import AvatarInventory from "./components/AvatarInventory";
import CreateItem from "./components/CreateItem";
import CreateQuest from "./components/CreateQuest";
import CurrentQuests from "./components/CurrentQuests";
import FamilyAchievements from "./components/FamilyAchievements";
import FamilySummary from "./components/FamilySummary";
import { BottomNavBar, TopAppBar } from "./components/NavigationBars";
import PurchaseItems from "./components/PurchaseItems";
import UnclaimedRewards from "./components/UnclaimedRewards";
import { updateFamily } from "./util/firestoreWrite";
import { useAccount, useAvatar, useAvatarList, useFamily, useGenericItemDefinitions } from "./util/hooks";

function App() {
  const account = useAccount();
  const family = useFamily(account?.familyFirestoreId);
  const [avatar, setAvatar] = useAvatar(account?.avatarFirestoreId);
  const avatarList = useAvatarList(family?.avatarFirestoreIds)
  const itemDefinitions = useGenericItemDefinitions();

  /**
   * The custom data hooks will have null values until they are synced with Firestore data.
   * If any needed data is null, show a loading bar. Once all data is loaded, the bar will
   * disappear and all components can expect that their data is not null. (It may still be
   * empty or otherwise not populated, but it will reflect the value from the Firestore.)
   */
  const serverDataNeeded = [account, family, avatar, avatarList, itemDefinitions];
  if (!serverDataNeeded.every(Boolean)) {
    const dataLoaded = serverDataNeeded.reduce((previous, current) => {
      if (current !== null) return previous + 1; else return previous;
    }, 0);
    const progress = dataLoaded / serverDataNeeded.length * 100
    return <CircularProgress variant="determinate" value={progress} />;
  }

  return (<>
    <TopAppBar family={family} avatar={avatar} avatarList={avatarList} setAvatar={setAvatar} />
    <Routes>
      <Route path="/" element={<>
        <Container sx={{ paddingBottom: 8 }}>
          <Outlet />
        </Container>
        <BottomNavBar />
      </>}>
        <Route index element={
          <>
            <FamilyAchievements family={family} />
            <FamilySummary family={family} avatarList={avatarList} />
          </>
        } />
        <Route path="avatar" element={
          <>
            <AvatarDetails avatar={avatar} />
            <Divider sx={{ m: 1 }} />
            <UnclaimedRewards avatar={avatar} />
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
        <Route path="shop" element={
          <>
            <PurchaseItems avatar={avatar} family={family} />
          </>
        } />
      </Route>
      <Route path="/admin" element={
        <Container>
          <Typography variant="h2">Admin Area NYI</Typography>
          <CreateItem itemCallback={(item)=>{
            family.shopInventory.push(item);
            updateFamily(family);
          }} />
        </Container>
      } />
    </Routes>

  </>);
}

export default App;
