import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangosService } from '../services/rangos.service';
import { MunicipiosService } from '../services/municipios.service';
import { UnidadesService } from '../services/unidades.service';
import { TributosService } from '../services/tributos.service';
import { FacturaService } from '../services/factura.service';


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
  metodosPago: { codigo: number | string, nombre: string }[] = [
    { codigo: 10, nombre: 'Efectivo' },
    { codigo: 42, nombre: 'Consignación' },
    { codigo: 20, nombre: 'Cheque' },
    { codigo: 47, nombre: 'Transferencia' },
    { codigo: 71, nombre: 'Bonos' },
    { codigo: 72, nombre: 'Vales' },
    { codigo: 1,  nombre: 'Medio de pago no definido' },
    { codigo: 49, nombre: 'Tarjeta Débito' },
    { codigo: 48, nombre: 'Tarjeta Crédito' },
    { codigo: 'ZZZ', nombre: 'Otro' },
  ];

  tiposDocumento: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Registro civil' },
    { id: 2, nombre: 'Tarjeta de identidad' },
    { id: 3, nombre: 'Cédula de ciudadanía' },
    { id: 4, nombre: 'Tarjeta de extranjería' },
    { id: 5, nombre: 'Cédula de extranjería' },
    { id: 6, nombre: 'NIT' },
    { id: 7, nombre: 'Pasaporte' },
    { id: 8, nombre: 'Documento de identificación extranjero' },
    { id: 9, nombre: 'PEP' },
    { id: 10, nombre: 'NIT otro país' },
    { id: 11, nombre: 'NUIP' },
  ];

  cliente: any = {
    tipoDocumento: '',
    identificacion: '',
    dv: '',
    nombre: '',
    direccion: '',
    email: '',
    telefono: '',
    municipio: ''
  };

  municipios: any[] = [];

  producto: any = {
    codigo: '',
    nombre: '',
    cantidad: 1,
    precio: 0,
    tasa: '',
    unidadMedida: '',
    tributo: ''
  };

  unidades: any[] = [];
  tributos: any[] = [];

  constructor(
    private rangosService: RangosService,
    private municipiosService: MunicipiosService,
    private unidadesService: UnidadesService,
    private tributosService: TributosService,
    private facturaService: FacturaService

  ) {}

  ngOnInit(): void {
    this.municipiosService.obtenerMunicipios().subscribe({
      next: (resp) => {
        console.log('Municipios:', resp);
        this.municipios = resp.data || resp;
      },
      error: (err) => {
        console.error('Error al cargar municipios:', err);
      }
    });

    this.rangosService.obtenerRangos().subscribe({
      next: (resp) => {
        console.log('Rangos:', resp);
        this.rangos = resp.data || resp;
      },
      error: (err) => {
        console.error('Error al cargar rangos:', err);
      }
    });

   // Cargar unidades
  this.unidadesService.obtenerUnidades().subscribe({
    next: (resp) => {
      console.log('Unidades:', resp);
      this.unidades = resp.data;
    },
    error: (err) => console.error('Error al cargar unidades:', err)
  });

  // Cargar tributos
  this.tributosService.obtenerTributos().subscribe({
    next: (resp) => {
      console.log('Tributos:', resp);
      this.tributos = resp.data || resp;  // <-- importante
    },
    error: (err) => console.error('Error al cargar tributos:', err)
  });
  }

  siguientePaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }
  enviarFactura() {
    const datosFactura = {
      numbering_range_id: Number(this.rangoSeleccionado),
      reference_code: this.producto.codigo,
      observation: "Venta generada desde el sistema Cootep",
      payment_method_code: Number(this.metodoPago),
      customer: {
        identification: this.cliente.identificacion,
        dv: Number(this.cliente.dv),
        company: "",
        trade_name: "",
        names: this.cliente.nombre,
        address: this.cliente.direccion,
        email: this.cliente.email,
        phone: this.cliente.telefono,
        legal_organization_id: 1,
        tribute_id: 1,
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
          tax_rate: String(this.producto.impuesto),
          unit_measure_id: Number(this.producto.unidadMedida),
          standard_code_id: 1,
          is_excluded: 0,
          tribute_id: Number(this.producto.tributo),
          withholding_taxes: []
        }
      ]
    };
    
  
    console.log('✅ JSON que se enviará:\n', JSON.stringify(datosFactura, null, 2));
  
    this.facturaService.enviarFactura(datosFactura).subscribe({
      next: (resp) => {
        console.log('✅ Factura enviada con éxito:', resp);
        alert('Factura generada correctamente');
      },
      error: (err) => {
        console.error('❌ Error al enviar factura:', err);
        alert('Error al generar factura');
      }
    });
  }
  
  
}
