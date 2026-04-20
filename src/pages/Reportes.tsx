/* ============================================
   PÁGINA: Reportes y Exportación
   ============================================ */

import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Download, X, ChevronRight, Lock, BarChart2, ClipboardList, DollarSign, FileText, Upload } from 'lucide-react';
import './Reportes.css';

const mockReportes = [
  { id: 1, tipo: 'RESUMEN_MENSUAL', nombre: 'Resumen Abril 2026', fecha: '18/04/2026', estado: 'LISTO' },
  { id: 2, tipo: 'DECLARACION_IVA', nombre: 'Declaración IVA - Marzo 2026', fecha: '15/04/2026', estado: 'ENVIADO' },
  { id: 3, tipo: 'DECLARACION_RENTA', nombre: 'Declaración Renta 2025', fecha: '01/03/2026', estado: 'ENVIADO' },
  { id: 4, tipo: 'DETALLE_GASTOS', nombre: 'Detalle Gastos 2026', fecha: '20/02/2026', estado: 'LISTO' },
];

const mockContadores = [
  { id: 1, nombre: 'Maria Vargas', email: 'maria@contadorescr.com', permisos: 'LECTURA', expiracion: '15/06/2026', estado: 'ACTIVO' },
  { id: 2, nombre: 'Carlos Lopez', email: 'carlos@contabilidad.com', permisos: 'EXPORTACION', expiracion: '01/05/2026', estado: 'EXPIRADO' },
];

export const Reportes: React.FC = () => {
  const [showModalInvitar, setShowModalInvitar] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState<string | null>(null);

  const getTipoReporteLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      RESUMEN_MENSUAL: 'Resumen Mensual',
      DECLARACION_IVA: 'Declaración IVA',
      DECLARACION_RENTA: 'Declaración Renta',
      DETALLE_GASTOS: 'Detalle de Gastos',
    };
    return labels[tipo] || tipo;
  };

  return (
    <div className="reportes-page">
      <div className="page-header">
        <div>
          <h1>Reportes</h1>
          <p>Genera y exporta tus reportes fiscales</p>
        </div>
      </div>

      <div className="reportes-grid">
        <Card variant="outlined" padding="md">
          <div className="card-header">
            <h3>Generar Reportes</h3>
          </div>
          <div className="report-types">
            {[
              { tipo: 'RESUMEN_MENSUAL', icono: <BarChart2 size={22} />, desc: 'Resumen de ingresos y gastos del mes' },
              { tipo: 'DECLARACION_IVA', icono: <ClipboardList size={22} />, desc: 'Formulario de declaración de IVA' },
              { tipo: 'DECLARACION_RENTA', icono: <DollarSign size={22} />, desc: 'Declaración anual de renta' },
              { tipo: 'DETALLE_GASTOS', icono: <FileText size={22} />, desc: 'Listado detallado de gastos' },
              { tipo: 'EXPORTACION_ATV', icono: <Upload size={22} />, desc: 'Exportación en formato ATV' },
            ].map(reporte => (
              <div
                key={reporte.tipo}
                className="report-type-card"
                onClick={() => { setReporteSeleccionado(reporte.tipo); setShowExportModal(true); }}
              >
                <span className="report-type-icon">{reporte.icono}</span>
                <div className="report-type-info">
                  <span className="report-type-name">{getTipoReporteLabel(reporte.tipo)}</span>
                  <span className="report-type-desc">{reporte.desc}</span>
                </div>
                <ChevronRight size={20} color="var(--color-text-muted)" />
              </div>
            ))}
          </div>
        </Card>

        <Card variant="outlined" padding="md">
          <div className="card-header">
            <h3>Reportes Recientes</h3>
          </div>
          <div className="reportes-list">
            {mockReportes.map(reporte => (
              <div key={reporte.id} className="reporte-item">
                <div className="reporte-info">
                  <span className="reporte-nombre">{reporte.nombre}</span>
                  <span className="reporte-fecha">{reporte.fecha}</span>
                </div>
                <div className="reporte-actions">
                  <Badge variant={reporte.estado === 'ENVIADO' ? 'success' : 'info'} size="sm">
                    {reporte.estado}
                  </Badge>
                  <button className="action-icon" title="Descargar">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card variant="outlined" padding="md">
        <div className="card-header">
          <h3>Autorizar Contador</h3>
          <Button variant="primary" size="sm" onClick={() => setShowModalInvitar(true)}>
            Invitar Contador
          </Button>
        </div>
        <div className="contadores-list">
          {mockContadores.map(contador => (
            <div key={contador.id} className="contador-item">
              <div className="contador-avatar">
                {contador.nombre.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="contador-info">
                <span className="contador-nombre">{contador.nombre}</span>
                <span className="contador-email">{contador.email}</span>
              </div>
              <Badge variant={contador.estado === 'ACTIVO' ? 'success' : 'default'} size="sm">
                {contador.estado}
              </Badge>
              <div className="contador-details">
                <span>Permisos: {contador.permisos}</span>
                <span>Expira: {contador.expiracion}</span>
              </div>
              <button className="action-icon action-icon-danger" title="Revocar">
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal Exportar */}
      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Exportar Reporte" size="md">
        <div className="export-modal">
          <div className="export-preview">
            <h4>Vista Previa</h4>
            <div className="preview-content">
              <p>Reporte: {reporteSeleccionado && getTipoReporteLabel(reporteSeleccionado)}</p>
              <p>Período: Abril 2026</p>
              <p>Ingresos: ₡245,000</p>
              <p>Gastos: ₡45,000</p>
              <p>Impuesto: ₡26,000</p>
            </div>
          </div>
          <div className="export-options">
            <h4>Formato de Exportación</h4>
            <div className="format-options">
              <button className="format-btn format-btn-active">
                <FileText size={20} />
                <span>PDF</span>
              </button>
              <button className="format-btn">
                <BarChart2 size={20} />
                <span>CSV</span>
              </button>
              <button className="format-btn">
                <ClipboardList size={20} />
                <span>XML</span>
              </button>
            </div>
          </div>
          <div className="export-security">
            <Lock size={20} />
            <span>El archivo se encriptará automáticamente</span>
          </div>
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>Cancelar</Button>
            <Button variant="primary">Exportar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Invitar Contador */}
      <Modal isOpen={showModalInvitar} onClose={() => setShowModalInvitar(false)} title="Invitar Contador" size="sm">
        <div className="invitar-form">
          <Input label="Email" type="email" placeholder="correo@contador.com" />
          <div className="permisos-select">
            <label>Permisos</label>
            <div className="permisos-options">
              <button className="permiso-btn permiso-btn-active">Solo Lectura</button>
              <button className="permiso-btn">Lectura + Exportación</button>
              <button className="permiso-btn">Acceso Total</button>
            </div>
          </div>
          <Input label="Fecha de Expiración" type="date" />
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowModalInvitar(false)}>Cancelar</Button>
            <Button variant="primary">Enviar Invitación</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Reportes;