'use server';

import { db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";
import { CollectionReference } from "firebase-admin/firestore";
import { doc } from "firebase/firestore";

export async function signUp(params: SignUpParams){
    const {uid,name ,email} = params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return {
                success:false,
                message: 'User already exists.',
            }
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
        });
    } catch (error:any) {
        console.error("Error signing up:", error);
        if(error.code === 'auth/email-already-exists'){
            return {
                success:false,
                message: 'This email is already in use.',
            }            
        }

        return {
            success:false,
            message: 'An error occurred while signing up.',
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 7 * 1000, 
    });

    cookieStore.set("session", sessionCookie, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: 'User does not exist.',
            }
        }
        await setSessionCookie(idToken);
        return {
            success:true,
            message: 'User signed in successfully.',
        }
    } catch (error:any) {
        console.error("Error signing in:", error);
        return {
            success:false,
            message: 'An error occurred while signing in.',
        }
    }
}


export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return null;
        }

        try {
            const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

            const userRecord = await db.collection('users')
            .doc(decodedClaims.uid).get();
            if (!userRecord.exists) {   
                return null;
            }
            
            return {
                ... userRecord.data(),
                id: userRecord.id,
            } as User;
            
        } catch (error) {
            console.error("Error verifying session cookie:", error);
            return null;
            
        }


    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user;
}