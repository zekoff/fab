import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./components/AccountContext";
import AvatarDetails from "./components/AvatarDetails";
import FamilyCard from "./components/FamilyCard";
import Layout from "./components/Layout";
import { useAvatar, useFamily, useInventory } from "./util/hooks";

function App() {
  const account = useContext(AccountContext);
  const family = useFamily(account);
  const [avatarId, setAvatarId] = useState(account?.avatarId);
  const avatar = useAvatar(family?.id, avatarId);
  const inventory = useInventory(family?.id, avatarId);
  useEffect(() => {
    if (account?.avatarId && !avatarId) setAvatarId(account.avatarId); else return;
  }, [account, avatarId]);
  return (
    <Routes>
      <Route path="/" element={<Layout family={family} avatar={avatarId} setAvatar={setAvatarId} />}>
        <Route path="avatar" element={<AvatarDetails avatar={avatar} inventory={inventory} />} />
        <Route path="family" element={<FamilyCard account={account} />} />
      </Route>
    </Routes>
  );
}

export default App;
