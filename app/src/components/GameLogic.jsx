/*
Bharat Jassal - 06/03/2025
This file fetches current date's question from the firebase database.
Displays the question and the bubble bank to the user.
Let's users select the bubbles and submit their answers.
Compares the user's answer with correct answers.
Shows the wrong bubbles in red and correct bubbles in green.
Calls the updateStreak function to update the user's streak.
Shows the correct answer if user's answer is incorrect.
Disables submission after the user has submitted their answer 3 times (easy) 2 times (medium) or 1 time (hard).
*/

import { getDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db } from './firebase/config.js';
import { updateStreak } from './firebase/streak.js';

const getToday = () => {
    return new Date().toISOString().slice(0, 10); // This returns date in format (YYYY-MM-DD).
}

export default function GameLogic() {
    const [question, setQuestion] = useState('');
    const [bubbleBank, setBubbleBank] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [correctOrder, setCorrectOrder] = useState([]);
    const [userAnswer, setUserAnswer] = useState([]);
    useEffect(() => {
    const loadPuzzle = async () => {
        const date = getToday();
        const docRef = doc(db, 'dailyChallenges', date); // Reference to the database "dailyChallenges" collection with the current date as the document ID.
        const docSnap = await getDoc(docRef); // Opens document and reads content. (difficulty, question,) etc.
        if (docSnap.exists()) {
            const data = docSnap.data();
            setBubbleBank(data.bubbleBank); // Grabs the bubble bank from the document.
            setQuestion(data.question); // Grabs the question from the document.
            setDifficulty(data.difficulty); // Grabs the difficulty from the document.
            setCorrectOrder(data.correctOrder); // Grabs the correct order from the document.
            setUserAnswer([]); // Resets the user's answer to an empty array.
        }
    };
    loadPuzzle();
}, []);
}
