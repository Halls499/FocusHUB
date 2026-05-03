import { useState } from "react"

type Subject = {
  id: string
  name: string
  schedule: string
}

type Activity = {
  id: string
  title: string
  subject: string
  dueDate: string
  urgency: "baixa" | "média" | "alta"
}

export default function Estudos() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  const [subjectName, setSubjectName] = useState("")
  const [schedule, setSchedule] = useState("")

  const [title, setTitle] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [urgency, setUrgency] = useState<Activity["urgency"]>("baixa")

  function addSubject() {
    if (!subjectName.trim() || !schedule) return

    setSubjects([
      ...subjects,
      {
        id: crypto.randomUUID(),
        name: subjectName,
        schedule,
      },
    ])

    setSubjectName("")
    setSchedule("")
  }

  function addActivity() {
    if (!title.trim() || !selectedSubject || !dueDate) return

    setActivities([
      ...activities,
      {
        id: crypto.randomUUID(),
        title,
        subject: selectedSubject,
        dueDate,
        urgency,
      },
    ])

    setTitle("")
    setSelectedSubject("")
    setDueDate("")
    setUrgency("baixa")
  }

  const urgencyColor = {
    baixa: "#1D9E75",
    média: "#EF9F27",
    alta: "#E74C3C",
  }

  return (
    <div style={{ maxWidth: 900, margin: "80px auto", padding: 24, color: "#fff" }}>

      <h1>📚 Estudos</h1>

      {/* MATÉRIAS */}
      <h2>Matérias</h2>

      <input
        placeholder="Nome da matéria"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
      />

      <input
        placeholder="Horário (ex: Seg 08:00)"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />

      <button onClick={addSubject}>Adicionar matéria</button>

      <div>
        {subjects.map((s) => (
          <div key={s.id}>
            📘 {s.name} - ⏰ {s.schedule}
          </div>
        ))}
      </div>

      <hr />

      {/* ATIVIDADES */}
      <h2>Atividades</h2>

      <input
        placeholder="Título da atividade"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
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
      />

      <select
        value={urgency}
        onChange={(e) => setUrgency(e.target.value as "baixa" | "média" | "alta")}
      >
        <option value="baixa">Baixa</option>
        <option value="média">Média</option>
        <option value="alta">Alta</option>
      </select>

      <button onClick={addActivity}>Adicionar atividade</button>

      <div>
        {activities.map((a) => (
          <div key={a.id}>
            <strong>{a.title}</strong> - {a.subject} - {a.dueDate}
            <span style={{ color: urgencyColor[a.urgency] }}>
              {" "}({a.urgency})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}