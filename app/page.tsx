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
        {/* MLH Trust Badge */}
        <a
          className="mlh-badge"
          href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
            alt="Major League Hacking 2026 Hackathon Season"
            width={100}
            height={175}
            style={{ width: '100%', height: 'auto' }}
          />
        </a>

        <div className="container">
          {/* Header */}
          <header className="header">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image
                src="/cloudlogo-transparant.png"
                alt="ConHacks"
                width={320}
                height={160}
                className="float"
                style={{ imageRendering: 'pixelated', marginTop: '5px' }}
                priority
              />
              <Image
                src="/conhacks2026-banner.png"
                alt="ConHacks 2026"
                width={320}
                height={80}
                style={{ imageRendering: 'pixelated' }}
                priority
              />
            </div>
            <p className="header-subtitle" style={{ marginTop: '20px' }}>
              March 27-29, 2026 • Conestoga College, Waterloo Campus
            </p>
          </header>

          {/* Login Card */}
          <div className="card">
            <p style={{ textAlign: 'center', marginBottom: '28px', color: 'var(--text-secondary)', fontSize: '15px' }}>
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
      {/* MLH Trust Badge */}
      <a
        className="mlh-badge"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
          alt="Major League Hacking 2026 Hackathon Season"
          width={100}
          height={175}
          style={{ width: '100%', height: 'auto' }}
        />
      </a>

      <div className="container">
        {/* Header */}
        <header className="header">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image
              src="/cloudlogo-transparant.png"
              alt="ConHacks"
              width={320}
              height={160}
              className="float"
              style={{ imageRendering: 'pixelated', marginTop: '5px' }}
              priority
            />
            <Image
              src="/conhacks2026-banner.png"
              alt="ConHacks 2026"
              width={320}
              height={80}
              style={{ imageRendering: 'pixelated' }}
              priority
            />
          </div>
        </header>

        {/* Application Form */}
        <div className="card">
          <ApplicationForm userEmail={user.email || ''} />
        </div>

        {/* User Footer */}
        <div className="user-footer">
          <span>Signed in as {user.firstName || user.email?.split('@')[0]}</span>
          <span className="user-footer-dot">•</span>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
            style={{ display: 'inline' }}
          >
            <button type="submit" className="user-footer-link">
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
