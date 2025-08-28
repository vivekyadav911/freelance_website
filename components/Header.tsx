'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/siteConfig';
import ThemeToggle from './ThemeToggle';
import NavCookieTracker from './NavCookieTracker';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // close menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <NavCookieTracker />
      <header
        style={{
          backgroundColor: 'var(--header-bg)',
          color: 'var(--header-text)',
          borderBottom: '1px solid var(--border)',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          {/* Left Section: Hamburger + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Hamburger Button (ALWAYS visible on left) */}
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                fontSize: '24px',
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>

            {/* Site Title */}
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
              {SITE.title}
            </h1>

            {/* Student Number */}
            <span>{SITE.studentNumber}</span>
          </div>

          {/* Right Section: Dark Mode & Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ThemeToggle />

            {/* Desktop Nav */}
            <nav className="desktop-nav" style={{ display: 'none' }}>
              <ul style={{ display: 'flex', gap: '15px', margin: 0, padding: 0, listStyle: 'none' }}>
                {SITE.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        textDecoration: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        backgroundColor: pathname === item.href ? 'var(--accent)' : 'transparent',
                        color: pathname === item.href ? '#fff' : 'inherit',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile Dropdown when hamburger clicked */}
        {isMenuOpen && (
          <nav
            style={{
              backgroundColor: 'var(--header-bg)',
              borderTop: '1px solid var(--border)',
              padding: '10px 20px',
            }}
          >
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      backgroundColor: pathname === item.href ? 'var(--accent)' : 'transparent',
                      color: pathname === item.href ? '#fff' : 'inherit',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* CSS media query for hiding/showing navs */}
        <style jsx global>{`
          @media (min-width: 768px) {
            .desktop-nav {
              display: block !important;
            }
          }
        `}</style>
      </header>
    </>
  );
}