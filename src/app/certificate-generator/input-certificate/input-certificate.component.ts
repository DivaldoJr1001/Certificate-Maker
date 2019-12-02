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
  code: string;

  emptyError: boolean;
  notFoundError: boolean;

  constructor(private dataCheck: DatasheetService, private _router: Router) { }

  ngOnInit() {
    this.emptyError = false;
    this.notFoundError = false;
    this.email = '';
  }

  fetchData() {
    this.emptyError = false;
    this.notFoundError = false;

    this.dataCheck.setEmail(this.email);

    if (this.email === '') {
      this.emptyError = true;
    }

    if (!this.emptyError) {
      this.notFoundError = !this.dataCheck.doesItExist();
    }

    if (!this.emptyError && !this.notFoundError) {
      this._router.navigate(['/certificado']);
    }

  }

}
