import React from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../../hooks/producto/useProductos';
import TarjetaProducto from '../producto/TarjetaProducto';
import './seccionproducto.css';

/**
 * SeccionProducto
 * 
 * Componente de solo PRESENTACIÓN (UI)
 * NO contiene lógica de fetching ni condiciones.
 * Todo eso está en el custom hook useProductos.
 */
interface Props {
  categoriaId?: string;     // Si no se pasa → muestra todos los productos
  titulo: string;
  limit?: number;           // Ej: 4 en categorías, 5 en destacados
  verMasLink?: string;      // Si se pasa → muestra botón "Ver más"
}

const SeccionProducto: React.FC<Props> = ({
  categoriaId,
  titulo,
  limit,
  verMasLink
}) => {

  // Solo consumimos el hook (toda la lógica está fuera)
  const { productos, loading, error } = useProductos(categoriaId, limit);

  if (loading) {
    return <section className="seccion-productos-inicio">Cargando productos...</section>;
  }

  if (error) {
    return <section className="seccion-productos-inicio text-red-500">{error}</section>;
  }

  return (
    <section className="seccion-productos-inicio">
      <div className="header-seccion">
        <h2 className="titulo-categoria">{titulo}</h2>

        {/* Botón "Ver más" solo aparece si se pasa verMasLink */}
        {verMasLink && (
          <Link to={verMasLink} className="ver-mas-top">
            Ver más →
          </Link>
        )}
      </div>

      {/* Fila horizontal con scroll */}
      <div className="fila-productos">
        {productos.map((producto) => (
          <div key={producto.idproducto} className="tarjeta-contenedor">
            <TarjetaProducto 
            producto={producto}/>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeccionProducto;