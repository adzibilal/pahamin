'use client';

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

export default function SignInButton() {
  return (
    <ClerkSignInButton mode="modal">
      <button className="bg-primary text-text-primary px-6 py-2 rounded-full font-semibold hover:shadow-medium transition-all">
        Masuk
      </button>
    </ClerkSignInButton>
  );
} 