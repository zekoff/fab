import { Container, Typography } from "@mui/material";
import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

function App() {
  const itemQuery = query(collection(useFirestore(), 'items'));
  const { data: items } = useFirestoreCollectionData(itemQuery, { idField: 'id' });
  return (
    <Container>
      <Typography variant="h3">Family Achievement Board</Typography>
      <ul>
        {
          items?.map(item=><li key={item.id}>{item.name}</li>)
        }
      </ul>
    </Container>
  );
}

export default App;
