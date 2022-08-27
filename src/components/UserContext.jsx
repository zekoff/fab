import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

/**
 * React Context.Provider component to access the user currently authenticated
 * via Firebase/Auth. Value will be the currently signed-in user object.
 */
function UserProvider({ children }) {
  const [user, setUser] = useState(getAuth().currentUser);
  useEffect(() => {
    getAuth().onAuthStateChanged(() => setUser(getAuth().currentUser));
  });
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };