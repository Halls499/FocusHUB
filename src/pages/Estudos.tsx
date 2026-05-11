import { useState } from "react";

type Subject = {
  id: string;
  name: string;
  schedule: string;
};

type Activity = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  urgency: "baixa" | "média" | "alta";
};

const urgencyConfig = {
  baixa: {
    label: "Baixa",
    color: "#1D9E75",
    bg: "rgba(29,158,117,0.12)",
    border: "rgba(29,158,117,0.3)",
  },
  média: {
    label: "Média",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.12)",
    border: "rgba(239,159,39,0.3)",
  },
  alta: {
    label: "Alta",
    color: "#E74C3C",
    bg: "rgba(231,76,60,0.12)",
    border: "rgba(231,76,60,0.3)",
  },
};

const SUBJECT_ICONS = [
  "📘",
  "📗",
  "📙",
  "📕",
  "📓",
  "🔬",
  "🔭",
  "🎨",
  "🗺️",
  "💻",
];

function fmtDate(d: string) {
  if (!d) return "";

  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",

  background: "#1e1e1e",
  border: "1px solid #2a2a2a",
  borderRadius: 12,

  padding: "12px 14px",

  color: "#f0f0f0",
  fontSize: 14,
  fontFamily: "'DM Sans', sans-serif",

  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(127,119,221,0.4)",
  background: "rgba(127,119,221,0.15)",

  borderRadius: 12,

  padding: "12px",

  color: "#a89fe8",
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "'Syne', sans-serif",

  cursor: "pointer",
};

const sectionStyle: React.CSSProperties = {
  background: "#161616",
  border: "1px solid #222",

  borderRadius: 18,

  padding: 24,

  width: "100%",
  boxSizing: "border-box",

  marginBottom: 24,
};

