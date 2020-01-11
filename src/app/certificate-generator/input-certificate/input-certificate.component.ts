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

  downloadPath: string = 'C:\\Users\\Samsung\\Downloads';

  downloadCounter: number = 0;

  downloadLoop;

  emptyError: boolean;
  notFoundError: boolean;

  approvedEmail = false;

  codesList: string[] = [];
  titlesList: string[] = [];

  username: string;

  constructor(private dataCheck: DatasheetService) { }

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
      this.notFoundError = !this.dataCheck.doesItExist(this.email);
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

  updatePath() {
    this.dataCheck.downloadPath = this.downloadPath;
    console.log(this.downloadPath);
  }

  downloadCertificates() {
    const w = this;
    this.downloadCounter = 0;

    this.downloadLoop = setInterval(
      function() {
        w.downloadCounter++;
        console.log(parseInt(w.dataCheck.worksList[w.downloadCounter].Numero));

        window.open('/certificado?code=' + parseInt(w.dataCheck.worksList[w.downloadCounter].Numero), '_blank');

        if (w.downloadCounter > 4) {
          clearInterval(w.downloadLoop);
        }
      },

      2000);
  }

  sendEmails() {
    console.log(this.downloadPath);

    const file = new File(["Certificado 2"], "Certificado 2.pdf");

    this.fs.readFile("./attachment.txt", function (err, data) {
      console.log("Works");
  });



  }

  goToLink(num: number) {

    this.downloadCounter++;
    window.open('/certificado?code=' + this.codesList[num], '_blank');

    if (this.downloadCounter === 303) {
      clearInterval(this.downloadLoop);
    }
  }

}
