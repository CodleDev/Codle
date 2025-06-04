/* 
  Bharat Jassal — 06/03/2025
  This file handles the streaks for the users and updates them in the Firebase database.
  It runs when the user has beat the puzzle for the day.
  Streaks are only updated if the user completes the game.

  Used https://firebase.google.com/docs/firestore/query-data/get-data for logic.
*/

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config.js";

const getToday = () => {
  return new Date().toDateString();
};

const getYesterday = () => {
  return new Date(Date.now() - 86400000).toDateString();
};

// Calls after user wins the puzzle.
export const updateStreak = async () => {
  const user = auth.currentUser; // Get the current user from Firebase Auth
  if (!user) {
    console.error("Please log in to keep your streaks.");
    return;
  }

  const userRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
  const docSnap = await getDoc(userRef);
  const today = getToday();
  const yesterday = getYesterday();

  // First time user, streak starts at 1 (already beat the POTD)
  if (!docSnap.exists()) {
    await setDoc(userRef, {currentStreak: 1, lastPlayed: today,
    });
    return;
  }

  const data = docSnap.data(); 

  // Already played today.
  if (data.lastPlayed === today) return;

  // If played yesterday, continue streak; otherwise, reset to 1.
    let newStreak;
    if (data.lastPlayed === yesterday) {
        newStreak = data.currentStreak + 1;
    } else {
        newStreak = 1;
    }

  await setDoc(userRef, { // Save the updated streak and last played date
    currentStreak: newStreak,
    lastPlayed: today,
  });
};
// Calls when the user has not played the game for a day or more.
export const resetStreakIfMissed = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Please log in to keep your streaks.");
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return;

  const data = docSnap.data();
  const today = getToday();
  const yesterday = getYesterday();

  // If last played is not today or yesterday, reset streak.
  if (data.lastPlayed !== today && data.lastPlayed !== yesterday) {
    await setDoc(userRef, {
      currentStreak: 0,
      lastPlayed: data.lastPlayed,
    });
  }
};
