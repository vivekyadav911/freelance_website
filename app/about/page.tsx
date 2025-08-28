import { SITE } from '@/lib/siteConfig';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>About</h1>
      <p><strong>Name:</strong> {SITE.studentName}</p>
      <p><strong>Student Number:</strong> {SITE.studentNumber}</p>
      
      <h2>How to Use This Website</h2>
      <div style={{ 
        margin: '20px 0',
        padding: '20px',
        backgroundColor: 'var(--panel)',
        border: '1px solid var(--border)',
        borderRadius: '8px'
      }}>
        <p>This website allows you to create HTML5 tabs with inline CSS and JavaScript.</p>
        <ol>
          <li>Navigate to the Tabs page</li>
          <li>Add tab headers using the &quot;+ Add&quot; button</li>
          <li>Enter content for each tab</li>
          <li>Click &quot;Generate HTML&quot; to get copyable code</li>
          <li>Paste the code into an HTML file to use it</li>
        </ol>
      </div>
      
      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Video tutorial would be embedded here
        </p>
      </div>
    </div>
  );
}