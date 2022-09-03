import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Account } from "../util/dataclasses";
import { useUser } from "../util/hooks";

/** React Context to access the signed-in FAB account. */
const AccountContext = createContext();

/**
 * React Context.Provider component to access the current account
 * via Firebase/Auth. Value will be the currently signed-in account.
 */
function AccountProvider({ children }) {
  const accountDefault = null;
  const user = useUser();
  const [account, setAccount] = useState(accountDefault);
  useEffect(() => {
    if (!user) {
      setAccount(accountDefault);
      return;
    };
    console.log("Signing up for account snapshots");
    return onSnapshot(
      doc(getFirestore(), "accounts", user.uid).withConverter(Account.converter),
      (doc) => {
        const accountObject = doc.data();
        accountObject.id = doc.id;
        setAccount(accountObject);
      },
      doc => console.log(doc)
    );
  }, [user]);
  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider };
