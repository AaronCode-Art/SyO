import { useEffect, useState } from 'react';
import { productoService } from '../../services/productoService';
import type { ProductoLista, PageResponse } from '../../types/Producto.types';

/**
 * Hook especializado para la página de productos
 * Soporta: filtro por categoría + rango de precio + ordenamiento
 */
export const useProductosFiltro = (
  categoriaId?: string,
  precioMin?: number,
  precioMax?: number,
  sort: 'asc' | 'desc' = 'asc'
) => {

  const [productos, setProductos] = useState<ProductoLista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamamos al método avanzado del service
        const data: PageResponse<ProductoLista> = await productoService.buscarConFiltros(
          categoriaId,
          precioMin,
          precioMax,
          sort
        );

        setProductos(data.content);
      } catch (err) {
        console.error('Error al cargar productos con filtros:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [categoriaId, precioMin, precioMax, sort]);   // ← Dependencias importantes

  return { 
    productos, 
    loading, 
    error 
  };
};