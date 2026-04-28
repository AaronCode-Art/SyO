import React, { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./encabezado.css";

interface Props {
  showBanner?: boolean;
}

const Encabezado: React.FC<Props> = ({ showBanner = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscar:", search);
  };

  return (
    <div className={`site-wrapper ${!showBanner ? "no-banner" : ""}`}>

      {/* Overlay móvil */}
      <div
        className={`menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ===== HEADER ===== */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>

        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-mark">S<span>&amp;</span>O</span>
          <span className="logo-sub">Repuestos</span>
        </Link>

        {/* Buscador desktop */}
        <form onSubmit={handleSearch} className="search-bar">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Nav desktop */}
        <nav className="main-nav desktop-nav">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/pedidos">Pedidos</Link>
        </nav>

        {/* Acciones */}
        <div className="header-actions">
          <button className="cart-btn">
            <ShoppingBag size={22} />
            <span className="cart-badge">0</span>
          </button>

          <Link to="/perfil" className="profile-btn">A</Link>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ===== DRAWER MÓVIL ===== */}
      <nav className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span className="logo-mark">S<span>&amp;</span>O</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="search-bar mobile-search">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="¿Qué buscas?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <ul onClick={() => setMenuOpen(false)}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/pedidos">Pedidos</Link></li>
        </ul>
      </nav>

      {/* ===== HERO ===== */}
      {showBanner && (
        <main className="hero">
          <div className="hero-grid-lines" aria-hidden="true" />

          <div className="hero-text">
            <div className="hero-label">Componentes de calidad</div>
            <h1 className="hero-title">
              Los<br />mejores<br /><em>precios</em>
            </h1>
            <p className="hero-desc">
              Calidad garantizada en componentes de alto rendimiento para tu vehículo.
            </p>
            <Link to="/productos" className="hero-cta">
              Ver catálogo
              <ArrowRight size={16} />
            </Link>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">5K+</span>
                <span className="stat-label">Productos</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">10+</span>
                <span className="stat-label">Años</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">98%</span>
                <span className="stat-label">Satisfacción</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-glow" aria-hidden="true" />
            <img
              src="https://res.cloudinary.com/dfmveqhud/image/upload/q_auto/f_auto/v1777109036/bn_cf3fw5.png"
              alt="Repuesto destacado"
              className="hardware-render"
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default Encabezado;
