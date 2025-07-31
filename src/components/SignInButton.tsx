'use client';

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

export default function SignInButton() {
  return (
    <ClerkSignInButton mode="modal">
      <button className="bg-gradient-to-r from-primary to-primary-hover text-text-primary px-6 py-2 rounded-xl font-semibold hover:shadow-medium transition-all">
        Masuk
      </button>
    </ClerkSignInButton>
  );
} 