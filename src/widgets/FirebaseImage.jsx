import { Box } from "@mui/material";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const DEFAULT_SIZE = 24;

function FirebaseImage({ image, size, ...props }) {
  const [src, setSrc] = useState(null);
  if (!size) size = DEFAULT_SIZE;
  useEffect(() => {
    (async () => {
      if (image === null) {
        return;
      }
      console.log(`Getting URL for an image`);
      const url = await getDownloadURL(ref(getStorage(), image));
      setSrc(url);
    })()
  }, [image]);
  return <Box
    component="img"
    src={src}
    width={size}
    height={size}
    sx={props.sx}
    {...props}
  />
}

export default FirebaseImage;