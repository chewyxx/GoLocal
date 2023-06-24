import ProfileScreen from "./Components/ProfileScreen";
import LoginScreen from "./Components/LoginScreen";
import { useState, useEffect } from "react";
import { supabase } from "./Supabase";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return (
    <div>
      {session ? <ProfileScreen /> : <LoginScreen />}
    </div>
  );
}
