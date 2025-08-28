import { SITE } from "@/lib/siteConfig";

export default function Footer() {
  const footerStyle: React.CSSProperties = {
    backgroundColor: "var(--header-bg)",
    color: "var(--header-text)",
    padding: "15px",
    textAlign: "center",
    borderTop: "1px solid var(--border)",
    position: "relative",
    bottom: 0,
    width: "100%",
  };

  return (
    <footer style={footerStyle}>
      <p style={{ margin: 0 }}>
        © {SITE.studentName} | Student Number: {SITE.studentNumber} | Date: {SITE.dateString}
      </p>
    </footer>
  );
}