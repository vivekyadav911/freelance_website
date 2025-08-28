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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navStyle: React.CSSProperties = {
    backgroundColor: 'var(--header-bg)',
    color: 'var(--header-text)',
    padding: '0 20px',
    borderBottom: '1px solid var(--border)',
    position: 'relative' as const,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const menuButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '8px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const desktopNavStyle: React.CSSProperties = {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'flex',
    } as any,
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'var(--header-bg)',
    borderBottom: '1px solid var(--border)',
    display: isMenuOpen ? 'block' : 'none',
    zIndex: 100,
  };

  const navListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '10px',
  };

  const mobileNavListStyle: React.CSSProperties = {
    ...navListStyle,
    flexDirection: 'column' as const,
    padding: '10px 20px',
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  });

  return (
    <>
      <NavCookieTracker />
      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        <div style={containerStyle}>
          <div style={logoStyle}>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{SITE.title}</h1>
            <span style={{ fontSize: '16px' }}>{SITE.studentNumber}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ThemeToggle />
            
            {/* Desktop Navigation */}
            <ul style={{ ...navListStyle, display: 'none' }} className="desktop-nav">
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={navItemStyle(pathname === item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              style={menuButtonStyle}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className="mobile-menu-button"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div style={mobileMenuStyle}>
          <ul style={mobileNavListStyle}>
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={navItemStyle(pathname === item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}