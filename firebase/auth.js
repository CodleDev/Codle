/*
https://firebase.google.com/docs/auth/web/password-auth#web
Used for user authentication in Codle.
Provides functions to register, login, and logout users.
*/

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, validatePassword } from "firebase/auth";
import { auth } from "./config";

// Register a new user with email and password
export async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
    console.log("Registered", userCredential.user.email);
    return userCredential.user;  
    } catch (error) {
    console.error("Registration error", error.message);
    throw error;
    }
  }


export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed in", userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error("Sign in error", error.message);
        throw error;
    }
}

export async function checkPassword(password) {
    try {
        const status = await validatePassword(getAuth(), password);
        if (status.isValid) {
        console.log("Password is valid.");
        } else {
        console.log("Password must include a capital, special character and be minimum 6 characters.", status);
        }
    } catch (error) {
        console.error("Error validating password.", error.message);
    }
}

export async function logout() {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Sign out error:", error.message);
    throw error;
  }
}
