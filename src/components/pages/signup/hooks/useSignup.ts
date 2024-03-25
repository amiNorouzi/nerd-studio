import { useState } from "react";

import { useForm } from "react-hook-form";

import useErrorToast from "@/hooks/useErrorToast";

import { signupApi } from "@/services/authentication-services";

export interface FormTypes {
  fullName: string;
  email: string;
  password: string;
  acceptReceiveEmail: boolean;
  acceptPolicy: boolean;
}

/**
 * `useSignup` is a custom React hook for handling user signup.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 * It also uses a custom hook `useErrorToast` to display error messages.
 *
 * @returns {Object} An object containing the form methods, the signup handler function,
 * the function to set the email confirmation state, and the email confirmation state.
 */
export function useSignup() {
  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();

  // Use `useState` to manage the state of email confirmation.
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const form = useForm<FormTypes>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      acceptPolicy: false,
      acceptReceiveEmail: false,
    },
  });

  /**
   * `handleSignup` is an async function that handles the signup process.
   * It takes the form data as an argument, sends a request to the signup API,
   * and updates the email confirmation state based on the response.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleSignup = async (data: FormTypes) => {
    const { password, email, fullName } = data;
    try {
      // Send a request to the signup API with the form data.
      const { data } = await signupApi({
        password,
        email,
        username: fullName,
      });
      console.log(data);

      // If the request is successful, update the email confirmation state to true for showing the email confirmation message.
      setShowEmailConfirmation(true);
    } catch (e) {
      console.log(e);

      // If the request fails, show an error message.
      showFetchError(e);
    }
  };

  // Return the form methods, the signup handler function,
  // the function to set the email confirmation state, and the email confirmation state.
  return {
    form,
    handleSignup,
    setShowEmailConfirmation,
    showEmailConfirmation,
  };
}
