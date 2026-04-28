import { Routes, Route } from "react-router-dom";
import InicioPage from "./pages/inicio/InicioPage";
import "./App.css";

function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route path="/" element={<InicioPage />} />

      {/* FUTURO (para que no rompa luego) */}
      <Route path="/producto/:id" element={<div>Detalle Producto</div>} />
      <Route path="/categoria/:id" element={<div>Productos por categoría</div>} />

    </Routes>
  );
}

export default App;