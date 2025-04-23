import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangosService } from '../services/rangos.service';
import { MunicipiosService } from '../services/municipios.service';
import { UnidadesService } from '../services/unidades.service';
import { TributosService } from '../services/tributos.service';
import { FacturaService } from '../services/factura.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-factura.component.html',
})
export class CrearFacturaComponent implements OnInit {
  pasoActual: number = 1;

  rangos: any[] = [];
  rangoSeleccionado: string = '';

  metodoPago: string = '';
  metodosPago = [
    { codigo: 10, nombre: 'Efectivo' },
    { codigo: 42, nombre: 'Consignación' },
    { codigo: 20, nombre: 'Cheque'},
  ];

  tiposDocumento = [
    { id: 1, nombre: 'Registro civil' },
    { id: 3, nombre: 'Cédula de ciudadanía' },
    { id: 6, nombre: 'NIT' },
  ];

  tributosCliente = [
    { id: 18, nombre: 'IVA' },
    { id: 21, nombre: 'No aplica' },
  ];

  tiposOrganizacion = [
    { id: 1, nombre: 'Persona jurídica' },
    { id: 2, nombre: 'Persona natural' },
  ];

  referenciaFactura: string = '';
  observacionFactura: string = '';

  cliente: any = {
    tipoDocumento: '',
    identificacion: '',
    dv: '',
    nombre: '',
    direccion: '',
    email: '',
    telefono: '',
    municipio: '',
    tributo: '',
    organizacion: ''
  };

  producto: any = {
    codigo: '',
    nombre: '',
    cantidad: 1,
    precio: 0,
    tasa: '',
    unidadMedida: '',
    tributo: '',
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
          next: (resp) => (this.rangos = resp.data || resp),
          error: (err) => console.error('Error al cargar rangos:', err),
        });

        this.municipiosService.obtenerMunicipios(token).subscribe({
          next: (resp) => (this.municipios = resp.data || resp),
          error: (err) => console.error('Error al cargar municipios:', err),
        });

        this.unidadesService.obtenerUnidades(token).subscribe({
          next: (resp) => (this.unidades = resp.data || resp),
          error: (err) => console.error('Error al cargar unidades:', err),
        });

        this.tributosService.obtenerTributos(token).subscribe({
          next: (resp) => (this.tributos = resp.data || resp),
          error: (err) => console.error('Error al cargar tributos:', err),
        });
      },
      error: (err) => console.error('Error al obtener token:', err),
    });
  }

  enviarFactura() {
    const datosFactura = {
      numbering_range_id: Number(this.rangoSeleccionado),
      document: '01',
      reference_code: this.referenciaFactura,
      observation: this.observacionFactura,
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
        legal_organization_id: Number(this.cliente.organizacion),
        tribute_id: Number(this.cliente.tributo),
        identification_document_id: Number(this.cliente.tipoDocumento),
        municipality_id: Number(this.cliente.municipio),
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
          withholding_taxes: [],
        },
      ],
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
            if (err?.error?.errors) {
              const detalles = Object.entries(err.error.errors)
                .map(
                  ([campo, mensajes]: any) => `${campo}: ${mensajes.join(', ')}`
                )
                .join('\n');
              alert('Errores de validación:\n' + detalles);
            } else if (err?.error?.message) {
              alert('Error: ' + err.error.message);
            } else if (typeof err.error === 'string') {
              alert('Error: ' + err.error);
            } else {
              alert('Error de validación');
            }
          },
        });
      },
      error: (err) => console.error('Error al obtener token:', err),
    });
  }

  siguientePaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }
}
