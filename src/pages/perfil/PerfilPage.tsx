import React, { useState, useEffect } from 'react';
import { useCliente } from '../../hooks/cliente/useCliente';
import Encabezado from '../../components/encabezado/Encabezado';
import PageLoader from '../../components/loading/PageLoader';
import Footer from '../../components/footer/Footer';
import './perfilpage.css';

const PerfilPage: React.FC = () => {
  const { user, obtenerPerfil, actualizarPerfil, eliminarCuenta, logout } = useCliente();

  const [perfil, setPerfil] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Cargar perfil una sola vez cuando tengamos el usuario
  useEffect(() => {
    if (!user?.idcliente) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const cargarPerfil = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await obtenerPerfil();
        if (isMounted) {
          setPerfil(data);
          setFormData(data);
        }
      } catch (err: any) {
        console.error("Error al cargar perfil:", err);
        if (isMounted) setError(err.message || 'Error al cargar el perfil');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargarPerfil();

    return () => { isMounted = false; };
  }, [user?.idcliente, obtenerPerfil]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      setError(null);
      setSuccess(null);
      await actualizarPerfil(formData);
      setPerfil(formData);
      setSuccess('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
    }
  };

  const handleEliminarCuenta = async () => {
    if (!window.confirm('¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.')) return;
    try {
      await eliminarCuenta();
      logout();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la cuenta');
    }
  };

  // ==================== LOADER ====================
  if (loading) {
    return <PageLoader message="Cargando tu perfil..." />;
  }

  return (
    <div className="perfil-page">
      <Encabezado showBanner={false} />

      <div className="perfil-contenedor">
        <div className="perfil-header">
          <h1>Mi Perfil</h1>
        </div>

        {error && <p className="perfil-error">{error}</p>}
        {success && <p className="perfil-success">{success}</p>}

        <div className="perfil-card">
          <div className="perfil-info">
            {!isEditing ? (
              // Modo vista
              <>
                <div className="info-row">
                  <span className="info-label">Nombre</span>
                  <span className="info-value">{perfil?.nombre} {perfil?.apellido}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">DNI</span>
                  <span className="info-value">{perfil?.dni}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Teléfono</span>
                  <span className="info-value">{perfil?.numero}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Dirección</span>
                  <span className="info-value">{perfil?.direccion}</span>
                </div>
                {perfil?.referencia && (
                  <div className="info-row">
                    <span className="info-label">Referencia</span>
                    <span className="info-value">{perfil.referencia}</span>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-label">Distrito</span>
                  <span className="info-value">{perfil?.distrito || 'No especificado'}</span>
                </div>
              </>
            ) : (
              // Modo edición
              <div className="perfil-form">
                <div className="form-grid">
                  <div>
                    <label>Nombre</label>
                    <input name="nombre" value={formData.nombre || ''} onChange={handleChange} />
                  </div>
                  <div>
                    <label>Apellido</label>
                    <input name="apellido" value={formData.apellido || ''} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <label>Teléfono</label>
                  <input name="numero" value={formData.numero || ''} onChange={handleChange} />
                </div>

                <div>
                  <label>Dirección</label>
                  <input name="direccion" value={formData.direccion || ''} onChange={handleChange} />
                </div>

                <div>
                  <label>Referencia</label>
                  <input name="referencia" value={formData.referencia || ''} onChange={handleChange} />
                </div>

                <div>
                  <label>Distrito</label>
                  <input name="distrito" value={formData.distrito || ''} onChange={handleChange} />
                </div>
              </div>
            )}
          </div>

          <div className="perfil-acciones">
            {!isEditing ? (
              <>
                <button className="btn-editar" onClick={() => setIsEditing(true)}>
                  Editar perfil
                </button>
                <button className="btn-eliminar" onClick={handleEliminarCuenta}>
                  Eliminar cuenta
                </button>
              </>
            ) : (
              <>
                <button className="btn-guardar" onClick={handleGuardar}>
                  Guardar cambios
                </button>
                <button className="btn-cancelar" onClick={() => { setIsEditing(false); setFormData(perfil); }}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PerfilPage;