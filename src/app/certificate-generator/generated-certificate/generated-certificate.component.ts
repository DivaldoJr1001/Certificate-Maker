import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DatasheetService } from 'src/app/services/datasheet.service';
import { ActivatedRoute } from '@angular/router';

export interface PersonObject {
  Numero: string;
  Titulo: string;
  Centro: string;
  Nome: string;
  Email: string;
}

@Component({
  selector: 'app-generated-certificate',
  templateUrl: './generated-certificate.component.html',
  styleUrls: ['./generated-certificate.component.scss']
})
export class GeneratedCertificateComponent implements OnInit {

  email: string;

  personObject: PersonObject;

  wrongAdressError: boolean;

  // Tamanho do certificado em px
  certWidth = 800;
  certHeight = 564.34;

  constructor(private dataCheck: DatasheetService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.email = params['email'];
      });
  }

  ngOnInit() {
    this.dataCheck.setEmail(this.email.toLowerCase());
    if (!this.dataCheck.doesItExist()) {
      this.wrongAdressError = true;
    }
    this.personObject = this.dataCheck.findPersonObject();
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
      scale: 2.5
  }).then(canvas => {
      const imgWidth = 250;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('landscape', 'mm', 'a4'); // A4 size page of PDF

      // Posicionamento da imagem em relação ao papel
      const positionX = 45;
      const positionY = 30;

      pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHeight);
      pdf.save('Certificado.pdf'); // PDF
    });
  }
}
