import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateGeneratorRoutingModule } from './certificate-generator-routing.module';
import { GeneratedCertificateComponent } from './generated-certificate/generated-certificate.component';
import { InputCertificateComponent } from './input-certificate/input-certificate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';



@NgModule({
  declarations: [
    GeneratedCertificateComponent,
    InputCertificateComponent
  ],
  imports: [
    CommonModule,
    CertificateGeneratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CertificateGeneratorModule { }
