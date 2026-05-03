export default function Header() {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "14px 28px 14px 31px", // 31px p/ compensar o acento lateral
        zIndex: 1000,
        background: "#1a1a1a",
        borderBottom: "1px solid #2a2a2a",
        borderLeft: "3px solid #7F77DD",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 38, height: 38,
            background: "rgba(127,119,221,0.15)",
            border: "1px solid rgba(127,119,221,0.3)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#7F77DD" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="3" fill="#7F77DD" />
            <line x1="9" y1="2" x2="9" y2="5" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="13" x2="9" y2="16" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="9" x2="5" y2="9" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="9" x2="16" y2="9" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div>
          <p style={{
            margin: 0,
            fontFamily: "'Syne', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#f0f0f0",
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}>
            FocusHUB
          </p>
          <p style={{
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            color: "#f0f0f0",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}>
            Seu sistema de controle pessoal
          </p>
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid #2a2a2a",
        borderRadius: 20,
        padding: "7px 16px",
      }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <rect x="1" y="2" width="11" height="10" rx="2" stroke="#7F77DD" strokeWidth="1.2" />
          <line x1="1" y1="5" x2="12" y2="5" stroke="#7F77DD" strokeWidth="1.2" />
          <line x1="4" y1="1" x2="4" y2="3" stroke="#7F77DD" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="9" y1="1" x2="9" y2="3" stroke="#7F77DD" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "#f0f0f0",
        }}>
          {today}
        </span>
      </div>
    </header>
  );
}