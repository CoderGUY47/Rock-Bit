"use client";

import { useState, useEffect } from "react";

// Subscribers list to keep session state in sync across different components
const subscribers = new Set<() => void>();

const notify = () => {
  subscribers.forEach((callback) => callback());
};

const getSessionData = () => {
  if (typeof window === "undefined") return null;
  const loggedIn = localStorage.getItem("auth_logged_in") === "true";
  if (!loggedIn) return null;
  return {
    user: {
      id: "1",
      name: "Rock-Bit User",
      email: "user@gmail.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
    },
    session: {
      id: "session-1",
      userId: "1",
      expiresAt: new Date(Date.now() + 86400000).toISOString()
    }
  };
};

export const authClient = {
  signIn: async (params: any) => {
    // Better-Auth format: signIn.email({ email, password })
    const email = params?.email;
    const password = params?.password;
    if (email === "user@gmail.com" && password === "123456") {
      localStorage.setItem("auth_logged_in", "true");
      notify();
      return { data: getSessionData(), error: null };
    }
    return { data: null, error: { message: "Invalid email or password" } };
  },
  signUp: async (params: any) => {
    localStorage.setItem("auth_logged_in", "true");
    notify();
    return { data: getSessionData(), error: null };
  },
  signOut: async () => {
    localStorage.removeItem("auth_logged_in");
    notify();
    return { data: null, error: null };
  }
};

// Bind methods for direct destructuring imports
const signInEmail = async ({ email, password }: any) => {
  return authClient.signIn({ email, password });
};

const signUpEmail = async ({ email, password, name }: any) => {
  return authClient.signUp({ email, password, name });
};

// Add nested .email property to match better-auth's signIn.email / signUp.email syntax
(authClient.signIn as any).email = signInEmail;
(authClient.signUp as any).email = signUpEmail;

interface AuthFunction {
  (params: any): Promise<any>;
  email: (params: any) => Promise<any>;
}

export const signIn = authClient.signIn as AuthFunction;
export const signOut = authClient.signOut;
export const signUp = authClient.signUp as AuthFunction;

export const useSession = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(getSessionData());
    
    const handleUpdate = () => {
      setSession(getSessionData());
    };
    
    subscribers.add(handleUpdate);
    window.addEventListener("storage", handleUpdate);
    
    return () => {
      subscribers.delete(handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    data: session,
    isPending: false,
    error: null,
    refetch: () => setSession(getSessionData())
  };
};
