/* ============================================
   PÁGINA: Dashboard Principal
   Descripción: Centro de control con métricas y состояниеFiscal
   ============================================ */

import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { TriangleAlert, Upload, Info } from 'lucide-react';
import './Dashboard.css';

const kpiData = [
  {
    id: 'iva',
    label: 'IVA a Pagar',
    value: '₡125,000',
    status: 'danger',
    subtitle: 'Vence en 3 días',
  },
  {
    id: 'multas-evitadas',
    label: 'Multas Evitadas',
    value: '₡210,000',
    status: 'success',
    subtitle: 'Este año',
  },
  {
    id: 'proximo-venc',
    label: 'Próximo Vencimiento',
    value: 'D-104',
    status: 'warning',
    subtitle: '15 mayo 2026',
  },
];

const recentTransactions = [
  { id: 1, date: '15/04/2026', concept: 'Reserva Airbnb #2847', amount: 45000, type: 'income', classification: 'GRAVADO_13' },
  { id: 2, date: '14/04/2026', concept: 'Reserva Booking #B3921', amount: 32000, type: 'income', classification: 'GRAVADO_13' },
  { id: 3, date: '12/04/2026', concept: 'Limpieza Villa Sol', amount: -15000, type: 'expense', classification: 'GASTO' },
  { id: 4, date: '10/04/2026', concept: 'Reserva Directa', amount: 28000, type: 'income', classification: 'EXENTO' },
  { id: 5, date: '08/04/2026', concept: 'Mantenimiento AC', amount: -35000, type: 'expense', classification: 'GASTO' },
];

const alerts = [
  { id: 1, title: 'D-104 vence pronto', message: 'Genera tu borrador antes del 15 de mayo', priority: 'high' },
  { id: 2, title: 'Clasificación pendiente', message: '2 ingresos requieren revisión manual', priority: 'medium' },
];

const chartData = [
  { mes: 'Ene', ingresos: 185000, gastos: 42000 },
  { mes: 'Feb', ingresos: 142000, gastos: 38000 },
  { mes: 'Mar', ingresos: 256000, gastos: 61000 },
  { mes: 'Abr', ingresos: 198000, gastos: 45000 },
  { mes: 'May', ingresos: 312000, gastos: 72000 },
  { mes: 'Jun', ingresos: 245000, gastos: 58000 },
];

interface DashboardProps {
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName = 'Lisbeh Fallas' }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <h1>Hola, {userName} 👋</h1>
          <p>Este es tu centro de tranquilidad fiscal</p>
        </div>
        <div className="dashboard-actions">
          <Button variant="primary">
            <Upload size={18} />
            Importar Datos
          </Button>
        </div>
      </div>

      <div className="dashboard-semaphore">
        <div className="semaphore-icon semaphore-warning">
          <TriangleAlert size={28} />
        </div>
        <div className="semaphore-content">
          <h3>Cuidado: Próximo vencimiento</h3>
          <p>El D-104 vence en 3 días. Genera tu borrador ahora para evitar multas.</p>
        </div>
        <Button variant="outline">Generar Borrador</Button>
      </div>

      <div className="dashboard-kpis">
        {kpiData.map((kpi) => (
          <Card key={kpi.id} variant="elevated" padding="md">
            <div className="kpi-card">
              <span className="kpi-label">{kpi.label}</span>
              <span className={`kpi-value kpi-value-${kpi.status}`}>{kpi.value}</span>
              <span className={`kpi-subtitle kpi-subtitle-${kpi.status}`}>{kpi.subtitle}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard-grid">
        <Card variant="outlined" padding="md">
          <div className="card-header">
            <h3>Ingresos Recientes</h3>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </div>
          <div className="transactions-list">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <div className="transaction-info">
                  <span className="transaction-date">{tx.date}</span>
                  <span className="transaction-concept">{tx.concept}</span>
                </div>
                <div className="transaction-right">
                  <span className={`transaction-amount ${tx.type === 'expense' ? 'expense' : 'income'}`}>
                    {tx.type === 'expense' ? '-' : '+'}${tx.amount.toLocaleString()}
                  </span>
                  {tx.classification !== 'GASTO' && (
                    <Badge variant={tx.classification === 'GRAVADO_13' ? 'info' : 'success'} size="sm">
                      {tx.classification === 'GRAVADO_13' ? '13%' : 'Exento'}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="outlined" padding="md">
          <div className="card-header">
            <h3>Alertas Activas</h3>
            <Badge variant="warning">{alerts.length}</Badge>
          </div>
          <div className="alerts-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-item alert-item-${alert.priority}`}>
                <div className="alert-icon">
                  <Info size={24} />
                </div>
                <div className="alert-content">
                  <span className="alert-title">{alert.title}</span>
                  <span className="alert-message">{alert.message}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="dashboard-chart">
        <Card variant="outlined" padding="md">
          <div className="card-header">
            <h3>Tendencia de Ingresos</h3>
            <select className="chart-period">
              <option>Últimos 6 meses</option>
              <option>Último año</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <div className="chart-y-axis">
              {['300k', '200k', '100k', '0'].map((label) => (
                <span key={label} className="chart-y-label">{label}</span>
              ))}
            </div>
            <div className="chart-area">
              <div className="chart-grid">
                {[0, 1, 2, 3].map((i) => <div key={i} className="chart-grid-line" />)}
              </div>
              <div className="chart-bars">
                {chartData.map((d, index) => {
                  const maxVal = 320000;
                  const ingPct = (d.ingresos / maxVal) * 100;
                  const gasPct = (d.gastos / maxVal) * 100;
                  return (
                    <div key={index} className="chart-bar-group">
                      <div className="chart-bar-pair">
                        <div className="chart-bar-wrap">
                          <span className="chart-bar-value">{(d.ingresos / 1000).toFixed(0)}k</span>
                          <div className="chart-bar chart-bar-income" style={{ height: `${ingPct}%` }} />
                        </div>
                        <div className="chart-bar-wrap">
                          <span className="chart-bar-value chart-bar-value-expense">{(d.gastos / 1000).toFixed(0)}k</span>
                          <div className="chart-bar chart-bar-expense" style={{ height: `${gasPct}%` }} />
                        </div>
                      </div>
                      <span className="chart-bar-label">{d.mes}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="chart-legend">
            <span className="chart-legend-item">
              <span className="chart-legend-color chart-legend-income" />
              Ingresos
            </span>
            <span className="chart-legend-item">
              <span className="chart-legend-color chart-legend-expense" />
              Gastos
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;