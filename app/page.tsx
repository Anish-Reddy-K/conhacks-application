import { withAuth, signOut, getSignUpUrl } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

export default async function HomePage() {
  // Retrieves the user from the session or returns null if no user is signed in
  const { user } = await withAuth();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          ConHacks 2026
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Sign in to register for the hackathon
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Sign In
          </a>
          <Link
            href={signUpUrl}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-black">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
        Welcome, {user.firstName || user.email}!
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        You&apos;re logged in to ConHacks
      </p>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors mt-4"
        >
          Sign Out
        </button>
      </form>
    </main>
  );
}
