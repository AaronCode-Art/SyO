import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductoLista } from '../../types/Producto.types';
import './tarjetaproducto.css';

/**
 * TarjetaProducto
 * Componente de presentación (Dumb Component).
 * Solo renderiza la UI del producto. Sin lógica de datos ni hooks.
 */
const TarjetaProducto: React.FC<{ producto: ProductoLista }> = ({ producto }) => {
  const sinStock = producto.stock === 0;

  return (
    <Link
      to={`/producto/${producto.idproducto}`}
      className="tarjeta-link-wrapper"
    >
      <div className="tarjeta-producto">

        {/* Badge descuento */}
        {producto.descuento > 0 && (
          <div className="badge-descuento">
            {producto.descuento}% OFF
          </div>
        )}

        {/* Imagen */}
        <div className="tarjeta-imagen-cont">
          <img
            src={producto.imgurl}
            alt={producto.nombre}
          />
        </div>

        {/* Meta */}
        <div className="meta-info">
          <span className="tarjeta-marca">{producto.marca}</span>
          <span className={`stock-status ${sinStock ? 'outstock' : 'instock'}`}>
            {sinStock ? 'sin stock' : 'en stock'}
          </span>
        </div>

        {/* Nombre */}
        <h3 className="tarjeta-nombre">{producto.nombre}</h3>

        {/* Precios */}
        <div className="tarjeta-precios">
          {producto.descuento > 0 && (
            <span className="precio-original">
              S/ {producto.precio.toFixed(2)}
            </span>
          )}
          <span className="precio-final">
            S/ {producto.preciodesct.toFixed(2)}
          </span>
        </div>
       
        {/* Footer */}
        <div className="tarjeta-footer">
          <button className="btn-comprar" disabled={sinStock}>
            {sinStock ? 'Sin stock' : 'Comprar ahora'}
          </button>
        </div>

      </div>
    </Link>
  );
};

export default TarjetaProducto;
