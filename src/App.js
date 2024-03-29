import { CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";
import AvailableQuests from "./components/AvailableQuests";
import AvatarDetails from "./widgets/AvatarDetails";
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
import { useAccount, useAvatar, useAvatarList, useFamily, useGenericItemDefinitions, useUser } from "./util/hooks";
import UserButton from "./widgets/UserButton";

function App() {
  const user = useUser();
  const account = useAccount();
  const family = useFamily(account?.familyFirestoreId);
  const [avatar, setAvatar] = useAvatar(account?.avatarFirestoreId);
  const avatarList = useAvatarList(family?.avatarFirestoreIds)
  const itemDefinitions = useGenericItemDefinitions();

  if (user === null) {
    // User is definitively not signed in; show sign-in button
    return <Container sx={{ p: 2 }}>
      <Stack alignItems="center">
        <Typography variant="h1">Sign In to FAB</Typography>
        <UserButton />
      </Stack>
    </Container>
  }

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
          <Typography variant="h3">Admin Area</Typography>
          <Divider />
          <CreateQuest family={family} />
          <Typography variant="h4">Add Item to Family Shop</Typography>
          <CreateItem itemCallback={(item) => {
            family.shopInventory.push(item);
            updateFamily(family);
          }} />
        </Container>
      } />
    </Routes>

  </>);
}

export default App;
