import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangosService } from '../services/rangos.service';
import { MunicipiosService } from '../services/municipios.service';
import { UnidadesService } from '../services/unidades.service';
import { TributosService } from '../services/tributos.service';
import { FacturaService } from '../services/factura.service';
import { AuthService } from '../services/auth.service'; // <--- importa el AuthService



@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-factura.component.html',
})
export class CrearFacturaComponent implements OnInit {
  pasoActual: number = 1;

  rangos: any[] = [];
  rangoSeleccionado: string = '8'; // ID de rango de numeración de prueba

  metodoPago: string = '10'; // Efectivo
  metodosPago = [
    { codigo: 10, nombre: 'Efectivo' },
    { codigo: 42, nombre: 'Consignación' },
    // ...
  ];

  tiposDocumento = [
    { id: 1, nombre: 'Registro civil' },
    { id: 3, nombre: 'Cédula de ciudadanía' },
    { id: 6, nombre: 'NIT' }
  ];

  cliente: any = {
    tipoDocumento: 3, // Cédula de ciudadanía
    identificacion: '123456789',
    dv: '', // vacío porque no es NIT
    nombre: 'Pedro Gómez',
    direccion: 'Calle Falsa 123',
    email: 'pedro@mail.com',
    telefono: '3115500000',
    municipio: 15,
    tributo: 18 // IVA
  };

  producto: any = {
    codigo: 'PRO1234',
    nombre: 'Mouse óptico',
    cantidad: 1,
    precio: 45000,
    tasa: '19.00',
    unidadMedida: 70, // unidad
    tributo: 1
  };

  municipios: any[] = [];
  unidades: any[] = [];
  tributos: any[] = [];

  constructor(
    private authService: AuthService,
    private rangosService: RangosService,
    private municipiosService: MunicipiosService,
    private unidadesService: UnidadesService,
    private tributosService: TributosService,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.authService.obtenerToken().subscribe({
      next: (res) => {
        const token = res.access_token;

        this.rangosService.obtenerRangos(token).subscribe({
          next: (resp) => this.rangos = resp.data || resp,
          error: (err) => console.error('Error al cargar rangos:', err)
        });

        this.municipiosService.obtenerMunicipios(token).subscribe({
          next: (resp) => this.municipios = resp.data || resp,
          error: (err) => console.error('Error al cargar municipios:', err)
        });

        this.unidadesService.obtenerUnidades(token).subscribe({
          next: (resp) => this.unidades = resp.data || resp,
          error: (err) => console.error('Error al cargar unidades:', err)
        });

        this.tributosService.obtenerTributos(token).subscribe({
          next: (resp) => this.tributos = resp.data || resp,
          error: (err) => console.error('Error al cargar tributos:', err)
        });
      },
      error: (err) => console.error('Error al obtener token:', err)
    });
  }

 // ... todo tu código de arriba sin cambios

 enviarFactura() {
  const datosFactura = {
    numbering_range_id: Number(this.rangoSeleccionado),
    document: '01',
    reference_code: this.producto.codigo,
    observation: "Venta generada desde el sistema Cootep",
    payment_method_code: Number(this.metodoPago),
    customer: {
      identification: this.cliente.identificacion,
      dv: this.cliente.dv || undefined,
      company: '',
      trade_name: '',
      names: this.cliente.nombre,
      address: this.cliente.direccion,
      email: this.cliente.email,
      phone: this.cliente.telefono,
      legal_organization_id: 2,
      tribute_id: Number(this.cliente.tributo),
      identification_document_id: Number(this.cliente.tipoDocumento),
      municipality_id: Number(this.cliente.municipio)
    },
    items: [
      {
        code_reference: this.producto.codigo,
        name: this.producto.nombre,
        quantity: Number(this.producto.cantidad),
        discount: 0,
        discount_rate: 0,
        price: Number(this.producto.precio),
        tax_rate: this.producto.tasa,
        unit_measure_id: Number(this.producto.unidadMedida),
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: Number(this.producto.tributo),
        withholding_taxes: []
      }
    ]
  };

  console.log('📦 JSON final:', JSON.stringify(datosFactura, null, 2));

  this.authService.obtenerToken().subscribe({
    next: (res) => {
      const token = res.access_token;
      this.facturaService.enviarFactura(datosFactura, token).subscribe({
        next: (resp) => {
          console.log('✅ Factura generada:', resp);
          alert('Factura generada correctamente');
          const pdfUrl = resp?.data?.pdf_url;
          if (pdfUrl) window.open(pdfUrl, '_blank');
        },
        error: (err) => {
          console.error('❌ Error al generar factura:', err);
        
          // Si el backend devuelve errores detallados
          if (err?.error?.errors) {
            const detalles = Object.entries(err.error.errors)
              .map(([campo, mensajes]: any) => `${campo}: ${mensajes.join(', ')}`)
              .join('\n');
            alert('Errores de validación:\n' + detalles);
          } else if (err?.error?.message) {
            alert('Error: ' + err.error.message);
          } else if (typeof err.error === 'string') {
            alert('Error: ' + err.error); // por si es string plano
          } else {
            alert('Error de validación');
          }
        }
        
      });
    },
    error: (err) => console.error('Error al obtener token:', err)
  });
}

siguientePaso() {
  if (this.pasoActual < 3) {
    this.pasoActual++;
  }
}
}



