'use client';

import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";

export default function SignUpButton() {
  return (
    <ClerkSignUpButton mode="modal">
      <button className="border-2 border-secondary text-secondary px-6 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all">
        Daftar
      </button>
    </ClerkSignUpButton>
  );
} 