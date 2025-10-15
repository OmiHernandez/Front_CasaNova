import { Component, OnInit } from '@angular/core';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit{


  
 /* private async llenarcontrato(){
    const formUrl = '../../../assets/documentos/contrato.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    console.log("entrando")

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes)

    // Get the form containing all the fields
    const form = pdfDoc.getForm()

    const nombre = form.getTextField('nombre')
    const fecha = form.getTextField('fecha')
    const dinero = form.getTextField('dinero')


    
    nombre.setText('jorge')
    fecha.setText('hoy')
    dinero.setText('5,000')

    const pdfBytes = await pdfDoc.save()
    /*var blob = new Blob([pdfBytes], { type: 'application/pdf' });

    saveAs(blob, "contrato.pdf");

    


  }
  */
  ngOnInit():void{
    //this.llenarcontrato()
    
  }

}
