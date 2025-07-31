import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import SignInButton from "@/components/SignInButton";
import SignUpButton from "@/components/SignUpButton";
import UserButton from "@/components/UserButton";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border no-print">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-text-inverse text-xl font-bold">🧠</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Pahamin</h1>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/explain" 
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Penjelasan
              </Link>
              <Link 
                href="/quiz" 
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Soal
              </Link>
              <Link 
                href="/flashcard" 
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                Flashcard
              </Link>
              {userId && (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-text-secondary hover:text-primary transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/progress" 
                    className="text-text-secondary hover:text-primary transition-colors font-medium"
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