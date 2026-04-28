import React from "react";
import Encabezado from "../../components/encabezado/Encabezado";
import SeccionCategorias from "../../components/categoria/SeccionCategorias";
import SeccionProducto from "../../components/seccionproducto/SeccionProducto";
import Footer from "../../components/footer/Footer";
import { useCategorias } from "../../hooks/categoria/useCategorias";
import { useProductosMasBaratos } from "../../hooks/producto/useProductosMasBaratos";

import "./iniciopage.css";

const InicioPage: React.FC = () => {

  // Hooks para obtener datos
  const { categorias, loading: loadingCategorias } = useCategorias();
  const { productos: destacados, loading: loadingDestacados } = useProductosMasBaratos(5);

  // Mostrar loading mientras se cargan los datos
  if (loadingCategorias || loadingDestacados) {
    return (
      <div className="inicio-loading">
        <span /><span /><span />
      </div>
    );
  }

  return (
    <div className="inicio-page">

      <Encabezado showBanner={true} />

      {/* Sección de Categorías */}
      <SeccionCategorias />

      <main className="contenido-principal">

        {/* Productos Destacados (5 más baratos) */}
        <SeccionProducto
          titulo="Productos Destacados"
          limit={5}
          verMasLink="/productos"
        />

        {/* Secciones dinámicas por categoría (4 productos cada una) */}
        {categorias.map((categoria) => (
          <SeccionProducto
            key={categoria.idcategoria}
            categoriaId={String(categoria.idcategoria)}
            titulo={categoria.nombre}
            limit={4}
            verMasLink={`/categoria/${categoria.idcategoria}`}
          />
        ))}

      </main>

      <Footer />
    </div>
  );
};

export default InicioPage;
