import { Container, Box } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { supabase, customTheme } from "../Supabase";
import React from 'react';
import "./LoginScreen.css";

export default function LoginScreen() {
  return (
    <div className="loginbg">
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
            fontFamily: "Helvetica",
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
          providers={[]}
          appearance={{
            theme: customTheme,
            style: {
              button: { background: "purple", color: "white" , fontFamily: "Helvetica"},
              anchor: { color: "blue", fontSize: "14px", fontFamily: "Helvetica"},
              label: { color: "black", fontFamily: "Helvetica" },
              input: { color: "black", fontFamily: "Helvetica" }
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
    </div>
  );
}
