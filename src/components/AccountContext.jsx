import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import useUser from "../util/auth";

/** React Context to access the signed-in FAB account. */
const AccountContext = createContext();

/**
 * React Context.Provider component to access the current account
 * via Firebase/Auth. Value will be the currently signed-in account.
 */
function AccountProvider({ children }) {
  const user = useUser();
  const [account, setAccount] = useState({});
  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = onSnapshot(doc(getFirestore(), "accounts", user.uid), (doc) => {
      setAccount(doc.data());
    });
    return unsubscribe;
  }, [user, account]);
  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider };
