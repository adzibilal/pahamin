'use client';

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import SignInButton from "@/components/SignInButton";
import SignUpButton from "@/components/SignUpButton";
import UserButton from "@/components/UserButton";
import Image from "next/image";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image src="/logo-pahamin.png" alt="Pahamin" width={100} height={100} className="w-auto h-10 -mt-2" />
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/explain"
                className="text-gray-500 hover:text-secondary transition-colors font-medium"
              >
                Penjelasan
              </Link>
              <Link
                href="/quiz"
                className="text-gray-500 hover:text-secondary transition-colors font-medium"
              >
                Soal
              </Link>
              <Link
                href="/flashcard"
                className="text-gray-500 hover:text-secondary transition-colors font-medium"
              >
                Flashcard
              </Link>
              {userId && (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-500 hover:text-secondary transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/progress"
                    className="text-gray-500 hover:text-secondary transition-colors font-medium"
                  >
                    Progress
                  </Link>
                </>
              )}
            </nav>

            {/* Auth Buttons */}
            {userId ? (
              <UserButton />
            ) : (
              <div className="flex items-center space-x-3">
                <SignInButton />
                <SignUpButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 