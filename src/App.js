import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import FamilyCard from "./components/FamilyCard";
import Layout from "./components/Layout";
import { AccountContext } from "./components/AccountContext";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

function App() {
  const account = useContext(AccountContext);
  const [familyInfo, setFamilyInfo] = useState({});
  useEffect(() => {
    if (!account?.familyId) return;
    return onSnapshot(doc(getFirestore(), "families", account.familyId), (doc) => {
      setFamilyInfo(doc.data());
    });
  }, [account.familyId, familyInfo]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="family" element={<FamilyCard familyInfo={familyInfo} />} />
      </Route>
    </Routes>
  );
}

export default App;
