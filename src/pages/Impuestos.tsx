/* ============================================
   PÁGINA: Centro de Cálculo (Impuestos)
   Descripción: Cálculo de impuestos y simulaciones
   ============================================ */

import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import './Impuestos.css';

const mockCalculos = {
  iva: {
    periodo: 'Abril 2026',
    ingresos: 245000,
    gastos: 45000,
    baseImponible: 200000,
    impuesto: 26000,
    estado: 'PENDIENTE',
  },
  renta: {
    periodo: '2025',
    ingresos: 2845000,
    gastos: 520000,
    baseImponible: 2325000,
    impuesto: 296138,
    regimen: 'CAPITAL_INMOBILIARIO',
    tasa: '12.75%',
    estado: 'LIQUIDADO',
  },
};

const mockHistorial = [
  { ano: 2026, estado: 'PENDIENTE', meses: [false, true, true, true, false] },
  { ano: 2025, estado: 'LIQUIDADO', meses: [true, true, true, true, true, true, true, true, true, true, true, true] },
  { ano: 2024, estado: 'LIQUIDADO', meses: [true, true, true, true, true, true, true, true, true, true, true, true] },
];

export const Impuestos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'iva' | 'renta'>('iva');
  const [showSimulator, setShowSimulator] = useState(false);
  const [simIngresos, setSimIngresos] = useState(245000);
  const [simGastos, setSimGastos] = useState(45000);

  const calcularImpuesto = (ingresos: number, gastos: number, tasa: number) => {
    const base = Math.max(0, ingresos - gastos);
    return base * tasa;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', { 
      style: 'currency', 
      currency: 'CRC',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const currentData = activeTab === 'iva' ? mockCalculos.iva : mockCalculos.renta;
  const tasa = activeTab === 'iva' ? 0.13 : 0.1275;
  const impuestoCalculado = calcularImpuesto(simIngresos, simGastos, tasa);

  return (
    <div className="impuestos-page">
      <div className="page-header">
        <div>
          <h1>Centro de Cálculo</h1>
          <p>Calcula y gestiona tus obligaciones tributarias</p>
        </div>
        <div className="page-actions">
          <Button variant="outline" onClick={() => setShowSimulator(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M4 10h16M10 4v16" />
            </svg>
            Simulador
          </Button>
          <Button variant="primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
            Generar Borrador
          </Button>
        </div>
      </div>

      <div className="tax-selector">
        <button 
          className={`tax-btn ${activeTab === 'iva' ? 'tax-btn-active' : ''}`}
          onClick={() => setActiveTab('iva')}
        >
          <div className="tax-btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 7h6M9 11h6M9 15h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
          </div>
          <div className="tax-btn-content">
            <span className="tax-btn-label">IVA</span>
            <span className="tax-btn-value">{formatCurrency(mockCalculos.iva.impuesto)}</span>
          </div>
          <Badge variant={mockCalculos.iva.estado === 'PENDIENTE' ? 'warning' : 'success'} size="sm">
            {mockCalculos.iva.estado}
          </Badge>
        </button>
        
        <button 
          className={`tax-btn ${activeTab === 'renta' ? 'tax-btn-active' : ''}`}
          onClick={() => setActiveTab('renta')}
        >
          <div className="tax-btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div className="tax-btn-content">
            <span className="tax-btn-label">Renta</span>
            <span className="tax-btn-value">{formatCurrency(mockCalculos.renta.impuesto)}</span>
          </div>
          <Badge variant={mockCalculos.renta.estado === 'PENDIENTE' ? 'warning' : 'success'} size="sm">
            {mockCalculos.renta.estado}
          </Badge>
        </button>
      </div>

      {activeTab === 'renta' && (
        <Card variant="elevated" padding="md">
          <div className="regimen-selector">
            <h3>Selecciona tu Régimen</h3>
            <div className="regimen-options">
              <button className="regimen-btn regimen-btn-active">
                <span className="regimen-name">Capital Inmobiliario</span>
                <span className="regimen-rate">12.75%</span>
              </button>
              <button className="regimen-btn">
                <span className="regimen-name">Régimen de Utilidades</span>
                <span className="regimen-rate">25%</span>
              </button>
            </div>
          </div>
        </Card>
      )}

      <div className="calculo-detalle">
        <Card variant="outlined" padding="md">
          <h3>Detalle del Cálculo</h3>
          <div className="calculo-items">
            <div className="calculo-item">
              <span className="calculo-label">Período</span>
              <span className="calculo-value">{currentData.periodo}</span>
            </div>
            <div className="calculo-item">
              <span className="calculo-label">Ingresos Totales</span>
              <span className="calculo-value">{formatCurrency(simIngresos)}</span>
            </div>
            <div className="calculo-item">
              <span className="calculo-label">Gastos Deducibles</span>
              <span className="calculo-value">{formatCurrency(simGastos)}</span>
            </div>
            <div className="calculo-divider" />
            <div className="calculo-item">
              <span className="calculo-label">Base Imponible</span>
              <span className="calculo-value">{formatCurrency(simIngresos - simGastos)}</span>
            </div>
            <div className="calculo-item">
              <span className="calculo-label">Tasa</span>
              <span className="calculo-value">{activeTab === 'iva' ? '13%' : '12.75%'}</span>
            </div>
            <div className="calculo-item calculo-total">
              <span className="calculo-label">Impuesto Calculado</span>
              <span className={`calculo-value ${currentData.estado === 'PENDIENTE' ? 'text-danger' : 'text-success'}`}>
                {formatCurrency(impuestoCalculado)}
              </span>
            </div>
          </div>
        </Card>

        <Card variant="outlined" padding="md">
          <h3>Reconstrucción Retroactiva</h3>
          <div className="historial-timeline">
            <div className="timeline-months-labels">
              {['E','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                <span key={i} className="timeline-month-label">{m}</span>
              ))}
            </div>
            {mockHistorial.map((item) => (
              <div key={item.ano} className="timeline-year">
                <div className="timeline-year-header">
                  <span className="timeline-year-label">{item.ano}</span>
                  <Badge variant={item.estado === 'LIQUIDADO' ? 'success' : 'warning'} size="sm">
                    {item.estado}
                  </Badge>
                </div>
                <div className="timeline-months">
                  {Array.from({ length: 12 }, (_, index) => {
                    const completo = item.meses[index];
                    const mes = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][index];
                    return (
                      <div
                        key={index}
                        className={`timeline-month ${completo === true ? 'complete' : completo === false ? 'incomplete' : 'empty'}`}
                        title={`${mes} ${item.ano}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {showSimulator && (
        <div className="simulator-overlay" onClick={() => setShowSimulator(false)}>
          <div className="simulator-modal" onClick={(e) => e.stopPropagation()}>
            <div className="simulator-header">
              <h3>Simulador "¿Qué pasa si...?"</h3>
              <button className="simulator-close" onClick={() => setShowSimulator(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="simulator-content">
              <div className="simulator-control">
                <label>Ingresos: {formatCurrency(simIngresos)}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="1000000" 
                  step="10000"
                  value={simIngresos}
                  onChange={(e) => setSimIngresos(Number(e.target.value))}
                />
              </div>
              <div className="simulator-control">
                <label>Gastos: {formatCurrency(simGastos)}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="500000" 
                  step="5000"
                  value={simGastos}
                  onChange={(e) => setSimGastos(Number(e.target.value))}
                />
              </div>
              <div className="simulator-result">
                <span className="result-label">Impuesto Estimado</span>
                <span className="result-value">{formatCurrency(impuestoCalculado)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Impuestos;