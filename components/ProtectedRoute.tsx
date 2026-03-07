import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });

    return unsubscribe;
  }, []);

  //  DO NOT render anything until auth is known
  if (!authChecked) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const provider = user.providerData[0]?.providerId;

  if (provider === "password" && !user.emailVerified) {
    return <Navigate to="/verify" replace />;
  }

  return <>{children}</>;
}