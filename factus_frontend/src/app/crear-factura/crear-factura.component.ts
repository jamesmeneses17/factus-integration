import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RangosService } from '../services/rangos.service';
import { MunicipiosService } from '../services/municipios.service';

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
  metodosPago: string[] = ['Efectivo', 'Transferencia', 'Tarjeta'];

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

