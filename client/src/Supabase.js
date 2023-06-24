import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://napykagxvarwgjsfeytm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcHlrYWd4dmFyd2dqc2ZleXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUyMzc5ODIsImV4cCI6MjAwMDgxMzk4Mn0.xH8k7mEfddHdadJqodDutI-zzywl10RaT680LBloBBw"
);

export const customTheme = {
  default: {
    colors: {
      brand: "hsl(153 60.0% 53.0%)",
      brandAccent: "black",
      brandButtonText: "white",
      defaultButtonBackground: "white",
      defaultButtonBackgroundHover: "#eaeaea",
      defaultButtonBorder: "black",
      defaultButtonText: "gray",
      dividerBackground: "black",
      inputBackground: "white",
      inputBorder: "gray",
      inputBorderHover: "gray",
      inputText: "black",
      inputLabelText: "gray",
      inputPlaceholder: "darkgray",
      messageText: "gray",
      messageTextDanger: "red"
    },
    space: {
      spaceSmall: "4px",
      spaceMedium: "8px",
      spaceLarge: "16px",
      labelBottomMargin: "8px",
      anchorBottomMargin: "4px",
      emailInputSpacing: "4px",
      socialAuthSpacing: "4px",
      buttonPadding: "10px 15px",
      inputPadding: "10px 15px"
    },
    // sizes: {},
    borderWidths: {
      buttonBorderWidth: "1px",
      inputBorderWidth: "1px"
    },
    // borderStyles: {},
    radii: {
      borderRadiusButton: "10px",
      inputBorderRadius: "10px"
    }
  }
};
