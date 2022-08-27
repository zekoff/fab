import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

/**
 * Custom hook to track state of the currently signed-in user.
 * @returns the currently signed-in user
 */
function useUser() {
  const authUserObject = getAuth().currentUser;
  const [user, setUser] = useState(authUserObject);
  useEffect(() => {
    getAuth().onAuthStateChanged(() => setUser(getAuth().currentUser));
  }, [authUserObject]);
  return user;
}

export default useUser;