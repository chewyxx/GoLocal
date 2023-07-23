import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AppMock from "./AppMock";

// Mock the auth.onAuthStateChange method to simulate the user being logged in.
jest.mock("../Supabase", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (callback) => {
        const session = {
          user: {
            email: "test@example.com",
            password: "password123", 
          },
        };
        callback("SIGNED_IN", session);
        return {
          data: { subscription: { unsubscribe: jest.fn() } },
        };
      },
    },
  },
}));

test("renders ProfileScreen after successful login", async () => {
  render(<AppMock />);

  // Check if the ProfileScreen is displayed
  const submitButton = screen.queryByText('Welcome Back!')
  expect(submitButton).not.toBeNull() 
});

/*
import { render, fireEvent, screen} from '@testing-library/react';
import React from 'react';
import LoginScreen from '../Components/LoginScreen';

test('successful login with valid email and password', async () => {
    // Render the LoginScreen component
    render(<LoginScreen />);

    // Fill in the email and password fields with valid credentials
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByText('Sign in');
    fireEvent.click(loginButton);

    screen.debug();
    const submitButton = screen.queryByText('Signing in ...')
    expect(submitButton).not.toBeNull() 
});
*/


/*
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

jest.mock('../Supabase'); // Assuming you have mocked the Supabase module

test('successful login with valid email and password', async () => {
  // Mock the onAuthStateChange function to simulate a successful login session
  const mockOnAuthStateChange = jest.fn((callback) => {
    const session = { user: { email: 'test@example.com' } };
    callback('SIGNED_IN', session);
    return { data: { subscription: { unsubscribe: jest.fn() } } };
  });

  jest.spyOn(require('@supabase/supabase-js').supabase.auth, 'onAuthStateChange').mockImplementation(mockOnAuthStateChange);

  // Render the App component
  const { getByLabelText, getByText } = render(<App />);

  // Fill in the email and password fields with valid credentials
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Click the login button
  const loginButton = getByText('Sign in');
  fireEvent.click(loginButton);

  // Wait for the login to complete
  await waitFor(() => expect(mockOnAuthStateChange).toHaveBeenCalledTimes(1));

  // Ensure that the user is redirected or that the appropriate success behavior occurs after login
  // For example, you can check if a specific component or text is displayed after successful login.
  const welcomeMessage = getByText('Welcome to your profile');
  expect(welcomeMessage).toBeInTheDocument();
});
*/