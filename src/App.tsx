import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Gastos from "./pages/Gastos";
import Estudos from "./pages/Estudos";

function App() {
  return (
    <>
      <div style={{ padding: "20px"}}></div>
      <Header />
      <Dashboard />
      <Gastos />
      <Estudos />
    </>
  );
}

export default App;
