import { Component, OnInit } from '@angular/core';
import { DatasheetService } from 'src/app/services/datasheet.service';

@Component({
  selector: 'app-input-certificate',
  templateUrl: './input-certificate.component.html',
  styleUrls: ['./input-certificate.component.scss']
})
export class InputCertificateComponent implements OnInit {

  email: string;
  code: string;

  emptyError: boolean;
  notFoundError: boolean;

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

    this.code = this.dataCheck.findCode(this.email);

    if (this.code === null && !this.emptyError) {
      this.notFoundError = true;
    }


    if (!this.emptyError && !this.notFoundError) {
      window.localStorage.setItem('code', this.code);
      window.open('/certificado', '_blank');
    }

  }

}
