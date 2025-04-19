import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangosService } from '../services/rangos.service';
import { MunicipiosService } from '../services/municipios.service';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [CommonModule, FormsModule,],
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

  constructor(private rangosService: RangosService, private municipiosService: MunicipiosService) {}
  ngOnInit(): void {
    // Cargar municipios
    this.municipiosService.obtenerMunicipios().subscribe({
      next: (resp) => {
        console.log('Municipios:', resp);
        this.municipios = resp.data || resp;
      },
      error: (err) => {
        console.error('Error al cargar municipios:', err);
      }
    });
  
    // ✅ Cargar rangos
    this.rangosService.obtenerRangos().subscribe({
      next: (resp) => {
        console.log('Rangos:', resp);
        this.rangos = resp.data || resp;
      },
      error: (err) => {
        console.error('Error al cargar rangos:', err);
      }
    });
  }
  

  siguientePaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }
}

