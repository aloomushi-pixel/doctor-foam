import { formatDateES } from '@/lib/booking-utils';
import type { Booking } from '@/lib/types';
import { forwardRef } from 'react';

interface ReceiptTemplateProps {
    booking: Booking;
}

const ReceiptPDFTemplate = forwardRef<HTMLDivElement, ReceiptTemplateProps>(({ booking }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                width: '800px',
                minHeight: '1000px',
                padding: '60px',
                backgroundColor: 'white',
                color: '#1e293b',
                fontFamily: 'Helvetica, Arial, sans-serif'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #e2e8f0', paddingBottom: '30px', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#0f172a' }}>
                        DOCTOR FOAM MEXICO
                    </h1>
                    <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>Lavado Automotriz y Detallado Premium</p>
                    <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>contacto@drfoam.com.mx</p>
                    <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>Tel: +52 55 1234 5678</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#3b82f6', textTransform: 'uppercase' }}>Recibo de Servicio</h2>
                    <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>Folio: <span style={{ fontWeight: 'normal' }}>{booking.id.slice(0, 8).toUpperCase()}</span></p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>Fecha de Emisión: <span style={{ fontWeight: 'normal' }}>{new Date().toLocaleDateString('es-MX')}</span></p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div style={{ width: '48%' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px', marginBottom: '15px' }}>Datos del Cliente</h3>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Nombre:</strong> {booking.customer_name}</p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Email:</strong> {booking.customer_email}</p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Teléfono:</strong> {booking.customer_phone}</p>
                </div>
                <div style={{ width: '48%' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #cbd5e1', paddingBottom: '8px', marginBottom: '15px' }}>Detalles del Servicio</h3>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Fecha Programada:</strong> {formatDateES(booking.service_date)}</p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Estado:</strong> {
                        booking.payment_status === 'completed' ? 'Completado' :
                            booking.payment_status === 'paid' ? 'Pagado/Confirmado' :
                                booking.payment_status === 'pending' ? 'Pendiente' :
                                    booking.payment_status === 'cancelled' ? 'Cancelado' : booking.payment_status
                    }</p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}><strong>Origen:</strong> {booking.source === 'admin' ? 'Generado por Administrador' : 'Web / Stripe'}</p>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Descripción del Paquete</th>
                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Vehículo (Tamaño)</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Importe</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 12px', fontSize: '14px' }}>
                            <strong style={{ display: 'block', marginBottom: '4px', fontSize: '15px' }}>{booking.package_name}</strong>
                            {booking.notes && <span style={{ color: '#64748b', fontSize: '13px' }}>Notas: {booking.notes}</span>}
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'center', fontSize: '14px' }}>
                            {booking.vehicle_info || booking.vehicle_size || 'N/A'}
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'right', fontSize: '15px', fontWeight: 'bold' }}>
                            ${(booking.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '50px' }}>
                <div style={{ width: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                        <span style={{ color: '#64748b' }}>Subtotal</span>
                        <span>${(booking.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>
                        <span>TOTAL</span>
                        <span>${(booking.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid #cbd5e1', color: '#94a3b8', fontSize: '12px' }}>
                <p style={{ margin: '0 0 5px 0' }}>Este documento es una representación impresa de un servicio programado.</p>
                <p style={{ margin: '0' }}>¡Gracias por elegir Doctor Foam para el cuidado de tu vehículo!</p>
            </div>
        </div>
    );
});

ReceiptPDFTemplate.displayName = 'ReceiptPDFTemplate';

export default ReceiptPDFTemplate;
