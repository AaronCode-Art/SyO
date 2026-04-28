import { useEffect, useState } from 'react';
import { productoService } from '../../services/productoService';
import type { ProductoLista } from '../../types/Producto.types';

/**
 * Custom Hook: useProductosMasBaratos
 * 
 * Este hook se encarga de cargar los productos más baratos
 * (ordenados por preciodesct ascendente).
 * 
 * Se usa principalmente en la página de inicio para la sección
 * "Productos Destacados".
 */
export const useProductosMasBaratos = (limit: number = 5) => {

  const [productos, setProductos] = useState<ProductoLista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarProductosMasBaratos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamamos al servicio que ya tiene el endpoint con sort=preciodesct,asc
        const data = await productoService.getMasBaratos(limit);

        setProductos(data);
      } catch (err) {
        console.error('Error al cargar productos más baratos:', err);
        setError('No se pudieron cargar los productos destacados');
      } finally {
        setLoading(false);
      }
    };

    cargarProductosMasBaratos();
  }, [limit]); // Se vuelve a ejecutar si cambia el límite

  return { 
    productos, 
    loading, 
    error 
  };
};