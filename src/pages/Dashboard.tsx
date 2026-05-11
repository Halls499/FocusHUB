import { useTasks } from "../hooks/useTasks"

const diasDaSemana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
]

export default function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()
  const todayIndex = new Date().getDay()

  function handleAddTask(day: string) {
    const title = prompt(`Nova tarefa para ${day}`)

    if (!title || !title.trim()) return

    addTask(title, day)
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "80px auto 0",
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      <section id="semanal">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            width: "100%",
          }}
        >
          {diasDaSemana.map((dia, i) => {
            const isToday = i === todayIndex
            const dayTasks = tasks.filter((t) => t.day === dia)

            return (
              <div
                key={dia}
                style={{
                  minHeight: "240px",
                  background: isToday ? "#1e1d2e" : "#1a1a1a",
                  border: isToday
                    ? "1px solid rgba(127,119,221,0.6)"
                    : "1px solid #2a2a2a",
                  borderRadius: "14px",
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                }}
              >
                {/* TOPO */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#f0f0f0",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {dia}
                  </h3>

                  <button
                    onClick={() => handleAddTask(dia)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      border: "1px solid rgba(127,119,221,0.3)",
                      background: "rgba(127,119,221,0.12)",
                      color: "#7F77DD",
                      cursor: "pointer",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </button>
                </div>

                {/* TAREFAS */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        width: "100%",
                        background: "#242424",
                        border: "1px solid #2f2f2f",
                        borderRadius: "10px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        gap: "8px",
                      }}
                    >
                      {/* ESQUERDA */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: task.done ? "#555" : "#7F77DD",
                            flexShrink: 0,
                          }}
                        />

                        <span
                          style={{
                            color: task.done ? "#666" : "#ddd",
                            textDecoration: task.done
                              ? "line-through"
                              : "none",
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            fontSize: "14px",
                            lineHeight: "18px",
                          }}
                        >
                          {task.title}
                        </span>
                      </div>

                      {/* BOTÃO DELETE */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteTask(task.id)
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#666",
                          cursor: "pointer",
                          fontSize: "15px",
                          flexShrink: 0,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}