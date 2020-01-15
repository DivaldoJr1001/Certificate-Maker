import { Component, OnInit } from '@angular/core';
import { DatasheetService } from 'src/app/services/datasheet.service';

declare var require: any;

@Component({
  selector: 'app-input-certificate',
  templateUrl: './input-certificate.component.html',
  styleUrls: ['./input-certificate.component.scss']
})
export class InputCertificateComponent implements OnInit {
  fs = require('fs');

  email: string;

  downloadCounter = 0;

  downloadLoop;

  emptyError: boolean;
  notFoundError: boolean;

  approvedEmail = false;

  codesList: string[] = [];
  titlesList: string[] = [];

  username: string;

  firstDownload: number = 1;

  lastDownload: number = 2;

  constructor(private dataCheck: DatasheetService) {}

  ngOnInit() {
    this.emptyError = false;
    this.notFoundError = false;
    this.email = '';
  }

  fetchData() {
    this.emptyError = false;
    this.notFoundError = false;

    if (this.email === '') {
      this.emptyError = true;
    }

    if (!this.emptyError) {
      this.notFoundError = !this.dataCheck.doesEmailExist(this.email);
    }

    if (!this.emptyError && !this.notFoundError) {
      this.approvedEmail = true;
      this.codesList = this.dataCheck.findProjectCode(this.email);
      this.username = this.dataCheck.findUsername(this.email);
      for (const code of this.codesList) {
        this.titlesList.push(this.dataCheck.findProjectName(code));
      }
    }
  }

  cancelEmail() {
    this.approvedEmail = false;
    this.email = '';
    this.codesList = [];
  }

  downloadCertificates() {
    const w = this;
    w.downloadCounter = w.firstDownload - 1;

    this.downloadLoop = setInterval(
      async function() {
        console.log(parseInt(w.dataCheck.worksList[w.downloadCounter].Numero));

        window.open(
          '/certificado?code=' +
            parseInt(w.dataCheck.worksList[w.downloadCounter].Numero),
          '_blank'
        );

        if (w.downloadCounter === w.lastDownload - 1) {
          clearInterval(w.downloadLoop);
        }

        w.downloadCounter++;
      },
    );
  }


  downloadList(content = JSON.stringify(this.dataCheck.personList), fileName = 'Lista de Participantes.json', contentType = 'text/plain') {
    console.log(JSON.stringify(this.dataCheck.personList));
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  goToLink(num: number) {
    this.downloadCounter++;
    window.open('/certificado?code=' + this.codesList[num], '_blank');
  }
}
