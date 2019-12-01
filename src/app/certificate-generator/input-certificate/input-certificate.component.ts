import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-certificate',
  templateUrl: './input-certificate.component.html',
  styleUrls: ['./input-certificate.component.scss']
})
export class InputCertificateComponent implements OnInit {

  email: string;

  emptyError: boolean;
  notFoundError: boolean;

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

    if (!this.emptyError && !this.notFoundError) {
      window.localStorage.setItem('email', this.email);
      window.open('/certificado', '_blank');
    }

  }

}
