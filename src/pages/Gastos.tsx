import { useState } from "react";

type Expense = {
  id: string;
  name: string;
  value: number;
  status: "pago" | "planejado" | "em andamento";
};

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
};

const ICONS = ["💳", "🏠", "🚗", "🍔", "📱", "🎮", "💊", "📚", "✈️", "🛍️"];

function fmt(v: number) {
  return "R$ " + v.toFixed(2).replace(".", ",");
}

export default function Gastos() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  function addExpense() {
    if (!name.trim() || !value) return;
    setExpenses([
      ...expenses,
      {
        id: crypto.randomUUID(),
        name,
        value: Number(value),
        status: "planejado",
      },
    ]);
    setName("");
    setValue("");
  }

  function deleteExpense(id: string) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  function changeStatus(id: string, status: Expense["status"]) {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  const total = expenses.reduce((a, e) => a + e.value, 0);
  const pago = expenses
    .filter((e) => e.status === "pago")
    .reduce((a, e) => a + e.value, 0);
  const pend = expenses
    .filter((e) => e.status !== "pago")
    .reduce((a, e) => a + e.value, 0);

  return (
    <div
      style={{
        maxWidth: "860px",
        margin: "80px auto 0",
        padding: "32px 28px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Título */}
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 26,
          fontWeight: 800,
          color: "#f0f0f0",
          margin: "0 0 4px",
          letterSpacing: "-.4px",
        }}
      >
        Gastos
      </p>
      <p style={{ fontSize: 13, color: "#555", margin: "0 0 28px" }}>
        Controle seus gastos e receitas
      </p>

      {/* Formulário */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <input
          placeholder="Nome do gasto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addExpense()}
          style={{
            flex: 1,
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 14,
            color: "#e0e0e0",
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <input
          placeholder="R$ 0,00"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addExpense()}
          style={{
            width: 140,
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 14,
            color: "#e0e0e0",
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <button
          onClick={addExpense}
          style={{
            background: "rgba(127,119,221,0.15)",
            border: "1px solid rgba(127,119,221,0.4)",
            borderRadius: 10,
            color: "#a89fe8",
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            padding: "10px 20px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          + Adicionar
        </button>
      </div>

      {/* Resumo */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
          marginBottom: 28,
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
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#555",
                letterSpacing: ".6px",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: s.color,
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Lista */}
      {expenses.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
            color: "#444",
            fontSize: 14,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>💸</div>
          Nenhum gasto adicionado ainda
        </div>
      ) : (
        expenses.map((exp, i) => {
          return (
            <div
              key={exp.id}
              style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              {/* Ícone */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: "#242424",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {ICONS[i % ICONS.length]}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#f0f0f0",
                    margin: "0 0 3px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exp.name}
                </p>
                <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                  {fmt(exp.value)}
                </p>
              </div>

              {/* Status */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {(Object.keys(statusConfig) as Expense["status"][]).map((s) => {
                  const c = statusConfig[s];
                  const active = exp.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => changeStatus(exp.id, s)}
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "5px 10px",
                        borderRadius: 20,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        color: c.color,
                        background: active
                          ? c.bg.replace("0.1", "0.25").replace("0.12", "0.25")
                          : c.bg,
                        border: `1px solid ${active ? c.color : c.border}`,
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {/* Deletar */}
              <button
                onClick={() => deleteExpense(exp.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#444",
                  fontSize: 16,
                  cursor: "pointer",
                  padding: 4,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
