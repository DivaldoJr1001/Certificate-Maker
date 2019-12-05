import { Component, OnInit } from '@angular/core';
import { DatasheetService } from 'src/app/services/datasheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-certificate',
  templateUrl: './input-certificate.component.html',
  styleUrls: ['./input-certificate.component.scss']
})
export class InputCertificateComponent implements OnInit {

  email: string;

  emptyError: boolean;
  notFoundError: boolean;

  approvedEmail: boolean = false;

  codesList: string[] = [];
  titlesList: string[] = [];

  username: string;

  constructor(private dataCheck: DatasheetService, private _router: Router) { }

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

  goToLink(num: number) {
    window.open('/certificado?code=' + this.codesList[num]);
  }

}
