import { Injectable } from '@angular/core';
import DataJSON from '../../assets/EIC-2019 - trabalhos aceitos.json';

export interface PersonObject {
  Numero: string;
  Titulo: string;
  Nome: string;
  Email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatasheetService {
  private email: string = null;
  private personObject: PersonObject;

  data: PersonObject[] = DataJSON['Trabalhos Aceitos'];
  authorsList: PersonObject[] = [];
  code: string = null;
  repeatID: number;

  currentCode: string = null;
  currentRepeat: number = null;

  constructor() {}

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  doesItExist(): boolean {
    let exists = false;
    this.personObject = null;
    if (this.email !== null && this.email !== undefined) {
      for (const object of this.data) {
        if (object.Email.toLowerCase() === this.email.toLowerCase()) {
          exists = true;
        }
      }
    }
    return exists;
  }

  findPersonObject() {
    this.personObject = null;
    for (const object of this.data) {
      if (object.Email === this.email) {
        this.personObject = object;
      }
    }
    return this.personObject;
  }
}
