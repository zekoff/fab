import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getStorage, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import FirebaseImage from "./FirebaseImage";

function FirebaseImageBrowser({ storagePrefix, imageCallback, ...props }) {
  const [imageList, setImageList] = useState();
  useEffect(() => {
    (async () => {
      const listResult = await listAll(ref(getStorage(), storagePrefix));
      setImageList(listResult.items);
    })();
  }, [storagePrefix]);
  return <Box>
    <Grid container spacing={2}>
      {imageList?.map(image => {
        return <Grid key={image} xs={2} md={1}
          onClick={() => imageCallback(image.fullPath)}>
          <FirebaseImage size={36} image={image} />
        </Grid>
      })}
    </Grid>
  </Box>;
}

export default FirebaseImageBrowser;