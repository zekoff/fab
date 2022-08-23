import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useAuth, useUser } from "reactfire";

/**
 * Component that displays a Sign In or Sign Out button depending on user
 * authentication status.
 * @param {*} props 
 * @returns A button suited to the user's auth need
 */
function UserButton(props) {
  const { status: userStatus, data: user } = useUser();
  const auth = useAuth();
  if (userStatus === 'loading') return "Loading..."
  return user ? <SignOutButton auth={auth} /> : <SignInButton auth={auth} />
}

async function googleSignIn(auth) {
  try {
    const result = await signInWithRedirect(auth, new GoogleAuthProvider());
    return result.user;
  } catch (error) {
    console.log(error);
  }
}

function SignInButton({ auth }) {
  return (
    <Button onClick={() => googleSignIn(auth)}>Sign In</Button>
  )
}

function SignOutButton({ auth }) {
  return (
    <Button onClick={() => signOut(auth)}>Sign Out</Button>
  )
}

export default UserButton;