import { useState } from "react"

type Subject = { id: string; name: string; schedule: string }
type Activity = { id: string; title: string; subject: string; dueDate: string; urgency: "baixa" | "média" | "alta" }

const urgencyConfig = {
  baixa: { color: "#1D9E75", bg: "rgba(29,158,117,0.12)",  border: "rgba(29,158,117,0.3)"  },
  média: { color: "#EF9F27", bg: "rgba(239,159,39,0.12)",  border: "rgba(239,159,39,0.3)"  },
  alta:  { color: "#E74C3C", bg: "rgba(231,76,60,0.12)",   border: "rgba(231,76,60,0.3)"   },
}

const SUBJECT_ICONS = ["📘","📗","📙","📕","📓","🔬","🔭","🎨","🗺️","💻"]

function fmtDate(d: string) {
  if (!d) return ""
  const [y, m, dd] = d.split("-")
  return `${dd}/${m}/${y}`
}

const input: React.CSSProperties = {
  background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10,
  padding: "10px 14px", fontSize: 14, color: "#e0e0e0", outline: "none",
  fontFamily: "'DM Sans', sans-serif",
}

const btn: React.CSSProperties = {
  background: "rgba(127,119,221,0.15)", border: "1px solid rgba(127,119,221,0.4)",
  borderRadius: 10, color: "#a89fe8", fontFamily: "'Syne', sans-serif",
  fontSize: 14, fontWeight: 700, padding: "10px 20px", cursor: "pointer", whiteSpace: "nowrap",
}

export default function Estudos() {
  const [subjects, setSubjects]     = useState<Subject[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [subjectName, setSubjectName] = useState("")
  const [schedule, setSchedule]       = useState("")
  const [title, setTitle]             = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [dueDate, setDueDate]         = useState("")
  const [urgency, setUrgency]         = useState<Activity["urgency"]>("baixa")

  function addSubject() {
    if (!subjectName.trim() || !schedule) return
    setSubjects([...subjects, { id: crypto.randomUUID(), name: subjectName, schedule }])
    setSubjectName(""); setSchedule("")
  }

  function addActivity() {
    if (!title.trim() || !selectedSubject || !dueDate) return
    setActivities([...activities, { id: crypto.randomUUID(), title, subject: selectedSubject, dueDate, urgency }])
    setTitle(""); setSelectedSubject(""); setDueDate(""); setUrgency("baixa")
  }

  return (
    <div style={{ maxWidth: 900, margin: "80px auto 0", padding: "32px 28px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Título */}
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#f0f0f0", margin: "0 0 4px", letterSpacing: "-.4px" }}>
        Estudos
      </p>
      <p style={{ fontSize: 13, color: "#555", margin: "0 0 32px" }}>Organize suas matérias e atividades</p>

      {/* ── MATÉRIAS ── */}
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#f0f0f0", margin: "0 0 14px" }}>Matérias</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input placeholder="Nome da matéria" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} style={{ ...input, flex: 1 }} />
        <input placeholder="Horário (ex: Seg 08:00)" value={schedule} onChange={(e) => setSchedule(e.target.value)} style={{ ...input, width: 200 }} />
        <button onClick={addSubject} style={btn}>+ Adicionar matéria</button>
      </div>

      {/* Grid de matérias */}
      {subjects.length === 0 ? (
        <p style={{ color: "#444", fontSize: 13, textAlign: "center", padding: "16px 0" }}>Nenhuma matéria adicionada</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
          {subjects.map((s, i) => (
            <div key={s.id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, minWidth: 180 }}>
              <div style={{ width: 34, height: 34, background: "rgba(127,119,221,0.12)", border: "1px solid rgba(127,119,221,0.25)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                {SUBJECT_ICONS[i % SUBJECT_ICONS.length]}
              </div>
              <div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#f0f0f0", margin: 0 }}>{s.name}</p>
                <p style={{ fontSize: 12, color: "#555", margin: "2px 0 0" }}>⏰ {s.schedule}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr style={{ border: "none", borderTop: "1px solid #2a2a2a", margin: "28px 0" }} />

      {/* ── ATIVIDADES ── */}
      <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#f0f0f0", margin: "0 0 14px" }}>Atividades</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input placeholder="Título da atividade" value={title} onChange={(e) => setTitle(e.target.value)} style={{ ...input, flex: 1 }} />
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} style={{ ...input, width: 180 }}>
          <option value="">Selecione a matéria</option>
          {subjects.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ ...input, width: 150 }} />
        <select value={urgency} onChange={(e) => setUrgency(e.target.value as Activity["urgency"])} style={{ ...input, width: 130 }}>
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
        <button onClick={addActivity} style={btn}>+ Adicionar atividade</button>
      </div>

      {/* Lista de atividades */}
      {activities.length === 0 ? (
        <p style={{ color: "#444", fontSize: 13, textAlign: "center", padding: "28px 0" }}>Nenhuma atividade adicionada</p>
      ) : (
        activities.map((a) => {
          const u = urgencyConfig[a.urgency]
          return (
            <div key={a.id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
              {/* Barra de urgência */}
              <div style={{ width: 3, borderRadius: 4, alignSelf: "stretch", background: u.color, flexShrink: 0 }} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#f0f0f0", margin: "0 0 4px" }}>{a.title}</p>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#555" }}>
                  <span>📘 {a.subject}</span>
                  <span>📅 {fmtDate(a.dueDate)}</span>
                </div>
              </div>

              {/* Badge urgência */}
              <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, color: u.color, background: u.bg, border: `1px solid ${u.border}`, flexShrink: 0 }}>
                {a.urgency.charAt(0).toUpperCase() + a.urgency.slice(1)}
              </span>
            </div>
          )
        })
      )}
    </div>
  )
}