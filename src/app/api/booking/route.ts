import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PACKAGES, calculatePrice, VEHICLE_SIZES } from '@/lib/packages';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      packageId,
      vehicleSize,
      serviceDate,
      customerName,
      customerEmail,
      customerPhone,
      address,
      vehicleBrand,
      vehicleModel,
      vehicleYear,
      vehicleColor,
      rfc,
      razonSocial,
      needsFactura,
    } = body;

    const pkg = PACKAGES[packageId as keyof typeof PACKAGES];
    let priceText = 'Pendiente / Cotización';
    if (pkg) {
      const priceVal = calculatePrice(packageId, vehicleSize) / 100;
      priceText = `$${priceVal.toLocaleString('es-MX')} MXN`;
    }

    const sizeObj = VEHICLE_SIZES.find(s => s.value === vehicleSize);
    const sizeLabel = sizeObj ? sizeObj.label : vehicleSize;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h1 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Nueva Solicitud de Reserva - Doctor Foam</h1>
        <p>Se ha recibido una nueva solicitud de reserva de detallado automotriz.</p>
        <h2 style="font-size: 1.2rem; color: #1e293b; margin-top: 20px;">Datos del Servicio</h2>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Paquete:</strong> ${pkg?.name || packageId}</li>
          <li><strong>Precio Estimado:</strong> ${priceText}</li>
          <li><strong>Fecha Sugerida:</strong> ${serviceDate}</li>
          <li><strong>Tamaño del Vehículo:</strong> ${sizeLabel}</li>
        </ul>
        <h2 style="font-size: 1.2rem; color: #1e293b; margin-top: 20px;">Datos del Vehículo</h2>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Marca:</strong> ${vehicleBrand}</li>
          <li><strong>Modelo:</strong> ${vehicleModel}</li>
          <li><strong>Año:</strong> ${vehicleYear}</li>
          <li><strong>Color:</strong> ${vehicleColor}</li>
        </ul>
        <h2 style="font-size: 1.2rem; color: #1e293b; margin-top: 20px;">Datos del Cliente</h2>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Nombre:</strong> ${customerName}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
          <li><strong>Teléfono:</strong> ${customerPhone}</li>
          <li><strong>Dirección:</strong> ${address}</li>
        </ul>
        ${needsFactura ? `
        <h2 style="font-size: 1.2rem; color: #1e293b; margin-top: 20px;">Datos de Facturación</h2>
        <ul style="list-style: none; padding: 0;">
          <li><strong>RFC:</strong> ${rfc}</li>
          <li><strong>Razón Social:</strong> ${razonSocial}</li>
        </ul>
        ` : '<p><em>No requiere factura</em></p>'}
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 0.9rem; color: #64748b; text-align: center;">Este es un correo automático generado desde el sitio web de Doctor Foam.</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Reservas Doctor Foam <noreply@drfoam.com.mx>',
      to: ['caballeroangela@gmail.com'],
      cc: customerEmail ? [customerEmail] : [],
      subject: `Nueva Reserva: ${pkg?.name || 'Servicio'} - ${customerName}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: 'Error al enviar el correo. Por favor intenta de nuevo.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Reserva enviada exitosamente', id: data?.id });
  } catch (err: any) {
    console.error("Error procesando reserva:", err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
