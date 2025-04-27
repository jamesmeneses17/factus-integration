import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturasService } from '../services/facturas.service';
import { saveAs } from 'file-saver'; // Asegúrate de tenerlo instalado: npm install file-saver

@Component({
  selector: 'app-ver-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-facturas.component.html',
  providers: [FacturasService],
})
export class VerFacturasComponent implements OnInit {
  facturas: any[] = [];
  filtros = {
    numero: '',
    identificacion: '',
    nombres: ''
  };

  constructor(private facturaService: FacturasService) {}

  ngOnInit() {
    this.buscarFacturas();
  }

  buscarFacturas() {
    const params: any = {};

    if (this.filtros.numero) params['filter[number]'] = this.filtros.numero;
    if (this.filtros.identificacion) params['filter[identification]'] = this.filtros.identificacion;
    if (this.filtros.nombres) params['filter[names]'] = this.filtros.nombres;

    this.facturaService.obtenerFacturas(params).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.facturas = Array.isArray(resp?.data?.data) ? resp.data.data : [];
      },
      error: (err: any) => console.error('Error al cargar facturas:', err)
    });
  }

  descargarPDF(factura: any) {
    this.facturaService.descargarFactura(factura.number).subscribe({
      next: (resp: any) => {
        const base64 = resp.data.pdf_base_64_encoded;
        const nombreArchivo = `${resp.data.file_name}.pdf`;

        const byteCharacters = atob(base64);
        const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        saveAs(blob, nombreArchivo);
      },
      error: (err: any) => console.error('Error descargando PDF:', err)
    });
  }
}
