import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function AuthStatus() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log("Logged in user:");
          console.log(user);

          console.log("UID:", user.uid);
          console.log("Email:", user.email);
        } else {
          console.log("No user logged in");
        }
      }
    );

    return unsubscribe;
  }, []);

  return null;
}

export default AuthStatus;