import ProfileScreen from "./Components/ProfileScreen";
import LoginScreen from "./Components/LoginScreen";
import { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import "./App.css";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  /*still in construction
  const value = {
    signIn: () => 
      supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      }),
    signOut: () => supabase.auth.signOut(),
    session,
  }
  */

  return (
    <div className="bg">{session ? <ProfileScreen /> : <LoginScreen />}</div>
  );
}
