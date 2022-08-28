import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./components/AccountContext";
import FamilyCard from "./components/FamilyCard";
import Layout from "./components/Layout";
import { useFamily } from "./util/hooks";

function App() {
  const account = useContext(AccountContext);
  const family = useFamily(account);
  console.log(family);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="family" element={<FamilyCard family={family} />} />
      </Route>
    </Routes>
  );
}

export default App;
