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
  code: string;

  authorsList: PersonObject[] = [];

  wrongAdressError: boolean;

  // Tamanho do certificado em px
  certWidth = 800;
  certHeight = 564.34;

  constructor(
    private dataCheck: DatasheetService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'];
    });
  }

  ngOnInit() {
    if (!this.dataCheck.doesCodeExist(this.code)) {
      this.wrongAdressError = true;
    }

    this.authorsList = this.dataCheck.findAuthorsList(this.code);

  }

  getAuthorsString(): string {
    let authorsString: string = '';

    for (let i = 0; i < this.authorsList.length; i++) {
      authorsString += this.authorsList[i].Nome;
      if (i < this.authorsList.length - 1) {
        authorsString += ', ';
      }
      if (i === this.authorsList.length - 2) {
        authorsString += ' e ';
      }
    }
    authorsString += ',';

    return authorsString;
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
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jspdf('landscape', 'mm', 'a4'); // A4 size page of PDF

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = pdf.internal.pageSize.getHeight() + 0.2;

      // Posicionamento da imagem em relação ao papel
      const positionX = 0;
      const positionY = 0;

      pdf.addImage(
        contentDataURL,
        'PNG',
        positionX,
        positionY,
        imgWidth,
        imgHeight
      );
      pdf.save('Certificado (' + this.code + ').pdf'); // PDF
    });
  }
}
