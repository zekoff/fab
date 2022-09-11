import { Box } from "@mui/material";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

function FirestoreImage({ image, ...props }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    (async () => {
      console.log(`Fetching image URL for ${image}`);
      const url = await getDownloadURL(ref(getStorage(), image));
      setSrc(url);
    })()
  }, [image]);
  return <Box
    component="img"
    src={src}
    sx={props.sx}
  />
}

export default FirestoreImage;