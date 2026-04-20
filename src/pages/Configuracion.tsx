/* ============================================
   PÁGINA: Configuración y Seguridad
   ============================================ */

import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Badge } from '../components/common/Badge';
import { Upload, User, Bell, Shield, ClipboardList } from 'lucide-react';
import './Configuracion.css';

const mockLogs = [
  { id: 1, accion: 'Inicio de sesión', fecha: '19/04/2026 08:30', ip: '192.168.1.100' },
  { id: 2, accion: 'Modificación de ingreso', fecha: '18/04/2026 14:22', ip: '192.168.1.100' },
  { id: 3, accion: 'Exportación de reporte', fecha: '17/04/2026 10:15', ip: '192.168.1.100' },
  { id: 4, accion: 'Cambio de contraseña', fecha: '15/04/2026 09:00', ip: '192.168.1.100' },
];

export const Configuracion: React.FC = () => {
  const [activeSection, setActiveSection] = useState('perfil');

  const sections = [
    { id: 'perfil', label: 'Perfil Tributario', icon: <User size={18} /> },
    { id: 'notificaciones', label: 'Notificaciones', icon: <Bell size={18} /> },
    { id: 'seguridad', label: 'Seguridad', icon: <Shield size={18} /> },
    { id: 'auditoria', label: 'Log de Auditoría', icon: <ClipboardList size={18} /> },
  ];

  return (
    <div className="configuracion-page">
      <div className="page-header">
        <div>
          <h1>Configuración</h1>
          <p>Gestiona tu perfil y preferencias</p>
        </div>
      </div>

      <div className="config-layout">
        <div className="config-sidebar">
          {sections.map(section => (
            <button
              key={section.id}
              className={`config-section-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="section-icon">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        <div className="config-content">
          {activeSection === 'perfil' && (
            <Card variant="outlined" padding="md">
              <h3>Perfil Tributario</h3>
              <div className="config-form">
                <div className="form-row">
                  <Input label="Nombre Completo" defaultValue="Lisbeth Fallas" />
                  <Input label="Email" type="email" defaultValue="lisbeth@email.com" disabled />
                </div>
                <div className="form-row">
                  <Select
                    label="Tipo de Identificación"
                    options={[
                      { label: 'Cédula Física', value: 'FISICA' },
                      { label: 'Cédula Jurídica', value: 'JURIDICA' },
                      { label: 'DIMEX', value: 'DIMEX' },
                      { label: 'NITE', value: 'NITE' },
                    ]}
                    value="FISICA"
                  />
                  <Input label="Número de Identificación" defaultValue="01-0234-5678" />
                </div>
                <div className="form-row">
                  <Select
                    label="Actividad Económica"
                    options={[
                      { label: '551001 - Alojamiento', value: '551001' },
                      { label: '552001 - Restaurantes', value: '552001' },
                    ]}
                    value="551001"
                  />
                </div>
                <div className="form-row">
                  <Select
                    label="Régimen Tributario"
                    options={[
                      { label: 'Capital Inmobiliario (12.75%)', value: 'CAPITAL' },
                      { label: 'Régimen de Utilidades (25%)', value: 'UTILIDADES' },
                    ]}
                    value="CAPITAL"
                  />
                </div>
                <div className="form-actions">
                  <Button variant="primary">Guardar Cambios</Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'notificaciones' && (
            <Card variant="outlined" padding="md">
              <h3>Preferencias de Notificaciones</h3>
              <div className="notifications-options">
                <div className="notification-option">
                  <div className="option-info">
                    <span className="option-label">Notificaciones por Email</span>
                    <span className="option-desc">Recibe alertas y recordatorios por correo</span>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider" />
                  </label>
                </div>
                <div className="notification-option">
                  <div className="option-info">
                    <span className="option-label">Notificaciones in-app</span>
                    <span className="option-desc">Recibe notificaciones dentro de la aplicación</span>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider" />
                  </label>
                </div>
                <div className="notification-option">
                  <div className="option-info">
                    <span className="option-label">Frecuencia de Alertas</span>
                    <span className="option-desc">¿Con qué frecuencia quieres recibir alertas?</span>
                  </div>
                  <Select
                    options={[
                      { label: 'Tiempo Real', value: 'REAL' },
                      { label: 'Diaria', value: 'DIARIA' },
                      { label: 'Semanal', value: 'SEMANAL' },
                    ]}
                    value="REAL"
                  />
                </div>
                <div className="notification-option">
                  <div className="option-info">
                    <span className="option-label">Modo Tranquilidad</span>
                    <span className="option-desc">Simplifica el dashboard y reduce notificaciones</span>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>
              <div className="form-actions">
                <Button variant="primary">Guardar Preferencias</Button>
              </div>
            </Card>
          )}

          {activeSection === 'seguridad' && (
            <Card variant="outlined" padding="md">
              <h3>Seguridad</h3>
              <div className="security-options">
                <div className="security-item">
                  <div className="security-info">
                    <span className="security-label">Cambiar Contraseña</span>
                    <span className="security-desc">Último cambio: 15 de abril 2026</span>
                  </div>
                  <Button variant="outline" size="sm">Cambiar</Button>
                </div>
                <div className="security-item">
                  <div className="security-info">
                    <span className="security-label">Llave Criptográfica</span>
                    <span className="security-desc">Certificado .p12 para firma digital</span>
                  </div>
                  <Badge variant="default" size="sm">No configurada</Badge>
                </div>
                <div className="security-upload">
                  <div className="upload-zone">
                    <Upload size={48} strokeWidth={1.5} color="var(--color-text-muted)" />
                    <p>Arrastra tu archivo .p12 aquí</p>
                    <span>o</span>
                    <button className="browse-btn">Seleccionar archivo</button>
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <Button variant="danger" size="sm">Cerrar Sesión</Button>
              </div>
            </Card>
          )}

          {activeSection === 'auditoria' && (
            <Card variant="outlined" padding="md">
              <h3>Log de Auditoría</h3>
              <p className="audit-desc">Registro de todas las acciones realizadas en tu cuenta</p>
              <div className="audit-list">
                {mockLogs.map(log => (
                  <div key={log.id} className="audit-item">
                    <div className="audit-info">
                      <span className="audit-accion">{log.accion}</span>
                      <span className="audit-fecha">{log.fecha}</span>
                    </div>
                    <span className="audit-ip">{log.ip}</span>
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <Button variant="outline">Exportar Log</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracion;