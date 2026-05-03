import { useTasks } from "../hooks/useTasks";

const diasDaSemana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export default function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const todayIndex = new Date().getDay();

  function handleAddTask(day: string) {
    const title = prompt(`Nova tarefa para ${day}`);
    if (!title || !title.trim()) return;
    addTask(title, day);
  }

  return (
    <div
      style={{
        width: "100%", // Garante largura total
        maxWidth: "100%", // Aumentei um pouco para caber os 7 cards folgados
        margin: "80px auto 0", // Centraliza o bloco na tela
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      <section id="semanal">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "nowrap",
            overflowX: "auto",
            paddingBottom: "20px",
          }}
        >
          {diasDaSemana.map((dia, i) => {
            const isToday = i === todayIndex;
            const dayTasks = tasks.filter((t) => t.day === dia);

            return (
              <div
                key={dia}
                style={{
                  flex: "1 1 0", // ← cresce igualmente
                  minWidth: "100px", // ← mínimo antes de rolar
                  maxWidth: "180px", // ← não estica demais em telas grandes
                  minHeight: "210px",
                  background: isToday ? "#1e1d2e" : "#1a1a1a",
                  border: isToday
                    ? "1px solid rgba(127,119,221,0.6)"
                    : "1px solid #2a2a2a",
                  borderRadius: "12px",
                  padding: "14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "border-color 0.2s",
                  flexShrink: 0,
                }}
              >
                {/* Badge "Hoje" */}
                {isToday && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#7F77DD",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  ></span>
                )}

                {/* Nome do dia */}
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#f0f0f0",
                    letterSpacing: "0.3px",
                  }}
                >
                  {dia}
                </h3>

                {/* Botão adicionar */}
                <button
                  onClick={() => handleAddTask(dia)}
                  style={{
                    width: "28px",
                    height: "28px",
                    background: "rgba(127,119,221,0.12)",
                    border: "1px solid rgba(127,119,221,0.3)",
                    borderRadius: "8px",
                    color: "#7F77DD",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                    transition: "background 0.15s",
                  }}
                >
                  +
                </button>

                {/* Lista de tarefas */}
                <div style={{ width: "100%", marginTop: "6px" }}>
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      style={{
                        width: "100%",
                        background: "#242424",
                        border: "1px solid #2e2e2e",
                        borderRadius: "8px",
                        padding: "6px 8px",
                        marginTop: "6px",
                        fontSize: "15px",
                        fontFamily: "'DM Sans', sans-serif",
                        color: task.done ? "#555" : "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            background: task.done ? "#3a3a3a" : "#7F77DD",
                            flexShrink: 0,
                            marginRight: "6px",
                          }}
                        />
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.title}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#555",
                          fontSize: "15px",
                          cursor: "pointer",
                          padding: "0 0 0 4px",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
