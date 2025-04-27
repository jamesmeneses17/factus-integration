import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturasService } from '../services/facturas.service';
import { saveAs } from 'file-saver';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js`;




@Component({
  selector: 'app-ver-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-facturas.component.html',
})
export class VerFacturasComponent implements OnInit {
  facturas: any[] = [];
  filtros = {
    numero: '',
    identificacion: '',
    nombres: ''
  };

  constructor(private facturasService: FacturasService) {}

  ngOnInit() {
    this.buscarFacturas();
  }

  buscarFacturas() {
    const params: any = {};

    if (this.filtros.numero) params['filter[number]'] = this.filtros.numero;
    if (this.filtros.identificacion) params['filter[identification]'] = this.filtros.identificacion;
    if (this.filtros.nombres) params['filter[names]'] = this.filtros.nombres;

    this.facturasService.obtenerFacturas(params).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.facturas = Array.isArray(resp?.data?.data) ? resp.data.data : [];
      },
      error: (err: any) => console.error('Error al cargar facturas:', err)
    });
  }

  descargarPDF(factura: any) {
    this.facturasService.descargarFactura(factura.number).subscribe({
      next: (resp: any) => {
        console.log('🧩 Respuesta completa de la API:', resp);
  
        const base64 = resp.data?.pdf_base_64_encoded;
        const nombreArchivo = `${resp.data?.file_name || 'factura'}.pdf`;
  
        if (!base64) {
          alert('No se encontró el PDF para esta factura');
          return;
        }
  
        const decoded = atob(base64);
  
        if (!decoded.startsWith('%PDF-')) {
          alert('El archivo recibido no es un PDF válido');
          return;
        }
  
        const byteNumbers = Array.from(decoded, (char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
  
        saveAs(blob, nombreArchivo);
      },
      error: (err: any) => {
        console.error('❌ Error descargando PDF:', err);
        alert('Error al descargar el PDF');
      }
    });
  }
  
  
  generarLinkDIAN(factura: any) {
    this.facturasService.obtenerQRFactura(factura.number).subscribe({
      next: (resp: any) => {
        const qrUrl = resp?.data?.bill?.qr;
        if (qrUrl) {
          window.open(qrUrl, '_blank');
        } else {
          alert('No se encontró el QR para esta factura');
        }
      },
      error: (err: any) => {
        console.error('❌ Error obteniendo el QR:', err);
        alert('Error al obtener el QR de la factura');
      }
    });
  }
  
  
  
  
  
  
}
