"use client";

import { SignIn, useUser } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  const currentUser = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
      <div className="max-w-md space-y-8">
        <SignIn />

        {!currentUser && (
          <Link
            href="/"
            className="stack-scope inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 relative mt-6 w-full"
          >
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
}
