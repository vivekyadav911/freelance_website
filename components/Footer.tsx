import { SITE } from '@/lib/siteConfig';

export default function Footer() {
  const footerStyle: React.CSSProperties = {
    backgroundColor: 'var(--header-bg)',
    color: 'var(--header-text)',
    padding: '20px',
    textAlign: 'center' as const,
    borderTop: '1px solid var(--border)',
    marginTop: 'auto',
  };

  return (
    <footer style={footerStyle}>
      <p style={{ margin: 0 }}>
        © {SITE.copyrightName} | Student Number: {SITE.studentNumber} | Date: {SITE.dateString}
      </p>
    </footer>
  );
}