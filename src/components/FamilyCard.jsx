import { Card, CardContent, Typography } from "@mui/material";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

/**
 * Shows information about Family of signed-in user.
 */
function FamilyCard(props) {
  const user = useContext(UserContext);
  const [familyId, setFamilyId] = useState(null);
  const [familyInfo, setFamilyInfo] = useState({});
  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = onSnapshot(doc(getFirestore(), "accounts", user.uid), (doc) => {
      setFamilyId(doc.data().family_id);
    });
    return unsubscribe;
  }, [user]);
  useEffect(() => {
    if (!familyId) return;
    const unsubscribe = onSnapshot(doc(getFirestore(), "families", familyId), (doc) => {
      setFamilyInfo(doc.data());
    });
    return unsubscribe;
  }, [familyId]);
  return (
    <Card>
      <CardContent>
        <Typography>Family Name: {familyInfo?.name}</Typography>
      </CardContent>
    </Card>
  )
}

export default FamilyCard;