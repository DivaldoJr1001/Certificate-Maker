import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DatasheetService } from 'src/app/services/datasheet.service';

export interface PersonObject {
  Numero: string;
  Titulo: string;
  Autores: string;
  Emails: string;
}

@Component({
  selector: 'app-generated-certificate',
  templateUrl: './generated-certificate.component.html',
  styleUrls: ['./generated-certificate.component.scss']
})
export class GeneratedCertificateComponent implements OnInit {
  code: string;
  title: string;
  authorsList: PersonObject[];

  // Tamanho do certificado em px
  certHeight = 600;
  certWidth = 800;

  constructor(private dataCheck: DatasheetService) { }

  ngOnInit() {
    this.code = window.localStorage.getItem('code');
    this.authorsList = this.dataCheck.getPersonObject(this.code);
    this.title = this.authorsList[0].Titulo;
  }

  getHeight() {
    return this.certHeight + 'px';
  }

  getWidth() {
    return this.certWidth + 'px';
  }

  getPDF() {
    // div que vai tornar-se um pdf
    const data = document.getElementById('contentToConvert');

    html2canvas(data, {
      scale: 2
  }).then(canvas => {
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('landscape', 'mm', 'a4'); // A4 size page of PDF

      // Posicionamento da imagem em relação ao papel
      const positionX = 45;
      const positionY = 25;

      pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHeight);
      pdf.save('Certificado' + this.code + '.pdf'); // Generated PDF
    });
  }
}