export default function Estudos() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const [subjectName, setSubjectName] = useState("");
  const [schedule, setSchedule] = useState("");

  const [title, setTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [urgency, setUrgency] = useState<Activity["urgency"]>("baixa");

  function addSubject() {
    if (!subjectName.trim() || !schedule) return;

    setSubjects([
      ...subjects,
      {
        id: crypto.randomUUID(),
        name: subjectName,
        schedule,
      },
    ]);

    setSubjectName("");
    setSchedule("");
  }

  function addActivity() {
    if (!title.trim() || !selectedSubject || !dueDate) return;

    setActivities([
      ...activities,
      {
        id: crypto.randomUUID(),
        title,
        subject: selectedSubject,
        dueDate,
        urgency,
      },
    ]);

    setTitle("");
    setSelectedSubject("");
    setDueDate("");
    setUrgency("baixa");
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1100,

        margin: "0 auto",

        padding: "40px 20px 80px",
        boxSizing: "border-box",

        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            margin: 0,

            color: "#f0f0f0",

            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,

            letterSpacing: "-1px",
          }}
        >
          Estudos
        </h1>

        <p
          style={{
            marginTop: 8,

            color: "#666",
            fontSize: 14,
          }}
        >
          Gerencie suas matérias e acompanhe suas atividades
        </p>
      </div>

      {/* MATÉRIAS */}
      <section style={sectionStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,

            flexWrap: "wrap",

            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,

              borderRadius: 12,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background: "rgba(127,119,221,0.1)",
              border: "1px solid rgba(127,119,221,0.2)",

              fontSize: 18,
            }}
          >
            📘
          </div>

          <h2
            style={{
              margin: 0,

              color: "#f0f0f0",

              fontSize: 22,
              fontWeight: 800,

              fontFamily: "'Syne', sans-serif",
            }}
          >
            Matérias
          </h2>

          <span
            style={{
              marginLeft: "auto",

              background: "#1e1e1e",
              border: "1px solid #2a2a2a",

              borderRadius: 999,

              padding: "6px 12px",

              color: "#666",
              fontSize: 12,
            }}
          >
            {subjects.length} {subjects.length === 1 ? "matéria" : "matérias"}
          </span>
        </div>

        {/* FORM MATÉRIA */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",

            gap: 12,

            marginBottom: 12,
          }}
        >
          <input
            placeholder="Nome da matéria"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Horário (ex: Seg 08:00)"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button onClick={addSubject} style={buttonStyle}>
          + Adicionar matéria
        </button>

        {/* LISTA MATÉRIAS */}
        <div
          style={{
            marginTop: 22,
          }}
        >
          {subjects.length === 0 ? (
            <div
              style={{
                padding: "28px 0",
                textAlign: "center",

                color: "#444",
                fontSize: 14,
              }}
            >
              Nenhuma matéria adicionada ainda
            </div>
          ) : (
            <div
              style={{
                display: "grid",

                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",

                gap: 14,
              }}
            >
              {subjects.map((subject, index) => (
                <div
                  key={subject.id}
                  style={{
                    background: "#1e1e1e",
                    border: "1px solid #2a2a2a",

                    borderRadius: 14,

                    padding: 16,

                    display: "flex",
                    alignItems: "center",
                    gap: 14,

                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,

                      flexShrink: 0,

                      borderRadius: 10,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      background: "rgba(127,119,221,0.1)",

                      border: "1px solid rgba(127,119,221,0.2)",

                      fontSize: 18,
                    }}
                  >
                    {SUBJECT_ICONS[index % SUBJECT_ICONS.length]}
                  </div>

                  <div
                    style={{
                      minWidth: 0,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,

                        color: "#f0f0f0",

                        fontSize: 14,
                        fontWeight: 700,

                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {subject.name}
                    </p>

                    <p
                      style={{
                        margin: "5px 0 0",

                        color: "#666",
                        fontSize: 12,
                      }}
                    >
                      ⏰ {subject.schedule}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ATIVIDADES */}
      <section style={sectionStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,

            flexWrap: "wrap",

            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,

              borderRadius: 12,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background: "rgba(239,159,39,0.1)",
              border: "1px solid rgba(239,159,39,0.2)",

              fontSize: 18,
            }}
          >
            📋
          </div>

          <h2
            style={{
              margin: 0,

              color: "#f0f0f0",

              fontSize: 22,
              fontWeight: 800,

              fontFamily: "'Syne', sans-serif",
            }}
          >
            Atividades
          </h2>

          <span
            style={{
              marginLeft: "auto",

              background: "#1e1e1e",
              border: "1px solid #2a2a2a",

              borderRadius: 999,

              padding: "6px 12px",

              color: "#666",
              fontSize: 12,
            }}
          >
            {activities.length}{" "}
            {activities.length === 1 ? "atividade" : "atividades"}
          </span>
        </div>

        {/* FORM ATIVIDADES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",

            gap: 12,

            marginBottom: 12,
          }}
        >
          <input
            placeholder="Título da atividade"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={inputStyle}
          >
            <option value="">Selecione a matéria</option>

            {subjects.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={inputStyle}
          />

          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as Activity["urgency"])}
            style={inputStyle}
          >
            <option value="baixa">🟢 Baixa urgência</option>

            <option value="média">🟡 Média urgência</option>

            <option value="alta">🔴 Alta urgência</option>
          </select>
        </div>

        <button onClick={addActivity} style={buttonStyle}>
          + Adicionar atividade
        </button>

        {/* LISTA ATIVIDADES */}
        <div
          style={{
            marginTop: 22,
          }}
        >
          {activities.length === 0 ? (
            <div
              style={{
                padding: "28px 0",
                textAlign: "center",

                color: "#444",
                fontSize: 14,
              }}
            >
              Nenhuma atividade adicionada ainda
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {activities.map((activity) => {
                const urgencyData = urgencyConfig[activity.urgency];

                return (
                  <div
                    key={activity.id}
                    style={{
                      background: "#1e1e1e",
                      border: "1px solid #2a2a2a",

                      borderRadius: 14,

                      padding: 18,

                      display: "flex",
                      alignItems: "center",
                      gap: 16,

                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        alignSelf: "stretch",

                        borderRadius: 999,

                        background: urgencyData.color,
                      }}
                    />

                    <div
                      style={{
                        flex: 1,
                        minWidth: 220,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,

                          color: "#f0f0f0",

                          fontSize: 16,
                          fontWeight: 700,

                          fontFamily: "'Syne', sans-serif",
                        }}
                      >
                        {activity.title}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 14,

                          marginTop: 8,

                          color: "#666",
                          fontSize: 13,
                        }}
                      >
                        <span>📘 {activity.subject}</span>

                        <span>📅 {fmtDate(activity.dueDate)}</span>
                      </div>
                    </div>

                    <span
                      style={{
                        flexShrink: 0,

                        borderRadius: 999,

                        padding: "6px 12px",

                        color: urgencyData.color,

                        background: urgencyData.bg,

                        border: `1px solid ${urgencyData.border}`,

                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {urgencyData.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
