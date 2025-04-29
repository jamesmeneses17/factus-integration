import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangosService } from '../services/rangos.service';
import { MunicipiosService } from '../services/municipios.service';
import { UnidadesService } from '../services/unidades.service';
import { TributosService } from '../services/tributos.service';
import { FacturasService } from '../services/facturas.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-factura.component.html',
})
export class CrearFacturaComponent implements OnInit {
  pasoActual: number = 1;

  referenciaFactura: string = ''; // <-- Vacío para que el usuario lo escriba
  observacionFactura: string = '';

  tiposOrganizacion = [
    { id: 1, nombre: 'Persona jurídica' },
    { id: 2, nombre: 'Persona natural' },
  ];

  tributosCliente = [
    { id: 18, nombre: 'IVA' },
    { id: 21, nombre: 'No aplica' },
  ];

  rangos: any[] = [];
  rangoSeleccionado: string = ''; // <-- El usuario debe escoger el rango en el formulario

  metodoPago: string = ''; // <-- El usuario debe escoger el método de pago

  metodosPago = [
    { codigo: 10, nombre: 'Efectivo' },
    { codigo: 42, nombre: 'Consignación' },
    { codigo: 20, nombre: 'Cheque' },
  ];

  tiposDocumento = [
    { id: 1, nombre: 'Registro civil' },
    { id: 3, nombre: 'Cédula de ciudadanía' },
    { id: 6, nombre: 'NIT' },
  ];

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
    organizacion: '',
  };

  producto: any = {
    codigo: '',
    nombre: '',
    cantidad: 1,
    precio: '',
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
    private facturaService: FacturasService
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
          tax_rate: Number(this.producto.tasa),
          unit_measure_id: Number(this.producto.unidadMedida),
          standard_code_id: 1,
          is_excluded: 0,
          tribute_id: Number(this.producto.tributo),
          withholding_taxes: [],
        },
      ],
    };

    console.log(
      '📦 JSON que se enviará a Factus:',
      JSON.stringify(datosFactura, null, 2)
    );

    this.authService.obtenerToken().subscribe({
      next: (res) => {
        const token = res.access_token;
        this.facturaService.enviarFactura(datosFactura, token).subscribe({
          next: (resp) => {
            console.log('✅ Respuesta Factura generada:', resp);
        
            Swal.fire({
              icon: 'success',
              title: 'Factura generada',
              text: 'La factura fue creada exitosamente.',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            });
        
            const pdfUrl = resp?.data?.pdf_url;
            if (pdfUrl) window.open(pdfUrl, '_blank');
          },
          error: (err) => {
            console.error('❌ Error HTTP al enviar factura:', err);
        
            Swal.fire({
              icon: 'error',
              title: 'Error al generar la factura',
              text: 'Ocurrió un problema al intentar crear la factura. Por favor, revisa los datos.',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
          }
        });
        
      },
      error: (err) => console.error('❌ Error al obtener token:', err),
    });
  }

  siguientePaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }
}
