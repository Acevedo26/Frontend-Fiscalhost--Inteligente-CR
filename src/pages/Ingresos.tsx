/* ============================================
   PÁGINA: Mis Ingresos
   Descripción: listado de transacciones y clasificación
   ============================================ */

import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Upload, Plus, Pencil, Trash2 } from 'lucide-react';
import './Ingresos.css';

const mockTransactions = [
  { id: 1, fecha: '15/04/2026', concepto: 'Reserva Airbnb #2847', monto: 45000, tipo: 'INGRESO', fuente: 'Airbnb', clasificacion: 'GRAVADO_13' },
  { id: 2, fecha: '14/04/2026', concepto: 'Reserva Booking #B3921', monto: 32000, tipo: 'INGRESO', fuente: 'Booking', clasificacion: 'GRAVADO_13' },
  { id: 3, fecha: '12/04/2026', concepto: 'Reserva Directa', monto: 28000, tipo: 'INGRESO', fuente: 'Directo', clasificacion: 'EXENTO' },
  { id: 4, fecha: '10/04/2026', concepto: 'Reserva Airbnb #2845', monto: 55000, tipo: 'INGRESO', fuente: 'Airbnb', clasificacion: 'GRAVADO_13' },
  { id: 5, fecha: '08/04/2026', concepto: 'Retención PayPal', monto: 6750, tipo: 'INGRESO', fuente: 'PayPal', clasificacion: 'RETENCION_15' },
  { id: 6, fecha: '05/04/2026', concepto: 'Reserva Vrbo #V123', monto: 38000, tipo: 'INGRESO', fuente: 'Vrbo', clasificacion: 'GRAVADO_13' },
];

const mockGastos = [
  { id: 1, fecha: '12/04/2026', concepto: 'Limpieza Villa Sol', monto: 15000, tipo: 'GASTO', proveedor: 'Limpiezas Costa' },
  { id: 2, fecha: '08/04/2026', concepto: 'Mantenimiento AC', monto: 35000, tipo: 'GASTO', proveedor: 'CoolTech' },
  { id: 3, fecha: '01/04/2026', concepto: 'Internet', monto: 25000, tipo: 'GASTO', proveedor: 'ICE' },
];

const optionsClasificacion = [
  { label: 'Gravado 13%', value: 'GRAVADO_13' },
  { label: 'Exento', value: 'EXENTO' },
  { label: 'Retención 15%', value: 'RETENCION_15' },
  { label: 'Pendiente', value: 'PENDIENTE' },
];

const optionsFuente = [
  { label: 'Airbnb', value: 'AIRBNB' },
  { label: 'Booking', value: 'BOOKING' },
  { label: 'Vrbo', value: 'VRBO' },
  { label: 'Directo', value: 'DIRECTO' },
  { label: 'PayPal', value: 'PAYPAL' },
];

export const Ingresos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ingresos' | 'gastos'>('ingresos');
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalImport, setShowModalImport] = useState(false);

  const filteredTransactions = activeTab === 'ingresos' 
    ? mockTransactions 
    : mockGastos;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', { 
      style: 'currency', 
      currency: 'CRC',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="ingresos-page">
      <div className="page-header">
        <div>
          <h1>Mis Ingresos</h1>
          <p>Gestiona tus transacciones y clasificaciones</p>
        </div>
        <div className="page-actions">
          <Button variant="outline" onClick={() => setShowModalImport(true)}>
            <Upload size={18} />
            Importar CSV
          </Button>
          <Button variant="primary" onClick={() => setShowModalAdd(true)}>
            <Plus size={18} />
            Agregar
          </Button>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'ingresos' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('ingresos')}
        >
          Ingresos ({mockTransactions.length})
        </button>
        <button 
          className={`tab ${activeTab === 'gastos' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('gastos')}
        >
          Gastos ({mockGastos.length})
        </button>
      </div>

      <Card variant="outlined" padding="none">
        <div className="table-container">
          <table className=" data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                {activeTab === 'ingresos' && <th>Fuente</th>}
                {activeTab === 'gastos' && <th>Proveedor</th>}
                <th>Monto</th>
                {activeTab === 'ingresos' && <th>Clasificación</th>}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="cell-date">{tx.fecha}</td>
                  <td className="cell-concept">{tx.concepto}</td>
                  {activeTab === 'ingresos' && <td>{(tx as any).fuente}</td>}
                  {activeTab === 'gastos' && <td>{(tx as any).proveedor}</td>}
                  <td className={`cell-amount ${tx.tipo === 'GASTO' ? 'expense' : 'income'}`}>
                    {tx.tipo === 'GASTO' ? '-' : '+'}{formatCurrency(tx.monto)}
                  </td>
                  {activeTab === 'ingresos' && 'clasificacion' in tx && (
                    <td>
                      <Badge 
                        variant={
                          (tx as any).clasificacion === 'GRAVADO_13' ? 'info' : 
                          (tx as any).clasificacion === 'EXENTO' ? 'success' : 
                          (tx as any).clasificacion === 'RETENCION_15' ? 'warning' : 'default'
                        } 
                        size="sm"
                      >
                        {(tx as any).clasificacion === 'GRAVADO_13' ? '13%' : 
                         (tx as any).clasificacion === 'EXENTO' ? 'Exento' : 
                         (tx as any).clasificacion === 'RETENCION_15' ? '15% ret' : 'Pendiente'}
                      </Badge>
                    </td>
                  )}
                  <td className="cell-actions">
                    <button className="action-btn" title="Editar">
                      <Pencil size={16} />
                    </button>
                    <button className="action-btn action-btn-danger" title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Agregar Transacción */}
      <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)} title="Agregar Transacción" size="md">
        <div className="modal-form">
          <Select 
            label="Tipo de Transacción"
            options={[
              { label: 'Ingreso', value: 'INGRESO' },
              { label: 'Gasto', value: 'GASTO' },
            ]}
            placeholder="Selecciona el tipo"
          />
          <Input label="Fecha" type="date" />
          <Input label="Concepto" placeholder="Ej: Reserva Airbnb #1234" />
          <Input label="Monto" type="number" placeholder="0" />
          {activeTab === 'ingresos' ? (
            <Select 
              label="Fuente"
              options={optionsFuente}
              placeholder="Selecciona la fuente"
            />
          ) : (
            <Input label="Proveedor" placeholder="Nombre del proveedor" />
          )}
          {activeTab === 'ingresos' && (
            <Select 
              label="Clasificación"
              options={optionsClasificacion}
              placeholder="Selecciona la clasificación"
            />
          )}
          
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowModalAdd(false)}>Cancelar</Button>
            <Button variant="primary">Guardar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Importar CSV */}
      <Modal isOpen={showModalImport} onClose={() => setShowModalImport(false)} title="Importar CSV" size="md">
        <div className="import-csv">
          <div className="import-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Seleccionar Plataforma</h4>
              <div className="platform-options">
                {['Airbnb', 'Booking', 'Vrbo', 'Genérico'].map((platform) => (
                  <button key={platform} className="platform-btn">
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="import-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>Subir Archivo</h4>
              <div className="drop-zone">
                <Upload size={48} strokeWidth={1.5} color="var(--color-text-muted)" />
                <p>Arrastra tu archivo CSV aquí</p>
                <span>o</span>
                <button className="browse-btn">Buscar archivo</button>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setShowModalImport(false)}>Cancelar</Button>
            <Button variant="primary">Importar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Ingresos;