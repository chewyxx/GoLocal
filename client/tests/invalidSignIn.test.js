import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AppMock from "./AppMock";

// Mock the auth.onAuthStateChange method to simulate the user being logged in with invalid credentials.
jest.mock("../Supabase", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (callback) => {
       
        // Simulate invalid credentials by providing null session.
        callback("SIGNED_IN", null);
        return {
          data: { subscription: { unsubscribe: jest.fn() } },
        };
      },
    },
  },
}));

test("renders LoginScreen when login credentials are invalid", async () => {
  render(<AppMock />);

  // Check if the ProfileScreen is displayed
  const submitButton = screen.queryByText('Welcome Back!')
  expect(submitButton).toBeNull() 
});
