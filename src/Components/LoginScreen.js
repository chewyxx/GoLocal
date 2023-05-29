import { Container, Box } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { supabase, customTheme } from "../Supabase";
import "../App.css";

export default function LoginScreen() {
  return (
    <>
      <h1> Welcome to GoLocal! </h1>
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: "#f2f6fc",
          border: 1,
          display: "flex",
          height: "65vh",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: 4,
          mr: "30px",
          mt: "70px"
        }}
      >
        <Box
          sx={{
            color: "text.black",
            fontSize: 30,
            fontWeight: "bold",
            mx: "auto"
          }}
        >
          Welcome to GoLocal!
        </Box>

        <Auth
          supabaseClient={supabase}
          theme="default"
          providers={["google"]}
          appearance={{
            theme: customTheme,
            style: {
              button: { background: "purple", color: "white" },
              anchor: { color: "blue", fontSize: "12px" },
              label: { color: "black" }
            }
          }}
          localization={{
            variables: {
              sign_in: {
                password_label: "Password"
              }
            }
          }}
        />
      </Container>
    </>
  );
}
