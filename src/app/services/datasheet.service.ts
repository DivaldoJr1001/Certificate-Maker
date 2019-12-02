import { Injectable } from '@angular/core';
import DataJSON from '../../assets/EIC-2019 - trabalhos aceitos.json';

export interface PersonObject {
  Numero: string;
  Titulo: string;
  Autores: string;
  Emails: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatasheetService {

  data: PersonObject[] = DataJSON['Trabalhos Aceitos'];
  authorsList: PersonObject[] = [];
  code: string = null;

  constructor() {
  }

  findCode(email: string): string {
    for (const object of this.data) {
      if (object.Emails === email) {
        this.code = object.Numero;
      }
    }

    return this.code;
  }

  getPersonObject(code: string) {
    for (const object of this.data) {
      if (object.Numero === code) {
        this.authorsList.push(object);
      }
    }
    return this.authorsList;
  }
}
