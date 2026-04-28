import { useEffect, useState } from 'react';
import { productoService } from '../../services/productoService';
import type { ProductoLista, PageResponse } from '../../types/Producto.types';

/**
 * Custom Hook: useProductos
 * Maneja toda la lógica de carga de productos (por categoría o todos)
 */
export const useProductos = (categoriaId?: string, limit?: number) => {
  const [productos, setProductos] = useState<ProductoLista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: PageResponse<ProductoLista>;

        if (categoriaId) {
          // Caso 1: Productos de una categoría específica
          data = await productoService.getByCategoria(categoriaId);
        } else {
          // Caso 2: Todos los productos (para página de inicio)
          data = await productoService.getAll();
        }

        // Aplicamos límite si existe (ej: solo 4 o 5 productos)
        let productosFinales = data.content;
        if (limit !== undefined) {
          productosFinales = productosFinales.slice(0, limit);
        }

        setProductos(productosFinales);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [categoriaId, limit]);

  return { productos, loading, error };
};