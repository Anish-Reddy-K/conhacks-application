import { withAuth, signOut, getSignUpUrl } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { ApplicationForm } from './components/ApplicationForm';

export default async function HomePage() {
  const { user } = await withAuth();
  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <main>
        <div className="container">
          {/* Header */}
          <header className="header">
            <Image
              src="/cloudlogo-transparant.png"
              alt="ConHacks"
              width={140}
              height={140}
              className="float mx-auto"
              style={{ imageRendering: 'pixelated' }}
              priority
            />
            <Image
              src="/conhacks2026-banner.png"
              alt="ConHacks 2026"
              width={280}
              height={70}
              className="mx-auto mb-4"
              style={{ imageRendering: 'pixelated' }}
              priority
            />
            <p className="header-subtitle">March 27-29, 2026 • Conestoga College</p>
          </header>

          {/* Login Card */}
          <div className="card">
            <p style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)' }}>
              Sign in to register for the hackathon
            </p>
            
            <div className="landing-buttons">
              <a href="/login" className="btn btn-primary">
                Sign In
              </a>
              <Link href={signUpUrl} className="btn btn-secondary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        {/* Header */}
        <header className="header">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/cloudlogo-transparant.png"
              alt="ConHacks"
              width={80}
              height={80}
              className="float"
              style={{ imageRendering: 'pixelated' }}
              priority
            />
          </div>
          <h1 className="header-title">ConHacks 2026</h1>
          <p className="header-subtitle">
            Welcome back, {user.firstName || user.email?.split('@')[0]}
          </p>
        </header>

        {/* Application Form */}
        <div className="card">
          <ApplicationForm userEmail={user.email || ''} />
        </div>

        {/* Footer */}
        <footer className="footer">
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit" className="btn btn-danger">
              Sign Out
            </button>
          </form>
        </footer>
      </div>
    </main>
  );
}
