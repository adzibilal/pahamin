'use client';

import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";

export default function SignUpButton() {
  return (
    <ClerkSignUpButton mode="modal">
      <button className="border-2 border-primary text-primary px-6 py-2 rounded-xl font-semibold hover:bg-primary hover:text-text-primary transition-all">
        Daftar
      </button>
    </ClerkSignUpButton>
  );
} 