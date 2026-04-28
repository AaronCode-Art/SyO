import { Routes, Route } from "react-router-dom";
import InicioPage from "./pages/inicio/InicioPage";
import NosotrosPages from "./pages/nosotros/NosotrosPages";
import ContactoPage from "./pages/contactos/ContactoPage";
import "./App.css";
import ProductoPage from "./pages/productos/ProductoPage";
import ProductoCatPage from "./pages/productoporcategoria/ProductoCatPage";
import ProductoDetallePage from "./pages/productodetalle/ProductoDetallePage";

function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route path="/" element={<InicioPage />} />

      {/* FUTURO (para que no rompa luego) */}
      <Route path="/producto/:id" element={<ProductoDetallePage />} />
      <Route path="/nosotros" element={<NosotrosPages />} />
      <Route path="/contacto" element={<ContactoPage/>} />
      <Route path="/productos" element={<ProductoPage />} />
      <Route path="/categoria/:id" element={<ProductoCatPage />} />

    </Routes>
  );
}

export default App;