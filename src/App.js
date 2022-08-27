import { Route, Routes } from "react-router-dom";
import FamilyCard from "./components/FamilyCard";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="family" element={<FamilyCard />} />
      </Route>
    </Routes>
  );
}

export default App;
