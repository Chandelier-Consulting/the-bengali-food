"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import DashboardClient from "./DashboardClient";
import { auth } from "@/lib/firebase-client";
import { dashboardImageOptions, dashboardImageSlots, defaultImageSelections, defaultMenuItems } from "@/lib/dashboard-content";
import { defaultCateringMenuHeading } from "@/lib/section-content";

export default function DashboardAccess() {
  const authAvailable = Boolean(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authReady, setAuthReady] = useState(!authAvailable);
  const [authError, setAuthError] = useState(authAvailable ? "" : "Firebase Auth is not ready yet.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!auth) {
      setAuthError("Firebase Auth is not ready yet.");
      return;
    }

    setIsSubmitting(true);
    setAuthError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not sign in.";
      setAuthError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    if (!auth) return;
    await signOut(auth);
  }

  if (!authReady) {
    return (
      <main className="min-h-screen bg-[#0f0e0d] px-5 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_24px_80px_rgba(0,0,0,.24)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-accent">Dashboard access</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.03em]">Checking sign-in state...</h1>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0f0e0d] px-5 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_24px_80px_rgba(0,0,0,.24)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-accent">Dashboard access</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.03em]">Sign in to dashboard</h1>
          <p className="mt-4 text-sm font-semibold leading-6 text-white/68">
            Use any Firebase email and password account already configured for this project.
          </p>

          <form onSubmit={handleSignIn} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-black">
              Email address
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-12 rounded-2xl border border-white/10 bg-[#11100f] px-4 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-black">
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-h-12 rounded-2xl border border-white/10 bg-[#11100f] px-4 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                required
              />
            </label>

            {authError ? <p className="text-sm font-bold text-primary">{authError}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-black text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f0e0d] px-5 pb-12 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold text-white/72">
          Signed in as {user.email || "dashboard user"}
        </div>
      </div>
      <DashboardClient
        availableImages={dashboardImageOptions}
        initialCateringMenuHeading={defaultCateringMenuHeading}
        initialImageSelections={defaultImageSelections()}
        initialMenuItems={defaultMenuItems()}
        imageSlots={dashboardImageSlots}
        onSignOut={handleSignOut}
      />
    </main>
  );
}
