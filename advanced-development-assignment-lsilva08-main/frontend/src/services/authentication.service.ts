import { SigninResponse } from "../contracts/authentication";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import api from "./api";

const app = initializeApp({
    apiKey: "AIzaSyDM9tsZRoDkCv4XIFv9297rjc2pkIWp1oE",
    authDomain: "ad-assignment-2021-334714.firebaseapp.com",
    projectId: "ad-assignment-2021-334714",
    storageBucket: "ad-assignment-2021-334714.appspot.com",
    messagingSenderId: "275246596715",
    appId: "1:275246596715:web:e46f613d4e61b1bbc2a72e",
    measurementId: "G-R9PMWG2BPY"
});
const auth = getAuth(app);

export const signin = async (email: string, password: string): Promise<SigninResponse> => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = await (await api.get(`/users/${credentials.user.uid}`)).data
    const response = {
        token: credentials.user.email!!,
        user: {
            ...user,
            email
        }
    }
    localStorage.setItem('@userData', JSON.stringify({ ...response.user }))
    return response
}

export const signup = async (name: string, email: string, password: string): Promise<SigninResponse> => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log(credentials)
    await api.post('/users', { id: credentials.user.uid, name, profile: 'user' })
    return signin(email, password);
}