import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import useUser from "../util/auth";

/**
 * Component that displays a Sign In or Sign Out button depending on user
 * authentication status.
 */
function UserButton(props) {
  const user = useUser();
  return user ? <SignOutButton /> : <SignInButton />
}

async function googleSignIn(auth) {
  try {
    const result = await signInWithRedirect(auth, new GoogleAuthProvider());
    return result.user;
  } catch (error) {
    console.log(error);
  }
}

function SignInButton() {
  const auth = getAuth();
  return (
    <Button onClick={() => googleSignIn(auth)}>Sign In</Button>
  )
}

function SignOutButton() {
  const auth = getAuth();
  return (
    <Button onClick={() => signOut(auth)}>Sign Out</Button>
  )
}

export default UserButton;