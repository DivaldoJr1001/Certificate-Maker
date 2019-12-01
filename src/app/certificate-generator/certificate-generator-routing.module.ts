import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputCertificateComponent } from './input-certificate/input-certificate.component';
import { GeneratedCertificateComponent } from './generated-certificate/generated-certificate.component';


const routes: Routes = [
  {path: 'certificado', component: GeneratedCertificateComponent},
  {path: '', component: InputCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateGeneratorRoutingModule { }
