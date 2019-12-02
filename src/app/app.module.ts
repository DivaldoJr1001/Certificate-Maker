import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificateGeneratorModule } from './certificate-generator/certificate-generator.module';
import { DatasheetService } from './services/datasheet.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CertificateGeneratorModule
  ],
  providers: [DatasheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
