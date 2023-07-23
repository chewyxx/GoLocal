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

  useEffect(() => {
    const passwordReset = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          const newPassword = prompt(
            "What would you like your new password to be?"
          );
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword
          });

          if (data) alert("Password updated successfully!");
          if (error) alert("There was an error updating your password.");
        }
      }
    );
    return () => passwordReset.data.subscription.unsubscribe();
  }, []);

  const { data, error } = async () =>
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });

  return (
    <div>
      {session ? <ProfileScreen /> : <LoginScreen />}
    </div>
  );
}
