import { useState } from "react"

type Expense = {
  id: string
  name: string
  value: number
  status: "pago" | "planejado" | "em andamento"
}

const statusConfig = {
  pago: {
    label: "Pago",
    color: "#1D9E75",
    bg: "rgba(29,158,117,0.12)",
    border: "rgba(29,158,117,0.3)",
  },
  planejado: {
    label: "Planejado",
    color: "#7F77DD",
    bg: "rgba(127,119,221,0.1)",
    border: "rgba(127,119,221,0.25)",
  },
  "em andamento": {
    label: "Em andamento",
    color: "#EF9F27",
    bg: "rgba(239,159,39,0.1)",
    border: "rgba(239,159,39,0.25)",
  },
}

const ICONS = ["💳", "🏠", "🚗", "🍔", "📱", "🎮", "💊", "📚", "✈️", "🛍️"]

function fmt(v: number) {
  return "R$ " + v.toFixed(2).replace(".", ",")
}

export default function Gastos() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [name, setName] = useState("")
  const [value, setValue] = useState("")

  function addExpense() {
    if (!name.trim() || !value) return

    setExpenses([
      ...expenses,
      {
        id: crypto.randomUUID(),
        name,
        value: Number(value),
        status: "planejado",
      },
    ])

    setName("")
    setValue("")
  }

  function deleteExpense(id: string) {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  function changeStatus(id: string, status: Expense["status"]) {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, status } : e)))
  }

  const total = expenses.reduce((a, e) => a + e.value, 0)

  const pago = expenses
    .filter((e) => e.status === "pago")
    .reduce((a, e) => a + e.value, 0)

  const pend = expenses
    .filter((e) => e.status !== "pago")
    .reduce((a, e) => a + e.value, 0)

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "80px auto 0",
        padding: "24px 16px",
        boxSizing: "border-box",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* TÍTULO */}
      <div style={{ marginBottom: "28px" }}>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(28px, 5vw, 36px)",
            fontWeight: 800,
            color: "#f0f0f0",
            margin: "0 0 4px",
          }}
        >
          Gastos
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#666",
            margin: 0,
          }}
        >
          Controle seus gastos e receitas
        </p>
      </div>

      {/* FORMULÁRIO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <input
          placeholder="Nome do gasto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addExpense()}
          style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "12px",
            padding: "12px 14px",
            fontSize: "14px",
            color: "#e0e0e0",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
        />

        <input
          placeholder="R$ 0,00"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addExpense()}
          style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "12px",
            padding: "12px 14px",
            fontSize: "14px",
            color: "#e0e0e0",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={addExpense}
          style={{
            background: "rgba(127,119,221,0.15)",
            border: "1px solid rgba(127,119,221,0.4)",
            borderRadius: "12px",
            color: "#a89fe8",
            fontFamily: "'Syne', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            padding: "12px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          + Adicionar
        </button>
      </div>

      {/* RESUMO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {[
          { label: "Total", value: fmt(total), color: "#7F77DD" },
          { label: "Pago", value: fmt(pago), color: "#1D9E75" },
          { label: "Pendente", value: fmt(pend), color: "#EF9F27" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "14px",
              padding: "16px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#666",
                letterSpacing: ".8px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {s.label}
            </div>

            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(22px, 4vw, 28px)",
                fontWeight: 800,
                color: s.color,
                wordBreak: "break-word",
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* LISTA */}
      {expenses.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#555",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>💸</div>

          <p style={{ margin: 0 }}>Nenhum gasto adicionado ainda</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {expenses.map((exp, i) => (
            <div
              key={exp.id}
              style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "14px",
                padding: "14px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
              }}
            >
              {/* ÍCONE */}
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  background: "#242424",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {ICONS[i % ICONS.length]}
              </div>

              {/* INFO */}
              <div
                style={{
                  flex: 1,
                  minWidth: "180px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#f0f0f0",
                    margin: "0 0 4px",
                    wordBreak: "break-word",
                  }}
                >
                  {exp.name}
                </p>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    margin: 0,
                  }}
                >
                  {fmt(exp.value)}
                </p>
              </div>

              {/* STATUS */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {(Object.keys(statusConfig) as Expense["status"][]).map((s) => {
                  const c = statusConfig[s]
                  const active = exp.status === s

                  return (
                    <button
                      key={s}
                      onClick={() => changeStatus(exp.id, s)}
                      style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        padding: "6px 10px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        color: c.color,
                        background: active
                          ? c.bg.replace("0.1", "0.25").replace("0.12", "0.25")
                          : c.bg,
                        border: `1px solid ${active ? c.color : c.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.label}
                    </button>
                  )
                })}
              </div>

              {/* DELETE */}
              <button
                onClick={() => deleteExpense(exp.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "4px",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}