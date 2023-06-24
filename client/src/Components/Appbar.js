import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { supabase } from "../Supabase";

const handleLogOutClick = () => {
    supabase.auth.signOut();
  };

export default function WelcomeBanner() {
  return (
    <header>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{
            flexGrow: 1,
            fontFamily: "Helvetica"}}>
            GoLocal
          </Typography>
          <Typography variant="h5" component="h1" sx={{
            flexGrow: 1,
            fontFamily: "Helvetica"}}>
            Welcome Back!
          </Typography>
          <Button
            variant="text"
            sx={{ color: "white",
            fontFamily: "Helvetica"}}
            onClick={handleLogOutClick}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
}